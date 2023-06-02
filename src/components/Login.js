export const Login = (onNavigate) => {
  const loginDiv = document.createElement('div');
  loginDiv.textContent = 'Bienvenida al Login';
  const buttonHome = document.createElement('button');

  buttonHome.textContent = 'Regresar al Home';

  loginDiv.appendChild(buttonHome);

  return loginDiv;
};
