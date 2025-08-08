#!/bin/bash

# Define the directory to watch. The '.' means the current directory.
WATCH_DIR="."

# Use inotifywait to monitor for any file changes and pipe the output to a while loop.
# -m: Continuously monitor for events.
# -r: Watch all subdirectories recursively.
# -e: Specify the events to watch for (modify, create, delete, move).
inotifywait -m -r -e modify,create,delete,move "$WATCH_DIR" | while read -r directory event filename; do
  # Add a small delay to ensure the file system is finished writing.
  sleep 1

  # Check for untracked or modified files
  if [[ $(git status --porcelain) ]]; then
    echo "Change detected: $directory$filename"

    # Stage all changes
    git add .

    # Create a unique, time-stamped commit message
    COMMIT_MESSAGE="Auto-commit on $(date '+%Y-%m-%d at %H:%M:%S')"

    # Commit the changes
    git commit -m "$COMMIT_MESSAGE"

    # Push the changes to the remote repository
    git push

    echo "Changes committed and pushed."
  fi
done