
const serial = (funcs, test) => funcs.reduce(
    (promise, func) => promise.then(result => func().then(Array.prototype.concat.bind(result))), 
    Promise.resolve([])
)
// every - exits if at least one is false 
// some - exits as soon as one is true
const serialEvery = (funcs, test) => {
    accumulator = Promise.resolve([])
    funcs.every(
        func => func().then(result => {
            if (test(accumulator, result)) {
                accumulator.concat({done: true, result})
                return true
            }
            accumulator.concat({done: false, result})
            return false
        })
    ).then(
        result => accumulator
    )
}


reduce(
    (promise, func) => promise.then(result => func().then(Array.prototype.concat.bind(result))), 
    Promise.resolve([])
)

export default serial