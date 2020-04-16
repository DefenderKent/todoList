export const required = (value) => {
  if (value) return undefined;
  return "Поле обязательное";
};
export const maxLengthCreator = (maxLength) => (value) => {
  if (value.length > maxLength)
    return `Поле должно содержать не более ${maxLength} символов`;
  return undefined;
};
export const notlogin = (login) => {
  if (login !== "Smit") return `Неверный логин или пароль`;
};
export const notPassword = (password) => {
  if (password !== "1234") return `Неверный логин или пароль`;
};
