import serial from './serial'
import Promise from 'es6-promise'

const lag = lagTime => () => new Promise((resolve, reject) => setTimeout(() => resolve([]), lagTime)) 

const laggedSerial = (funcs, lagTime) => serial(funcs.reduce(
    (acc, current) => acc.concat([lag(lagTime), current]),
    []
))

export default laggedSerial
