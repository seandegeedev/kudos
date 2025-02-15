#!/bin/bash

# =================================================================
# Copies the .env file from the src direcoty into all project directories, simulating prod deplyment.
# ⚠️ Note: This file should be run from the root directory of the project - . ./util/env_distribute.sh

# Source .env file path
ENV_FILE="./src/.env"

# Directories to search
TARGET_DIRS=("src/apps" "src/services" "src/modules")

# Check if .env file exists
if [[ ! -f "$ENV_FILE" ]]; then
  echo "Warning: .env file not found at $ENV_FILE. Skipping copy."
else
  # Loop through target directories
  for dir in "${TARGET_DIRS[@]}"; do
    if [[ -d "$dir" ]]; then
      for subdir in "$dir"/*/; do
        if [[ -d "$subdir" ]]; then
          cp "$ENV_FILE" "$subdir"
          echo "Copied .env to $subdir"
        fi
      done
    else
      echo "Directory $dir not found, skipping..."
    fi
  done
fi

echo "Done!"
