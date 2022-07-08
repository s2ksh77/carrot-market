export function cls(...classnames: string[]) {
  return classnames.join(' ');
}

export function getImageSrc(id: string, varient: string) {
  return `https://imagedelivery.net/lq0Bbd0nkd16pEanIr4F5Q/${id}/${varient}`;
}
