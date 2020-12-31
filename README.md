# react-world-maps | Various svg continent maps with React

This package comes with various SVG maps of the main continents, a map of the 
United States, and a simple component to render your own maps if your provide
the data set.

#### A map of territories:
```javascript
// Use ComposedMap to render multiple territories
import * as React from 'react'
import { ComposedMap } from 'react-world-maps'

let myCustomData = [
  {
    name: "Territory 1", // should be unique in the set
    d: "M 10 10 L 50 50 L 10 50 Z", // An svg path string representing the map
  },
  {
    name: "Territory 2",
    d: "M 10 10 L 100 10 L 100 50 L 50 50 Z",
  }
]

const MyCustomMapComponent = () => (
  <ComposedMap
    viewBox={[100, 50]}
    data={myCustomData}
    title="My Country"
  />
)
```

## Installation

`yarn add react-world-maps`

or

`npm install react-world-maps --save`

## Usage

The below example could be a way to add a map to a Geography quiz.

```typescript
import * as React from "react"
import { AfricaMap } from "react-world-maps"

export const MapQuiz = ({guess, setGuess, answer}) => {
  let config = {
    [guess]: {
      fill: guess === answer ? "#0f0" : "#f00"
    },
    [answer]: guess ? "#0f0" : "#ccc"
  }
  
  const mapHandler = (event) => {
    if (guess) return
    setGuess(event.target.dataset.name)
  }

  return (
    <AfricaMap
      customize={config}
      defaultClickHandler={mapHandler}
      hideTitles
    />
  )
}
```
## API:
```javascript
import {
  ComposedMap,
  AfricaMap,
  AsiaMap,
  EuropeMap,
  NorthAmericaMap,
  SouthAmericaMap,
  UnitedStatesMap,
} from "react-world-map"
```
#### ComposedMap
Use this component to create your own map component
| prop             | type | description                                                  |
| ---------------- | -------------| ----------------------------------------------- |
| `data`                 | __required__ `{name: string, d: string}[]`   | Array of svg names and paths that will compose the map.
| `defaultClickHandler`  | `(event: React.MouseEvent<SVGPathElement, MouseEvent>) => any` | Default function to attach to each path.
| `viewBox`         | `[width: number, height: number]`          | Viewbox settings for svg container
| `title`    | `string`                                | Title of svg container
| `customize`      | `{[key: string // should be same as name in data]: {React.SVGAttributes<SVGPathElement>}}` | Object of attributes to be passed on to svg path element for keyed territories
| `hideTitles` | `boolean` | prevent path title from appearing on hover |

#### Territory Map (AfricaMap, AsiaMap, EuropeMap, NorthAmericaMap, SouthAmericaMap, UnitedStatesMap)
These are just wrappers around the `ComposedMap`, using predefined data sets. They
take an optional subset of the props above: `hideTitles`, `customize`, `defaultClickHandler`.

# License

[MIT](LICENSE.md)

# Sources and prior art

The map data are sourced from [Natural Earth](https://www.naturalearthdata.com/downloads/), and
converted to SVG paths with [mapshaper](https://mapshaper.org/). This package is inspired on the [react-usa-map](https://www.npmjs.com/package/react-usa-map) package. In fact the
USA map data was derived from there.