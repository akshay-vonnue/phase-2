import os from 'node:os'

let args:string[] = []

const green = "\x1b[32m";
const red = "\x1b[31m";
const reset = "\x1b[0m";

export function handleVersion() {
    console.log("os version", green + os.version() + reset)
    console.log("node version:", green + process.version + reset)
    if (args[1] && args[1] === '--json') {
        printJSON('version',os.version())
    }
}

export function handleOs() {
    console.log("platform : " + os.platform())
    if (args[1] && args[1] === '--json') {
        printJSON('os',os.platform())
    }
}

export function handleMemory() {
    console.log('free memory:' + green + (os.freemem() / 1073741824).toFixed(2) + 'GB' + reset)
    // console.log('total memory:' + green + (os.totalmem() / 1073741824).toFixed(2) + 'GB' + reset)
    if (args[1] && args[1] === '--json') {
        printJSON('free memory:', (os.freemem() / 1073741824).toFixed(2) + 'GB')
        // printJSON('total memory:',(os.totalmem() / 1073741824).toFixed(2) + 'GB')
    }
}

export function handleEnv() {
    console.log(process.env.SHELL)
    if (args[1] && args[1] === '--json') {
        printJSON('env:',process.env.SHELL || '')
    }
}

export function handleCurrentDir() {
    console.log(process.cwd())
    if (args[1] && args[1] === '--json') {
        printJSON('current directory:',process.cwd())
    }
}

export function handleError() {
    console.log(red + 'command not found' + reset)
}

export function handleHelp() {
const helpString = `
########   Expected Commands: ########
version --v
os information --os
memory --m
envirnoment --e
            `

    console.log(helpString)
}

export function printJSON(value:string,data:string) {
    let obj:Record<string,string> = {}
    obj[value] = data
    console.log(obj)
}

export function init_cli() {
    args = process.argv.slice(2)
    if (args.length >= 3) {
        console.log('please pass in a single command')
        return
    }

    if (args.length === 0) {
        console.log(`
            Expected Commands:
            version --v
            os information --os
            memory --m
            envirnoment --e
        `)
        return
    }

    switch (args[0]) {

        case '--help':
            handleHelp()
            return
        
        case '--version':
            handleVersion()
            return
        
        case '--os':
            handleOs()
            return
        
        case '--m':
            handleMemory()
            return
        
        case '--env':
            handleEnv()
            return
        
        case '.':
            handleCurrentDir()
            return
        
        default:
            handleError()
            return
    }

}

init_cli()