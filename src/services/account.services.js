let saveToken = (token) => {
  localStorage.setItem("token", token);
};

let logout = () => {
  localStorage.removeItem("token");
};

let isLogged = () => {
  let token = localStorage.getItem("token");

  if (!token) {
    return false;
  }

  const tokenData = JSON.parse(atob(token.split(".")[1]));
  const expirationTime = tokenData.exp * 1000;

  if (expirationTime < Date.now()) {
    logout();
    return false;
  }

  return true;
};

let getToken = () => {
  return localStorage.getItem("token");
};

const accountService = {
  saveToken,
  logout,
  isLogged,
  getToken,
};

export { accountService };
