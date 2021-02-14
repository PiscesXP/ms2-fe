export const baseUrl = "http://localhost:23333";

export const buildUrl = (postfix: string) => {
  return `${baseUrl}${postfix}`;
};
