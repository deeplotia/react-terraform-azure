terraform {
  backend "azurerm" {
    resource_group_name   = "rg-devopsacademyjan2025-west-europe"
    storage_account_name  = "reactappstoragedoacademy"
    container_name        = "tfstate"
    key                   = "terraform.tfstate"
  }
}

provider "azurerm" {
  features {}
  subscription_id = "a051862b-08a2-4dce-b5a1-a6525ee00896"
}

resource "azurerm_resource_group" "react_app_rg" {
  name     = "rg-devopsacademyjan2025-west-europe"
  location = "West Europe"
  tags = {
      environment = "dev"
      owner = "devops-academy-trainers"
      created_by = "joshua and deep"
    }
}

resource "azurerm_storage_account" "react_app_storage" {
  name                     = "reactappstoragedoacademy"
  resource_group_name      = azurerm_resource_group.react_app_rg.name
  location                 = azurerm_resource_group.react_app_rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_storage_account_static_website" "react_app_storage_st_webapp" {
  storage_account_id = azurerm_storage_account.react_app_storage.id
  index_document     = "index.html"
  error_404_document = "404.html"
}

resource "azurerm_storage_container" "tfstate" {
  name                  = "tfstate"
  storage_account_id  = azurerm_storage_account.react_app_storage.id
  container_access_type = "private"
}

resource "azurerm_storage_blob" "react_app_files" {
  for_each = fileset("${path.module}/build", "")

  name                   = each.value
  storage_account_name   = azurerm_storage_account.react_app_storage.name
  storage_container_name = "$web"
  type                   = "Block"
  source                 = "${path.module}/build/${each.value}"
}

output "storage_account_primary_web_endpoint" {
  value = azurerm_storage_account.react_app_storage.primary_web_endpoint
}

/*resource "azurerm_cdn_profile" "react_app_cdn_profile" {
  name                = "reactAppCdnProfile"
  location            = azurerm_resource_group.react_app_rg.location
  resource_group_name = azurerm_resource_group.react_app_rg.name
  sku                 = "Standard_Microsoft"
}

resource "azurerm_cdn_endpoint" "react_app_cdn_endpoint" {
  name                = "reactAppCdnEndpoint"
  profile_name        = azurerm_cdn_profile.react_app_cdn_profile.name
  resource_group_name = azurerm_resource_group.react_app_rg.name
  location            = azurerm_resource_group.react_app_rg.location
  origin {
    name      = azurerm_storage_account.react_app_storage.primary_web_endpoint
    host_name = azurerm_storage_account.react_app_storage.primary_web_endpoint
  }
  is_http_allowed  = true
  is_https_allowed = true
}*/