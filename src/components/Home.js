// Aquí inicia Home

export const Home = () => {
  const HomeDiv = document.createElement('div');
  const buttonLogin = document.createElement('button-login');
  const buttonRegister = document.createElement('button-register');

  buttonRegister.textContent = 'Regístrate';
  buttonLogin.textContent = 'Inicia Sesión';

  HomeDiv.appendChild(buttonRegister);
  HomeDiv.appendChild(buttonLogin);

  return HomeDiv;
};
