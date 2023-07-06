// Aquí inicia Home
import logoComunidad from '../assets/images/Logo-Comunidad.png';

export const Home = (onNavigate) => {
  const userExist = localStorage.getItem('pepito');
  if (userExist) {
    onNavigate('/wall');
  }
  // ------------------IMAGEN Y TÍTULO-------------------------------
  // Div en el que se engloban todos los elementos de home
  const allDiv = document.createElement('div');
  allDiv.setAttribute('class', 'all-div');

  // Div en el que van los elementos del logo y sus atributos
  const logoDiv = document.createElement('div');
  logoDiv.setAttribute('class', 'container-image');

  const pageTitle = document.createElement('h1');
  pageTitle.textContent = 'La comunidad del Libro';
  pageTitle.setAttribute('class', 'page-title');

  const logo = document.createElement('picture');
  logo.setAttribute('alt', 'logo');
  logo.setAttribute('class', 'logo');

  const image = document.createElement('img');
  image.src = `${logoComunidad}`;
  image.setAttribute('class', 'image-logo');

  // --------------DIV INSTRUCCIONES Y BOTONES -------------------------
  const HomeDiv = document.createElement('div');
  HomeDiv.setAttribute('class', 'sub-div');

  // indicaciones para el usuario
  const instructionsHome = document.createElement('h2');
  instructionsHome.textContent = 'Elige una opción para continuar';
  instructionsHome.setAttribute('class', 'texto-secundario');

  // botones y sus atributos
  const buttonLogin = document.createElement('button');
  buttonLogin.textContent = 'Inicia Sesión';
  buttonLogin.setAttribute('class', 'button-login');

  const buttonRegister = document.createElement('button');
  buttonRegister.textContent = 'Regístrate';
  buttonRegister.setAttribute('class', 'button-register');

  // ----------------------INICIALIZACIÓN DE BOTONES PARA RUTAS
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
  HomeDiv.appendChild(instructionsHome);
  HomeDiv.appendChild(buttonLogin);
  HomeDiv.appendChild(buttonRegister);

  return allDiv;
};
