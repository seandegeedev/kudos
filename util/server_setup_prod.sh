#!/bin/bash

# ============================================
#  Kudos Production Server Setup
# ============================================
# Last Updated: 08/02/2025

#  Package Maintenace
# ============================================

# Update the package list
sudo apt update

# Upgrade all installed packages to their latest versions
sudo apt upgrade -y

# Remove unnecessary packages and dependencies
sudo apt autoremove -y

# Clean up the local repository of retrieved package files
sudo apt clean

# Install some dependency packages
sudo apt install ca-certificates curl -y

#  Docker Installation
# ============================================

# Add Docker GPG key
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add Docker repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update the package list
sudo apt update

# Install Docker
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose docker-compose-plugin -y

# Add the current user to the docker group
sudo usermod -aG docker $USER

# Activate the changes to groups
newgrp docker