output "resource_group_name" {
  value = azurerm_resource_group.main.name
}

output "app_url" {
  value = "https://${azurerm_linux_web_app.app.default_hostname}"
}

output "acr_login_server" {
  value = azurerm_container_registry.acr.login_server
}

output "acr_admin_username" {
  value     = azurerm_container_registry.acr.admin_username
  sensitive = true
}

output "db_fqdn" {
  value = azurerm_postgresql_flexible_server.db.fqdn
}

output "db_name" {
  value = azurerm_postgresql_flexible_server_database.app.name
}

output "openai_endpoint" {
  value = azurerm_cognitive_account.openai.endpoint
}

output "openai_deployment" {
  value = azurerm_cognitive_deployment.gpt54mini.name
}

output "acs_sender_domain" {
  value = azurerm_email_communication_service_domain.azure_managed.mail_from_sender_domain
}

output "acs_connection_string" {
  value     = azurerm_communication_service.comm.primary_connection_string
  sensitive = true
}
