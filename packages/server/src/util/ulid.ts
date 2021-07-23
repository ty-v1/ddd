export const isValidUlid: (value: string) => boolean = (value) => {
  return /[0-9A-Z]{26}/i.test(value);
};
