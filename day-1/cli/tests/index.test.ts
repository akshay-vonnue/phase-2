import { describe, it, expect, vi } from 'vitest'
import {
    handleCurrentDir,
    handleEnv,
    handleError,
    handleHelp,
    handleMemory,
    handleOs,
    handleVersion
} from '../src/index.ts'

describe("cli-test", () => {

    let logSpy = vi.spyOn(console, 'log')
    const helpString = `
########   Expected Commands: ########
version --v
os information --os
memory --m
envirnoment --e
            `


    it("catches invalid commands", () => {
        handleError()
        expect(logSpy).toHaveBeenCalled()

    })

    it("test os", () => {
        handleOs()
        expect(logSpy).toHaveBeenCalledTimes(1)
        expect(logSpy).toHaveBeenCalledWith("platform : linux")
    })

    it("test env", () => {
        handleEnv()
        expect(logSpy).toHaveBeenCalledWith('/bin/bash');
    })

    it("test help", () => {
        handleHelp()
        expect(logSpy).toHaveBeenCalledWith(helpString)
    })

    it("test dir", () => {
        handleCurrentDir()
        expect(logSpy).toHaveBeenCalledWith('/home/akshay.antony/training/phase-2/day-1/cli')
    })
})