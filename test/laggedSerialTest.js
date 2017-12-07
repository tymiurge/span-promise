import Promise from 'es6-promise'
import spanPromise from '../src/index'


describe('laggedSerial', () => {

  it('test a promise lag', () => {
    const firstPromiseSpan = 100
    const lagTime = 300
    const funcPromises = [
        () => new Promise((resolve, reject) => {
            setTimeout(() => { resolve({resolvedAt: (new Date().getTime())}) }, firstPromiseSpan)
        })
    ]
    const startAt = (new Date()).getTime()
    
    spanPromise.laggedSerial(funcPromises, lagTime).then(results => {
        const delta = results[0].resolvedAt - startAt
        expect(delta >= firstPromiseSpan + lagTime).toBe(true)
    })    
  })
  
})