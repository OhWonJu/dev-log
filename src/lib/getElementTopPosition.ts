export function getElementOffsetBoundery(element: HTMLElement) {
  const elementTopPosition = element.getBoundingClientRect().top;
  const elementBottomPosition = element.getBoundingClientRect().bottom;

  return {
    topOffset: elementTopPosition + window.scrollY,
    bottomOffset: elementBottomPosition + window.scrollY,
  };
}
