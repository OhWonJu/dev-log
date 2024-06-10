export function getElementTopPosition(element: HTMLElement) {
  // const headerOffset = NAV_HEIGHT + PRODUCT_TAB_HEIGHT;
  const elementPosition = element.getBoundingClientRect().top;
  // const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  const offsetPosition = elementPosition + window.scrollY;
  return offsetPosition;
}
