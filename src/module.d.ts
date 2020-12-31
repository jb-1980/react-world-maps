declare var __DEV__: boolean
type MapComponentProps = {
  name: string
  d: string
  onClick: (e: React.MouseEvent<SVGPathElement, MouseEvent>) => any
  title: string
  hideTitle?: boolean
  pathAttributes?: React.SVGAttributes<SVGPathElement>
}

type ComposedMapProps = {
  data: { name: string; d: string }[]
  defaultClickHandler?: (e: React.MouseEvent<SVGPathElement, MouseEvent>) => any
  viewBox?: [number, number]
  title?: string
  customize?: { [key: string]: Partial<MapComponentProps> }
  hideTitles?: boolean
}

type CustomMapProps = {
  customize?: { [key: string]: Partial<MapComponentProps> }
  hideTitles?: boolean
  defaultClickHandler?: (e: React.MouseEvent<SVGPathElement, MouseEvent>) => any
}
