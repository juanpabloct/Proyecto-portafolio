export const haveValues = (data: { [key: string]: string | number }) =>
  Object.values(data).every((value) => value || value !== "");
