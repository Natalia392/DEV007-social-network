// Aquí inicia Home

export const Home = (onNavigate) => {
  // ------------------IMÁGEN Y TÍTULO
  const allDiv = document.createElement('div');
  const logoDiv = document.createElement('div');
  const pageTitle = document.createElement('h1');
  const logo = document.createElement('picture');
  const image = document.createElement('img');
  image.src = './assets/images/Logo-Comunidad.png';
  pageTitle.textContent = 'La comunidad del Libro';
  pageTitle.setAttribute('class', 'page-title');
  allDiv.setAttribute('class', 'all-div');

  // -----------------INPUT Y BOTONES
  const titleHome = document.createElement('h2');
  const HomeDiv = document.createElement('div');
  const buttonLogin = document.createElement('button');
  const buttonRegister = document.createElement('button');

  // ----------------------Atributos de los elementos de arriba
  logo.setAttribute('alt', 'logo');
  logo.setAttribute('class', 'logo');
  image.setAttribute('class', 'image-logo');
  logoDiv.setAttribute('class', 'container-image');

  titleHome.textContent = 'Elige una opción para continuar';
  buttonRegister.textContent = 'Regístrate';
  buttonLogin.textContent = 'Inicia Sesión';

  // ----------------------Atributos de los elementos de abajo
  buttonRegister.setAttribute('class', 'button-register');
  buttonLogin.setAttribute('class', 'button-login');
  titleHome.setAttribute('class', 'texto-secundario');
  HomeDiv.setAttribute('class', 'sub-div');

  // ----------------------Funciones de los botones
  buttonLogin.addEventListener('click', () => {
    onNavigate('/login');
  });

  buttonRegister.addEventListener('click', () => {
    onNavigate('/register');
  });

  allDiv.appendChild(logoDiv);
  allDiv.appendChild(HomeDiv);
  logoDiv.appendChild(pageTitle);
  logoDiv.appendChild(logo);
  logoDiv.appendChild(image);
  HomeDiv.appendChild(titleHome);
  HomeDiv.appendChild(buttonLogin);
  HomeDiv.appendChild(buttonRegister);

  return allDiv;
};