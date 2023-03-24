# Installing

## Commands to Install

``` bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
export NVM_DIR='$HOME/.nvm'
NVM_DIR='$HOME/.nvm'
source ~/.bashrc
nvm install v18.15.0
git clone https://github.com/VastAiGang/vastaigang-machine-exec.git
cd vastaigang-machine-exec/
```

## Scipt to Install 
``` bash
curl -o- https://raw.githubusercontent.com/VastAiGang/vastaigang-machine-exec/main/install.sh  | bash 
```

# Start Running

## Script to start
``` bash
curl -o- https://raw.githubusercontent.com/VastAiGang/vastaigang-machine-exec/main/run .sh  | bash {MACHINEID} {APIKEY}
```

## Commands to run
``` bash
export VASTAIGANG_MACHINE_ID=$0
export VASTAIGANG_APIKEY=$1
npm run init:part1
npm run init:part2
```