import LocalStorage from "./localstorage";

export const logout = (): void => {
    LocalStorage.removeItem('user');
    window.location.href = '/';
};
