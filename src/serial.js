/** 
 * Executes promises sequentially and accumulates the promises results.
 * 
 * @param {funcs} array of funcs that return promises.
 * @returns Promise in resolved status in case if all promices from funcs are resolved 
 *          or rejected promise as soon as a single promise from the funcs fails. 
 * @example
 * const urls = ['/url1', '/url2', '/url3']
 * serial(urls.map(url => () => $.ajax(url)))
 *     .then(console.log.bind(console))
 **/
const serial = funcs => funcs.reduce(
    (promise, func) => promise.then(result => func().then(Array.prototype.concat.bind(result))), 
    Promise.resolve([])
)

export default serial
