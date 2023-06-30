import { ourSignInWithEmailAndPassword, signInWithGoogle } from '../lib';
import { showMessage } from './modal';
import logoComunidad from '../assets/images/Logo-Comunidad.png';

export const Login = (onNavigate) => {
  // ------------------IMÁGEN Y TÍTULO------------------
  const allDiv = document.createElement('div');
  allDiv.setAttribute('class', 'all-div');

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

  // --------------FORMULARIO---------------------------------
  const titleLogin = document.createElement('h2');
  titleLogin.textContent = 'Inicia Sesión';
  titleLogin.setAttribute('class', 'title-login');

  const loginForm = document.createElement('form');
  loginForm.setAttribute('class', 'sub-div');

  const inputEmailLogin = document.createElement('input');
  inputEmailLogin.setAttribute('type', 'text');
  inputEmailLogin.setAttribute('id', 'user-email');
  inputEmailLogin.setAttribute('placeholder', 'Email');

  const inputPasswordLogin = document.createElement('input');
  inputPasswordLogin.setAttribute('type', 'password');
  inputPasswordLogin.setAttribute('id', 'user-password');
  inputPasswordLogin.setAttribute('placeholder', 'Contraseña');

  const buttonLogin = document.createElement('button');
  buttonLogin.textContent = 'Ingresar';
  buttonLogin.setAttribute('class', 'button-login');

  const bottomMessage = document.createElement('p');
  bottomMessage.textContent = '¿Aún no tienes una cuenta?';

  const bottomMessageGoRegister = document.createElement('a');
  bottomMessageGoRegister.textContent = 'Regístrate';

  const googleButton = document.createElement('button');
  googleButton.textContent = 'Acceder con Google';
  googleButton.setAttribute('class', 'google-button');

  allDiv.appendChild(logoDiv);
  allDiv.appendChild(loginForm);
  logoDiv.appendChild(pageTitle);
  logoDiv.appendChild(logo);
  logoDiv.appendChild(image);
  loginForm.appendChild(titleLogin);
  loginForm.appendChild(inputEmailLogin);
  loginForm.appendChild(inputPasswordLogin);
  loginForm.appendChild(buttonLogin);
  loginForm.appendChild(googleButton);
  loginForm.appendChild(bottomMessage);
  loginForm.appendChild(bottomMessageGoRegister);

  // -------------INICIALIZACIÓN DE BOTONES------------------
  bottomMessageGoRegister.addEventListener('click', () => {
    onNavigate('/register');
  });

  buttonLogin.addEventListener('click', async (e) => {
    e.preventDefault();

    const email = inputEmailLogin.value;
    console.log(email);
    const password = inputPasswordLogin.value;
    console.log(password);

    try {
      if (email === '' || password === '') {
        showMessage('Por favor, ingresa tu correo electrónico y contraseña');
      } else {
        const userCredentials = await ourSignInWithEmailAndPassword(email, password);
        console.log(userCredentials);
        onNavigate('/wall');
      }
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/invalid-email') {
        showMessage('El correo electrónico proporcionado no es válido');
      } else if (error.code === 'auth/wrong-password') {
        showMessage('La contraseña ingresada es incorrecta');
      } else if (error.code === 'auth/missing-password') {
        showMessage('No se ha proporcionado una contraseña');
      } else if (error.code === 'auth/user-not-found') {
        showMessage('El usuario no ha sido encontrado');
      } else if (error.code === 'error.code') {
        showMessage('Algo salió mal');
      }
    }
  });

  googleButton.addEventListener('click', async (e) => {
    e.preventDefault();

    try {
      const credentials = await signInWithGoogle();
      console.log(credentials);
      onNavigate('/wall');
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        showMessage('El usuario cerró la ventana emergente de inicio de sesión de Google antes de completar el proceso');
      } else if (error.code === 'auth/popup-blocked') {
        showMessage('El navegador del usuario bloqueó la ventana emergente de inicio de sesión de Google');
      } else if (error.code === 'auth/cancelled-popup-request') {
        showMessage('La solicitud de ventana emergente de inicio de sesión de Google fue cancelada antes de completarse');
      } else if (error.code === 'auth/operation-not-supported-in-this-environment') {
        showMessage('La autenticación mediante ventanas emergentes no está soportada en el entorno actual del navegador');
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        showMessage('Existe una cuenta con diferentes credenciales de inicio de sesión asociadas');
      }
    }
  });

  return allDiv;
};
