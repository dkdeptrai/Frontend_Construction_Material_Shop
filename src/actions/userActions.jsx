const setUserData = (userData) => {
  return {
    type: 'SET_USER_DATA',
    payload: userData
  };
};

const resetUserData = () => {
  return {
    type: 'RESET_USER_DATA',
    payload: null
  };
};

export { setUserData, resetUserData };