import serialEvery from './serialEvery'

const serialSome = (funcs, test) => serialEvery(funcs, (accumulator, lastResult) => !test(accumulator, lastResult))

export default serialSome
