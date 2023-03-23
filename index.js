
const CronJob = require('cron').CronJob
const axios = require('axios')
const process = require('node:process')
const exec = require('node:child_process').exec
const xml  = require('xml2js').parseString;
require('dotenv').config()

const ALLOW_CUSTOM_COMANDS = process.env.VASTAIGANG_ALLOW_CUSTOM_COMANDS === 'true' ? true : false

const job = new CronJob('0 */5 * * * *', function() {
	const d = new Date();
	console.log('Time Checked:', d);
    exec('nvidia-smi -q -x', (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        xml(stdout, {
            explicitArray : false,
            trim          : true,
        }, function (err, data) {
            if (err) {
                return console.log('ERR IN XML: ',err);
            }
            if (process.env.VASTAIGANG_APIKEY && process.env.VASTAIGANG_MACHINE_ID){
                axios.post(`https://vastaigang.com/api/machine/${process.env.VASTAIGANG_MACHINE_ID}/command/execution`, {
                    "type":"nvidia-smi",
                    apiKey: process.env.VASTAIGANG_APIKEY,
                    stderr,
                    stdout: data.nvidia_smi_log,
                }).then(function (_response) {
                    console.log(' Nvidia-SMI Executed')
                }).catch(function (error) {
                    console.log(error,' ERROR IN NVIDIA CALL')
                })
            } else {
                console.log('No API KEY')
            }
        });
    });
    
   
    if (process.env.VASTAIGANG_APIKEY && process.env.VASTAIGANG_MACHINE_ID && ALLOW_CUSTOM_COMANDS){
        axios.get(`https://vastaigang.com/api/machine/${process.env.VASTAIGANG_MACHINE_ID}/command?apiKey=${process.env.VASTAIGANG_APIKEY}`)
        .then(function (response) {
            const commands = response.data
            console.log(commands,' COMMANDS TO EXECUTE')
            for(const instruction of commands){
                exec(instruction.command, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`exec error: ${error}`);
                        return;
                    }
                    axios.post(`https://vastaigang.com/api/machine/${process.env.VASTAIGANG_MACHINE_ID}/command/execution`, {
                        type:"custom",
                        apiKey: process.env.VASTAIGANG_APIKEY,
                        stderr,
                        stdout,
                        machineExecutionId: instruction.id
                    }).then(function (_response) {
                        console.log(_response.data,' Command Executed')
                    }).catch(function (error) {
                        console.log(error,' ERROR IN API CALL')
                    })
                });
            }
        })
    } else {
        console.log('No API KEY')
    }


});

job.start();

function handle(signal) {
    console.log(`Received ${signal}`);
    job.stop()
    process.exit(0)
}

process.on('beforeExit', (code) => {
    job.stop()
    console.log('Process beforeExit event with code: ', code);
});

process.on('exit', function () { 
    console.log('Caught interrupt signal');
    job.stop()
    // Send API CALL TO SERVER TO STOP THE JOB

})

process.on('warning', (warning) => {
    console.warn(warning.name);    // Print the warning name
    console.warn(warning.message); // Print the warning message
    console.warn(warning.stack);   // Print the stack trace
});

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
    // Application specific logging, throwing an error, or other logic here
});

process.on('SIGINT', handle);
process.on('SIGTERM', handle);

