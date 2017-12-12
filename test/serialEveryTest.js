import Promise from 'es6-promise'
import spanPromise from '../src/index'


describe('serialEvery', () => {

  it('serialEvery positive', () => {
    const spans = [300, 100]
    const funcPromises = spans.map(span => () => new Promise((resolve, reject) => {
        setTimeout(() => { resolve({span, resolvedAt: Date.now() | 0}) }, span)
    }))
    
    const serialEveryCheck = (accumulator, lastResult) => lastResult.span < 100500

    spanPromise.serialEvery(funcPromises, serialEveryCheck)
        .then(result => {
            const allResultsArePassed = result.every(item => item.passed)
            expect(allResultsArePassed).toBe(true)
            const spansAreInPredefinedOrder = result.every((item, idx) => item.span === spans[idx])
            expect(spansAreInPredefinedOrder).toBe(true)
        })    
  })

  it('serialEvery check fails at second iteration', () => {
      const funcPromises = [
          () => new Promise((resolve, reject) => { setTimeout(() => { resolve({span: 100}) }, 100) }),
          () => new Promise((resolve, reject) => { setTimeout(() => { resolve({span: 200}) }, 200) })
      ]
      const serialEveryCheck = (accumulator, lastResult) => lastResult.span < 200

      spanPromise.serialEvery(funcPromises, serialEveryCheck).then(results => {
          expect(results.lenght).toBe(2)
          expect(results[1].passed).toBe(false)
      })
  })
  
})


