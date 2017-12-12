import Promise from 'es6-promise'
import spanPromise from '../src/index'


describe('serialEvery', () => {

  it('serialEvery positive - check that all passed promises have passed:true', () => {
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

  it('serialEvery check that failed promises have passed: false', () => {
      const funcPromises = [
          () => new Promise((resolve, reject) => { setTimeout(() => { resolve({span: 100}) }, 100) }),
          () => new Promise((resolve, reject) => { setTimeout(() => { resolve({span: 200}) }, 200) })
      ]
      const serialEveryCheck = (accumulator, lastResult) => lastResult.span < 200

      spanPromise.serialEvery(funcPromises, serialEveryCheck).then(results => {
          expect(results[1].passed).toBe(false)
      })
  })

  it('check that no promises are executed after a check is failed', () => {
    const funcPromises = [
        () => new Promise((resolve, reject) => { setTimeout(() => { resolve({span: 100}) }, 100) }),
        () => new Promise((resolve, reject) => { setTimeout(() => { resolve({span: 200}) }, 200) }),
        () => new Promise((resolve, reject) => { setTimeout(() => { resolve({span: 300}) }, 300) })
    ]
    const serialEveryCheck = (accumulator, lastResult) => lastResult.span < 150
    
    spanPromise.serialEvery(funcPromises, serialEveryCheck).then(results => {
        expect(results.lenght).toBe(2)
    })

  })

  it('check passed promises after a subsequent one is rejected', () => {
    const funcPromises = [
        () => new Promise((resolve, reject) => { setTimeout(() => { resolve({span: 100}) }, 100) }),
        () => new Promise((resolve, reject) => { setTimeout(() => { reject('rejected') }, 200) }),
        () => new Promise((resolve, reject) => { setTimeout(() => { resolve({span: 300}) }, 300) })
    ] 
    const serialEveryCheck = (accumulator, lastResult) => lastResult.span < 150
    
    spanPromise.serialEvery(funcPromises, serialEveryCheck)
        .then(results => {
            fail('then should not be called if seria is rejected.')
        })
        .catch(err => {
            expect(err).toBe('rejected')
        })
  })
  
})
