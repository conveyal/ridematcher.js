import rbush from 'rbush'
import turf from 'turf'

/**
 * Make a SOAP request to [Commuter Connections](http://www.commuterconnections.org/) to get the number of carpools available for a given starting, ending location, and search radius.
 *
 * @param {Object} opts Options object
 * @returns {Promise} promise
 * @example
 * import {findMatches} from 'commuter-connections'
 * findMatches({
 *   commuters: [{
 *     id: 1,
 *     startLat: 39.0436,
 *     startLng: -77.4875,
 *   }],
 *   radius: .5,
 *   units: 'miles'
 * }).then((matches) => {
 *   console.log(matches) // map of commuter id's to matching commuter id's
 * }, handleError)
 */

export function findMatches (opts = {}) {
  return new Promise((resolve, reject) => {

    if (!opts.commuters) return reject('No commuters.')

    var locations = []
    opts.commuters.forEach(commuter => {
      locations.push([commuter.fromLng, commuter.fromLat, commuter.fromLng, commuter.fromLat, { commuter: commuter }])
    })
    var tree = rbush()
    tree.load(locations)

    var response = {}

    var radius = opts.radius || 0.25
    var units = opts.units || 'miles'
    opts.commuters.forEach(commuter => {
      var fromPoint = turf.point([commuter.fromLng, commuter.fromLat])

      // construct bbox
      var dist = radius * Math.sqrt(2)
      var bottomLeft = turf.destination(fromPoint, dist, -135, units)
      var topRight = turf.destination(fromPoint, dist, 45, units)

      // do the initial bbox search
      var results = tree.search(bottomLeft.geometry.coordinates.concat(topRight.geometry.coordinates))

      // filter the matches
      var matches = []
      results.forEach(result => {
        var match = result[4].commuter
        var matchPoint = turf.point([result[0], result[1]])

        // ignore self match
        if (match === commuter) return

        // ignore matches where distance exceeds search radius
        var dist = turf.distance(fromPoint, matchPoint, units)
        if (dist > radius) return

        matches.push({
          id: match.id,
          distance: dist
        })
      })

      if (matches.length > 0) {
        response[commuter.id] = matches
      }
    })

    resolve(response)
  })
}
