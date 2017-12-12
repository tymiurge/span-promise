import Promise from 'es6-promise'
import spanPromise from '../src/index'


describe('serialSome', () => {

  it('serialSome positive - check that all failed by the check promises have passed:false', () => {
    const spans = [300, 100]
    const funcPromises = spans.map(span => () => new Promise((resolve, reject) => {
        setTimeout(() => { resolve({span, resolvedAt: Date.now() | 0}) }, span)
    }))
    
    const serialEveryCheck = (accumulator, lastResult) => lastResult.span > 100500

    spanPromise.serialEvery(funcPromises, serialEveryCheck)
        .then(result => {
            const allResultsArePassed = result.every(item => !item.passed)
            expect(allResultsArePassed).toBe(true)
        })    
  })
})
