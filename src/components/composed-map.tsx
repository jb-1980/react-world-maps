import * as React from "react"
import { MapComponent } from "./map-component"
import { defaultClickHandler as clickHandler } from "../util"

export const ComposedMap = ({
  data,
  defaultClickHandler = clickHandler,
  viewBox = [959, 593],
  title = "React World Map",
  customize = {},
  hideTitles,
}: ComposedMapProps) => {
  let populatedData = data.map((d) => ({
    ...d,
    title: d.name,
    onClick: defaultClickHandler,
    hideTitle: hideTitles,
    ...(customize[d.name] && customize[d.name]),
  }))
  return (
    <svg
      className="react-world-map"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox={`0 0 ${viewBox[0]} ${viewBox[1]}`}
    >
      <title>{title}</title>
      <g className="outlines">
        {populatedData.map((meta) => {
          let { name, d, onClick, title, hideTitle, ...pathAttributes } = meta
          return (
            <MapComponent
              key={name}
              d={d}
              name={name}
              onClick={onClick}
              title={title}
              hideTitle={hideTitle}
              {...pathAttributes}
            />
          )
        })}
      </g>
    </svg>
  )
}
