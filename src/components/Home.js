// Aquí inicia Home

export const Home = (onNavigate) => {
  const titleHome = document.createElement('h1');
  const HomeDiv = document.createElement('div');
  const buttonLogin = document.createElement('button');
  const buttonRegister = document.createElement('button');

  titleHome.textContent = 'Elige una opción para continuar';
  buttonRegister.textContent = 'Regístrate';
  buttonLogin.textContent = 'Inicia Sesión';

  buttonRegister.setAttribute('class', 'button-register');
  buttonLogin.setAttribute('class', 'button-login');

  buttonLogin.addEventListener('click', () => {
    onNavigate('/login');
  });

  buttonRegister.addEventListener('click', () => {
    onNavigate('/register');
  });

  HomeDiv.appendChild(titleHome);
  HomeDiv.appendChild(buttonRegister);
  HomeDiv.appendChild(buttonLogin);

  return HomeDiv;
};

//-------------------FUNCIÓN PARA DAR CLASES A ELEMENTOS
/*const elements = [nameRegister, inputNameRegister, emailRegister, inputEmailRegister, passwordRegister, inputCreatePassword, buttonCreateAccount];

  const classToAdd = 'mi-clase';

  elements.forEach((element) => {
    element.classList.add(classToAdd);
  });*/