variable "subscription_id" {
  description = "Azure subscription ID"
  type        = string
}

variable "project_name" {
  description = "Project name used for resource naming"
  type        = string
  default     = "forgelabs"
}

variable "environment" {
  description = "Deployment environment (staging, production)"
  type        = string
  default     = "production"
}

variable "location" {
  description = "Azure region for main resources"
  type        = string
  default     = "uksouth"
}

variable "openai_location" {
  description = "Azure region for OpenAI (may differ due to model availability)"
  type        = string
  default     = "swedencentral"
}

# ── Database ──

variable "db_admin_username" {
  description = "PostgreSQL admin username"
  type        = string
  default     = "forgelabsadmin"
}

variable "db_admin_password" {
  description = "PostgreSQL admin password"
  type        = string
  sensitive   = true
}

variable "db_sku" {
  description = "PostgreSQL Flexible Server SKU"
  type        = string
  default     = "B_Standard_B1ms"
}

variable "db_storage_mb" {
  description = "PostgreSQL storage in MB"
  type        = number
  default     = 32768
}

# ── App ──

variable "app_sku" {
  description = "App Service Plan SKU (B1 = basic, P1v3 = premium)"
  type        = string
  default     = "B1"
}

# ── Stripe ──

variable "stripe_secret_key" {
  description = "Stripe secret key"
  type        = string
  sensitive   = true
  default     = ""
}

variable "stripe_publishable_key" {
  description = "Stripe publishable key"
  type        = string
  default     = ""
}

# ── Blog Admin ──

variable "admin_password" {
  description = "Password for the blog admin panel"
  type        = string
  sensitive   = true
}

# ── Vercel Blob ──

variable "blob_read_write_token" {
  description = "Vercel Blob read-write token for image uploads"
  type        = string
  sensitive   = true
  default     = ""
}

# ── OpenAI ──

variable "openai_tpm_capacity" {
  description = "Azure OpenAI tokens-per-minute capacity (in thousands)"
  type        = number
  default     = 80
}

# ── Custom Domain ──

variable "custom_domain" {
  description = "Custom domain for the app (e.g. www.forgelabs.co.uk)"
  type        = string
  default     = ""
}
