import * as React from 'react';

export const MapComponent = ({
  name,
  d,
  onClick,
  title,
  hideTitle,
  ...pathAttributes
}: MapComponentProps) => {
  return (
    <path
      d={d}
      fill="#ccc"
      stroke="#fff"
      strokeWidth="2px"
      data-name={name}
      onClick={onClick}
      {...pathAttributes}
    >
      {hideTitle ? null : <title>{title}</title>}
    </path>
  );
};
