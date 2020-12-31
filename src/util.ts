export const defaultClickHandler = (
  e: React.MouseEvent<SVGPathElement, MouseEvent>
) => {
  if (__DEV__) {
    console.info(e.currentTarget.dataset.name);
  }
};
