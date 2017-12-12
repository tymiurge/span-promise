

/*
const serial = (funcs, test) => funcs.reduce(
    (promise, func) => promise.then(result => func().then(Array.prototype.concat.bind(result))), 
    Promise.resolve([])
)
*/

// every - exits if at least one is false 
// some - exits as soon as one is true

const serial = funcs => funcs.reduce(
    (promise, func) => promise.then(result => func().then(Array.prototype.concat.bind(result))), 
    Promise.resolve([])
)

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