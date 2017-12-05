import serial from './serial'
import Promice from 'es6-promise'
/**
 * to debug: https://gist.github.com/dchowitz/83bdd807b5fa016775f98065b381ca4e
 */

/*
const spanPromise = {
    serial
}
*/
const funcPromices = [300, 100].map(span => () => new Promice((resolve, reject) => {
    setTimeout(() => { resolve({span, resolvedAt: Date.now() | 0}) }, span)
}))
const result = serial(funcPromices).then(results => {
    console.log('complete')
})


// export default spanPromise