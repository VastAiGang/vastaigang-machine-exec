#!/bin/bash

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
NVM_DIR_VAR='$HOME/.nvm'
export NVM_DIR=$NVM_DIR_VAR
echo "export NVM_DIR=$NVM_DIR_VAR"
source ~/.bashrc
NODE_VERSION='v18.15.0'
echo "Installing node version $NODE_VERSION"
nvm install $NODE_VERSION && 
git clone https://github.com/VastAiGang/vastaigang-machine-exec.git
cd vastaigang-machine-exec/
export VASTAIGANG_MACHINE_ID=$0
export VASTAIGANG_APIKEY=$1
npm run init:part1
npm run init:part2