#!/bin/bash

# A script to automatically commit and sync all changes in a Git repository.
# It stages, commits, pulls, and pushes with a single execution.

# Exit immediately if a command exits with a non-zero status.
set -e

# Check if we are in a Git repository
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    echo "Error: Not a Git repository."
    exit 1
fi

echo "Checking for changes..."

# Check if there are any changes to commit
if ! git diff-index --quiet HEAD --; then
    # Add all modified and new files
    git add .

    # Get the current timestamp
    timestamp=$(date +"%Y-%m-%d %H:%M:%S")

    # Create the commit message
    commit_message="Auto-commit: changes on $timestamp"

    # Commit the changes
    git commit -m "$commit_message"

    echo "Successfully committed changes with message: '$commit_message'"
else
    echo "No changes to commit."
fi

echo "Starting synchronization with remote..."

# Pull the latest changes from the remote repository, rebasing local commits.
# The '--rebase' flag is used to avoid creating unnecessary merge commits.
git pull --rebase

# Push all local commits to the remote repository.
git push

echo "Synchronization complete. ✅"