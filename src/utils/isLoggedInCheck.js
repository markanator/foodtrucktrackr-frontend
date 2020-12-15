export const isLoggedIn = () => {
  const value = window.localStorage.getItem('token');
  if (value == null) {
    return false;
  }
  return true;
};
