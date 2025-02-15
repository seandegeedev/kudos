#!/bin/bash

# =================================================================
# Clears all pgAdmin data from the data/pgAdmin directory.
# ⚠️ Note: This file should be run from the root directory of the project - . ./util/data_clear_postgres.sh

# Define the target directory
cd data/pgadmin || exit 1

# Find and delete all files and directories in the pgadmin directory except sessions
find . -mindepth 1 ! -name 'sessions' ! -name '.gitkeep' -delete

# Return to the root directory
cd ../../ || exit 1