import serialEvery from './serialEvery'

/**
 * Executes promises sequentially untill some of them passes the test.
 * @param {*} funcs 
 * @param {*} test 
 */
const serialSome = (funcs, test) => serialEvery(funcs, (accumulator, lastResult) => !test(accumulator, lastResult))

export default serialSome
