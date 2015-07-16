# ridematcher

[![build status](https://secure.travis-ci.org/conveyal/ridematcher.js.png)](http://travis-ci.org/conveyal/ridematcher.js)

Find carpool/vanpool matches


### `findMatches(commuters, opts)`

Compute the number of potential carpool matches within a commuter population.

### Parameters

| parameter   | type   | description                               |
| ----------- | ------ | ----------------------------------------- |
| `commuters` | Array  | Array of commuters to match to each other |
| `opts`      | Object | Options object                            |


### Example

```js
import {findMatches} from 'ridematcher'
findMatches({
  commuters: [{
    _id: 1,
    from: [-77.4875, 39.0436],
    to: [..]
  }], {
    radius: .5,
    units: 'miles'
}}).then((matches) => {
    console.log(matches) // map of commuter id's to matching commuter id's
}, handleError)
```


**Returns** `Promise`, promise


### `findRidepoolMatches(from, to, ridepools, opts)`

Find matches for a single commute against a set of car/vanpools

### Parameters

| parameter   | type   | description                            |
| ----------- | ------ | -------------------------------------- |
| `from`      | Array  | Search origin lng/lat                  |
| `to`        | Array  | Search destination lng/lat             |
| `ridepools` | Array  | Array of car/vanpools to match against |
| `opts`      | Object | Options object                         |


### Example

```js
import {findRidepoolMatches} from 'ridematcher'
findMatches(
  from: [-77.4875, 39.0436],
  to: [..],
  ridepools: [{
    _id: 1,
    from: [-77.4875, 39.0436],
    to: [..]
  }], {
    radius: .5,
    units: 'miles'
}}).then((matches) => {
    console.log(matches) // map of commuter id's to matching commuter id's
}, handleError)
```


**Returns** `Promise`, promise

## Installation

Requires [nodejs](http://nodejs.org/).

```sh
$ npm install ridematcher
```

## Tests

```sh
$ npm test
```


