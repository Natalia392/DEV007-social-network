export const Login = (onNavigate) => {
  const HomeDiv = document.createElement('div');
  HomeDiv.textContent = 'Bienvenida al Login';
  const buttonHome = document.createElement('button');

  buttonHome.textContent = 'Regresar al Home';

  HomeDiv.appendChild(buttonHome);

  buttonHome.addEventListener("click", () => {
    onNavigate("/");
  });
  

  return HomeDiv;
};
