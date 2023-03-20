#!/usr/bin/env bash

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
export NVM_DIR='$HOME/.nvm'
source ~/.bashrc
nvm install v18.15.0
git clone https://github.com/VastAiGang/vastaigang-machine-exec.git
cd vastaigang-machine-exec/
export VASTAIGANG_MACHINE_ID=$0
export VASTAIGANG_APIKEY=$1
npm run init:part1
npm run init:part2