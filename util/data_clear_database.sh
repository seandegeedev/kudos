#!/bin/bash

# =================================================================
# ⚠️ Clears all postgres data from the data/db directory. Note: This file should be run from the root directory of the project - . ./util/data_clear_database.

# Define the target directory
cd data/db || exit 1

# Find and delete all files and directories except .gitkeep
find . -mindepth 1 ! -name '.gitkeep' -delete

# Return to the root directory
cd ../../ || exit 1