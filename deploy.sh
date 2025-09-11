#!/bin/bash

# Change to the project directory
cd /home/pxltr3/Desktop/Echo

while true; do
  change=$(inotifywait -r -e modify,create,delete,move .)
  change_path=${change#./}
  if [[ "$change_path" != ".git/"* && "$change_path" != "deploy.sh" ]]; then
    git add .
    git commit -m "auto-commit: file change in $change_path"
    git push
  fi
done