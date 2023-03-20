#!/usr/bin/env bash

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
nvm list-remote
nvm install v18.15.0
git clone https://github.com/VastAiGang/vastaigang-machine-exec.git
export VASTAIGANG_APIKEY='YOUR_API_KEY'
export VASTAIGANG_MACHINE_ID='YOUR_MACHINE'
npm run init:part1
npm run init:part2