import serial from './serial'
import laggedSerial from './laggedSerial'
import serialEvery from './serialEvery'

const spanPromise = { serial, laggedSerial, serialEvery }

export default spanPromise
