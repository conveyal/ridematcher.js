/* global describe, it */

import {findMatches} from '../'

describe('ridematcher.js', () => {
  it('findMatches', (done) => {
    findMatches({
      commuters: getCommuters(1000)
    }).then((response) => {
      console.log(response)
      done()
    }, done)
  })
})

// generate random commuters
function getCommuters (numCommuters) {

  var bottom = 38.67792, left = -77.32649, top = 38.9798, right = -76.9382
  numCommuters = numCommuters || 100

  var commuters = []
  for (var i = 0; i < numCommuters; i++) {
    commuters.push({
      id: i + 1,
      fromLat: bottom + Math.random() * (top - bottom),
      fromLng: left + Math.random() * (right - left)
    })
  }

  return commuters
}
