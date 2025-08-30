#!/bin/bash

# A script to automatically commit all changes in the current Git repository.
# It stages all modified and new files and commits them with a timestamped message.

# Check if we are in a Git repository
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    echo "Error: Not a Git repository."
    exit 1
fi

# Add all modified and new files
git add .

# Check if there are any changes to commit
if ! git diff-index --quiet HEAD --; then
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