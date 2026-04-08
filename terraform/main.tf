terraform {
  required_version = ">= 1.5"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.100"
    }
  }

  backend "azurerm" {
    subscription_id      = "ce9f377e-cfe1-4360-aae4-e40f72ce1280"
    resource_group_name  = "taizo-tfstate-rg"
    storage_account_name = "taizotfstate"
    container_name       = "forgelabs-tfstate"
    key                  = "terraform.tfstate"
  }
}

provider "azurerm" {
  features {}
  subscription_id = "ce9f377e-cfe1-4360-aae4-e40f72ce1280"
}

locals {
  prefix = "${var.project_name}-${var.environment}"
  tags = {
    project     = var.project_name
    environment = var.environment
    managed_by  = "terraform"
  }
}

# ─────────────────────────────────────────────
# Resource Group
# ─────────────────────────────────────────────
resource "azurerm_resource_group" "main" {
  name     = "${local.prefix}-rg"
  location = var.location
  tags     = local.tags
}

# ─────────────────────────────────────────────
# Container Registry
# ─────────────────────────────────────────────
resource "azurerm_container_registry" "acr" {
  name                = replace("${local.prefix}acr", "-", "")
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  sku                 = "Basic"
  admin_enabled       = true
  tags                = local.tags
}

# ─────────────────────────────────────────────
# PostgreSQL Flexible Server (for blog CMS)
# ─────────────────────────────────────────────
resource "azurerm_postgresql_flexible_server" "db" {
  name                   = "${local.prefix}-db"
  resource_group_name    = azurerm_resource_group.main.name
  location               = azurerm_resource_group.main.location
  version                = "16"
  administrator_login    = var.db_admin_username
  administrator_password = var.db_admin_password
  sku_name               = var.db_sku
  storage_mb             = var.db_storage_mb
  zone                   = "2"

  authentication {
    active_directory_auth_enabled = false
    password_auth_enabled         = true
  }

  tags = local.tags
}

resource "azurerm_postgresql_flexible_server_database" "app" {
  name      = "${var.project_name}_${var.environment}"
  server_id = azurerm_postgresql_flexible_server.db.id
  charset   = "UTF8"
  collation = "en_US.utf8"
}

resource "azurerm_postgresql_flexible_server_firewall_rule" "allow_azure" {
  name             = "AllowAzureServices"
  server_id        = azurerm_postgresql_flexible_server.db.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "0.0.0.0"
}

# ─────────────────────────────────────────────
# Azure OpenAI Service (GPT-5.4-mini)
# ─────────────────────────────────────────────
resource "azurerm_cognitive_account" "openai" {
  name                  = "${local.prefix}-openai"
  resource_group_name   = azurerm_resource_group.main.name
  location              = var.openai_location
  kind                  = "OpenAI"
  sku_name              = "S0"
  custom_subdomain_name = "${local.prefix}-openai"
  tags                  = local.tags
}

resource "azurerm_cognitive_deployment" "gpt54mini" {
  name                 = "gpt-5.4-mini"
  cognitive_account_id = azurerm_cognitive_account.openai.id

  model {
    format  = "OpenAI"
    name    = "gpt-5.4-mini"
    version = "2026-03-17"
  }

  scale {
    type     = "GlobalStandard"
    capacity = var.openai_tpm_capacity
  }
}

# ─────────────────────────────────────────────
# App Service Plan (shared with taizo)
# ─────────────────────────────────────────────
data "azurerm_service_plan" "shared" {
  name                = "taizo-production-plan"
  resource_group_name = "taizo-production-rg"
}

# ─────────────────────────────────────────────
# Web App (Next.js)
# ─────────────────────────────────────────────
resource "azurerm_linux_web_app" "app" {
  name                = "${local.prefix}-app"
  resource_group_name = "taizo-production-rg"
  location            = data.azurerm_service_plan.shared.location
  service_plan_id     = data.azurerm_service_plan.shared.id
  https_only          = true
  tags                = local.tags

  site_config {
    always_on                                = true
    container_registry_use_managed_identity  = false
    health_check_path                        = "/api/health"

    application_stack {
      docker_registry_url      = "https://${azurerm_container_registry.acr.login_server}"
      docker_registry_username = azurerm_container_registry.acr.admin_username
      docker_registry_password = azurerm_container_registry.acr.admin_password
      docker_image_name        = "${var.project_name}:latest"
    }
  }

  app_settings = {
    NODE_ENV = "production"

    DATABASE_URL = "postgresql://${var.db_admin_username}:${urlencode(var.db_admin_password)}@${azurerm_postgresql_flexible_server.db.fqdn}:5432/${azurerm_postgresql_flexible_server_database.app.name}?sslmode=require"

    AZURE_OPENAI_ENDPOINT   = azurerm_cognitive_account.openai.endpoint
    AZURE_OPENAI_API_KEY    = azurerm_cognitive_account.openai.primary_access_key
    AZURE_OPENAI_DEPLOYMENT = azurerm_cognitive_deployment.gpt54mini.name

    STRIPE_SECRET_KEY                  = var.stripe_secret_key
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = var.stripe_publishable_key

    ADMIN_PASSWORD       = var.admin_password
    BLOB_READ_WRITE_TOKEN = var.blob_read_write_token

    WEBSITES_PORT                      = "3000"
    WEBSITES_CONTAINER_START_TIME_LIMIT = "180"
  }
}

# ─────────────────────────────────────────────
# Custom Domain (optional)
# ─────────────────────────────────────────────
resource "azurerm_app_service_custom_hostname_binding" "custom" {
  count               = var.custom_domain != "" ? 1 : 0
  hostname            = var.custom_domain
  app_service_name    = azurerm_linux_web_app.app.name
  resource_group_name = azurerm_resource_group.main.name
}
