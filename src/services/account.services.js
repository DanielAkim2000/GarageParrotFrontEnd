let saveToken = (token) => {
  localStorage.setItem("token", token);
};

let logout = () => {
  localStorage.removeItem("token");
};

let isLogged = () => {
  let token = localStorage.getItem("token");

  // Vérifiez si le token est présent
  if (!token) {
    return false;
  }

  // Analysez le token JWT pour obtenir la date d'expiration (par exemple, le champ 'exp')
  const tokenData = JSON.parse(atob(token.split('.')[1]));
  const expirationTime = tokenData.exp * 1000; // Convertir en millisecondes

  // Vérifiez si le token a expiré
  if (expirationTime < Date.now()) {
    // Le token a expiré, déconnectez l'utilisateur
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

