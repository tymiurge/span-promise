import serial from './serial'
import laggedSerial from './laggedSerial'
import serialEvery from './serialEvery'
import serialSome from './serialSome'

const spanPromise = { serial, laggedSerial, serialEvery, serialSome }

export default spanPromise
