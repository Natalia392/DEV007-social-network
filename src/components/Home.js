// Aquí inicia Home

export const Home = (onNavigate) => {
  const HomeDiv = document.createElement('div');
  const buttonLogin = document.createElement('button');
  const buttonRegister = document.createElement('button');

  buttonRegister.textContent = 'Regístrate';
  buttonLogin.textContent = 'Inicia Sesión';

  buttonLogin.addEventListener('click', () => {
    onNavigate('/login');
  });

  buttonRegister.addEventListener('click', () => {
    onNavigate('/register');
  });

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