#!/bin/bash

if [ "$1" == "dev" ]; then
  echo "Executing command for dev environment..."
  echo "Installing packages: sudo npm install"
  sudo npm install
  echo "Building packages: sudo npm run build:dev"
  sudo npm run build:dev
  echo "Removing files from ../html directory"
  sudo rm -rf ../html/*
  echo "Moving files to ../html from ./dist directory"
  sudo mv dist/* ../html/
elif [ "$1" == "dev-b" ]; then
  echo "Executing command for dev environment..."
  echo "Building packages: sudo npm run build:dev"
  sudo npm run build:dev
  echo "Removing files from ../html directory"
  sudo rm -rf ../html/*
  echo "Moving files to ../html from ./dist directory"
  sudo mv dist/* ../html/  
elif [ "$1" == "prod" ]; then
  echo "Executing command for prod environment..."
  echo "Installing packages: sudo npm install"
  sudo npm install
  echo "Building packages: sudo npm run build"
  sudo npm run build
  echo "Removing files from ../html directory"
  sudo rm -rf ../html/*
  echo "Moving files to ../html from ./dist directory"
  sudo mv dist/* ../html/
else
  echo "Please specify environment - dev or prod"
  # insert command to execute for other environments here
fi