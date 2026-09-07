import os from 'node:os';
const green = "\x1b[32m";
const red = "\x1b[31m";
const reset = "\x1b[0m";
function init_cli() {
    let args = process.argv.slice(2);
    if (args.length >= 2) {
        console.log('please pass in a single command');
        return;
    }
    if (args.length === 0) {
        console.log(`
            Expected Commands:
            version --v
            os information --os
            memory --m
            envirnoment --e
        `);
        return;
    }
    switch (args[0]) {
        case '--help':
            console.log(`
########   Expected Commands: ########
version ${green}--v${reset}
os information ${green}--os${reset}
memory ${green}--m${reset}
envirnoment ${green}--e${reset}
            `);
            return;
        case '--version':
            console.log("os version", green + os.version() + reset);
            console.log("node version:", green + process.version + reset);
            return;
        case '--os':
            console.log("platform : " + green + os.platform() + reset);
            return;
        case '--m':
            console.log('free memory:' + green + (os.freemem() / 1073741824).toFixed(2) + 'GB' + reset);
            console.log('total memory:' + green + (os.totalmem() / 1073741824).toFixed(2) + 'GB' + reset);
            return;
        case '--env':
            console.log(process.env.SHELL);
            return;
        case '.':
            console.log(process.cwd());
            return;
        default:
            console.log(red + 'command not found' + reset);
            return;
    }
}
init_cli();
