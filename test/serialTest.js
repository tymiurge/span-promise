import Promise from 'es6-promise'
import spanPromise from '../src/index'
/*
  Example Unit Test
 */


describe('serial', () => {
  it('test that promices are executed in the predefined order', () => {
    const spans = [300, 100]
    const funcPromises = spans.map(span => () => new Promise((resolve, reject) => {
        setTimeout(() => { resolve({span, resolvedAt: Date.now() | 0}) }, span)
    }))
    const result = spanPromise.serial(funcPromises).then(results => {
        const promisesExecutedInOrder = results.every((value, idx) => value.span === spans[idx])
        expect(promisesExecutedInOrder).toBe(true)
    })
  })
})