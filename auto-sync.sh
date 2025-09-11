#!/bin/bash

while true; do
  change=$(inotifywait -r -e modify,create,delete,move .)
  change_file=$(echo "$change" | sed -r 's/.* (.*)/\1/')
  echo "Detected change in $change_file, syncing..."
  git add .
  git commit -m "Auto-commit: file change in $change_file"
  git push
done
