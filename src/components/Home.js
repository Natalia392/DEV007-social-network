// Aquí inicia Home

export const Home = (onNavigate) => {
  // ------------------IMÁGEN Y TÍTULO
  const allDiv = document.createElement('div');
  const logoDiv = document.createElement('div');
  const pageTitle = document.createElement('h1');
  const logo = document.createElement('picture');
  pageTitle.textContent = 'La comunidad del Libro';
  pageTitle.setAttribute('class', 'page-title');
  allDiv.setAttribute('class', 'all-div');
  logo.setAttribute('alt', 'logo');
  logo.setAttribute('class', 'logo');
  const post = document.createElement('input');
  const buttonListening = document.createElement('button');
  post.setAttribute('type', 'text');
  post.setAttribute('id', 'text-box');
  buttonListening.setAttribute('id', 'btn');




  // -----------------INPUT Y BOTONES
  buttonListening.addEventListener('click', () => {
    const text = new SpeechSynthesisUtterance(post.value);
    speechSynthesis.speak(text);
  });

  const titleHome = document.createElement('h1');
  const HomeDiv = document.createElement('div');
  const buttonLogin = document.createElement('button');
  const buttonRegister = document.createElement('button');

  HomeDiv.setAttribute('class', 'sub-div');

  titleHome.textContent = 'Elige una opción para continuar';
  buttonRegister.textContent = 'Regístrate';
  buttonLogin.textContent = 'Inicia Sesión';
  buttonListening.textContent = 'Escuchar';


  // ----------------------Ejecutando botones

  buttonRegister.setAttribute('class', 'button-register');
  buttonLogin.setAttribute('class', 'button-login');

  buttonLogin.addEventListener('click', () => {
    onNavigate('/login');
  });

  buttonRegister.addEventListener('click', () => {
    onNavigate('/register');
  });
  allDiv.appendChild(logoDiv);
  allDiv.appendChild(post);
  allDiv.appendChild(buttonListening);
  allDiv.appendChild(HomeDiv);
  logoDiv.appendChild(pageTitle);
  logoDiv.appendChild(logo);

  HomeDiv.appendChild(titleHome);
  HomeDiv.appendChild(buttonRegister);
  HomeDiv.appendChild(buttonLogin);

  return allDiv;
};

//-------------------FUNCIÓN PARA DAR CLASES A ELEMENTOS
/*const elements = [nameRegister, inputNameRegister, emailRegister, inputEmailRegister, passwordRegister, inputCreatePassword, buttonCreateAccount];

  const classToAdd = 'mi-clase';

  elements.forEach((element) => {
    element.classList.add(classToAdd);
  });*/