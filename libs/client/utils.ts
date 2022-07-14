export function cls(...classnames: string[]) {
  return classnames.join(' ');
}

export function getImageSrc(id: string, varient: string) {
  return `https://imagedelivery.net/lq0Bbd0nkd16pEanIr4F5Q/${id}/${varient}`;
}

export const getRoomName = (data, sessionId: string) => {
  const filterData = data?.messages.filter(
    message => message.userId !== sessionId,
  )[0];
  return filterData?.user?.name;
};
