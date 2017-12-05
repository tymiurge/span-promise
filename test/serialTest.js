import Promice from 'es6-promise'
import spanPromise from '../src/index'
/*
  Example Unit Test
 */


describe('serial', () => {
  it('test that promices are executed in the predefined queue', () => {
    const funcPromices = [300, 100].map(span => new Promice((resolve, reject) => {
      setTimeout(() => resolve(), span)
    }))
  })
  
})