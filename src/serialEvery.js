/**
 * Executes promises sequentially untill some of them fails agains the test
 * @param {*} funcs 
 * @param {*} test function with 2 arguments accumulaterResult, lastResult
 */
const serialEvery = (funcs, test) => {
    let iterator = funcs[Symbol.iterator]()
    const recursion = (funcIterator, accumulator) => {
        let entry;
        if (!(entry = funcIterator.next()).done) {
            return accumulator.then(result => {
                return entry.value().then(promiseResult => {
                    const passed = test(accumulator, promiseResult)
                    const accumulatedResult = result.concat({passed, result: promiseResult})
                    accumulator = Promise.resolve(accumulatedResult)
                    return passed ? recursion(funcIterator, accumulator) : accumulator
                })
            })
        } else {
            return accumulator
        }

    }
    const serialResult = recursion(iterator, Promise.resolve([]))
    return serialResult
}

export default serialEvery
