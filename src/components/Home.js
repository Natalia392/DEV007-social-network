// Aquí inicia Home

export const Home = (onNavigate) => {
  const HomeDiv = document.createElement('div');
  const buttonLogin = document.createElement('button');
  const buttonRegister = document.createElement('button');

  buttonRegister.textContent = 'Regístrate';
  buttonLogin.textContent = 'Inicia Sesión';

  buttonLogin.addEventListener('click', () => {
    onNavigate('./Login.js');
  });

  buttonRegister.addEventListener('click', () => {
    onNavigate('./Register.js');
  });

  HomeDiv.appendChild(buttonRegister);
  HomeDiv.appendChild(buttonLogin);

  return HomeDiv;
};
