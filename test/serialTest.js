import Promise from 'es6-promise'
import spanPromise from '../src/index'


describe('serial', () => {

  it('test that promises are executed in the predefined order', () => {
    const spans = [300, 100]
    const funcPromises = spans.map(span => () => new Promise((resolve, reject) => {
        setTimeout(() => { resolve({span, resolvedAt: Date.now() | 0}) }, span)
    }))
    const result = spanPromise.serial(funcPromises).then(results => {
        const promisesExecutedInOrder = results.every((value, idx) => value.span === spans[idx])
        expect(promisesExecutedInOrder).toBe(true)
    })
  })

  it('test rejected seria', () => {
    const funcPromises = [
      () => new Promise((resolve, reject) => {
          setTimeout(() => { resolve(300) }, 300)
      }),
      () => new Promise((resolve, reject) => {
          setTimeout(() => { reject(200) }, 200)
      }),
      () => new Promise((resolve, reject) => {
          setTimeout(() => { resolve(100) }, 100)
      })
    ]
  
    const result = spanPromise.serial(funcPromises)
      .then(results => {
          fail('then should not be called if seria is rejected.')
      })
      .catch(err => {
          expect(err).toBe(200)
      })
  })
  
})