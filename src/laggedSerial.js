import serial from './serial'
import Promise from 'es6-promise'

const lag = lagTime => 
    () => new Promise((resolve, reject) => setTimeout(() => resolve([]), lagTime)) 

/**
 * Executes promises sequentially with a pause between them. 
 * @param {*} funcs 
 * @param {*} lagTime
 * @see serial from serial.js
 */
const laggedSerial = (funcs, lagTime) => serial(funcs.reduce(
    (acc, current) => acc.concat([lag(lagTime), current]),
    []
))

export default laggedSerial
