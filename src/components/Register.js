import { ourCreateUserWithEmailAndPassword, signInWithGoogle } from '../lib';
import { showMessage } from './modal';

export const Register = (onNavigate) => {
  // ------------------IMÁGEN Y TÍTULO---------------------------------
  // Aquí se crea el div que contiene el título y la imagen
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
  image.src = './assets/images/Logo-Comunidad.png';
  image.setAttribute('class', 'image-logo');

  // -----------------FORMULARIO-----------------------------------------
  // Aquí se crea el formulario para registrarse y su indicación
  const titleRegister = document.createElement('h2');
  titleRegister.textContent = 'Regístrate';

  const registerForm = document.createElement('form');
  registerForm.setAttribute('class', 'sub-div');

  // inputs
  const inputNameRegister = document.createElement('input');
  inputNameRegister.setAttribute('type', 'text');
  inputNameRegister.setAttribute('id', 'displayname-name');
  inputNameRegister.setAttribute('placeholder', 'Nombre');

  const inputEmailRegister = document.createElement('input');
  inputEmailRegister.setAttribute('type', 'text');
  inputEmailRegister.setAttribute('id', 'user-email');
  inputEmailRegister.setAttribute('placeholder', 'Email');

  const inputCreatePassword = document.createElement('input');
  inputCreatePassword.setAttribute('type', 'password');
  inputCreatePassword.setAttribute('id', 'user-password');
  inputCreatePassword.setAttribute('placeholder', 'Contraseña');

  // botones
  const buttonCreateAcount = document.createElement('button');
  buttonCreateAcount.textContent = 'Registrarme';
  buttonCreateAcount.setAttribute('class', 'button-register');
  buttonCreateAcount.setAttribute('type', 'button');

  const googleButton = document.createElement('button');
  googleButton.textContent = 'Acceder con Google';
  googleButton.setAttribute('class', 'google-button');

  // mensajes
  const bottomMessage = document.createElement('p');
  bottomMessage.textContent = '¿Ya tienes una cuenta?';

  const bottomMessageGoLogin = document.createElement('a');
  bottomMessageGoLogin.textContent = 'Inicia sesión';

  allDiv.appendChild(logoDiv);
  allDiv.appendChild(registerForm);
  logoDiv.appendChild(pageTitle);
  logoDiv.appendChild(logo);
  logoDiv.appendChild(image);
  registerForm.appendChild(titleRegister);
  registerForm.appendChild(inputNameRegister);
  registerForm.appendChild(inputEmailRegister);
  registerForm.appendChild(inputCreatePassword);
  registerForm.appendChild(buttonCreateAcount);
  registerForm.appendChild(googleButton);
  registerForm.appendChild(bottomMessage);
  registerForm.appendChild(bottomMessageGoLogin);

  // ----------INICIALIZACIÓN DE BOTONES E INPUT
  bottomMessageGoLogin.addEventListener('click', () => {
    onNavigate('/login');
  });

  // evita que se ingresen espacios en la contraseña
  inputCreatePassword.addEventListener('input', (event) => {
    const currentInput = event.target.value;
    const regex = /\s/;
    if (regex.test(currentInput)) {
      inputCreatePassword.value = currentInput.replace(/\s/g, '');
      showMessage('No puedes ingresar espacios');
    }
  });

  // Activa la funcionalidad para validar la cuenta creada con correo y contraseña
  buttonCreateAcount.addEventListener('click', async (e) => {
    e.preventDefault();

    const userName = inputNameRegister.value;
    const email = inputEmailRegister.value;
    const password = inputCreatePassword.value;

    try {
      if (email === '' || password === '' || userName === '') {
        showMessage('Por favor, completa todos los campos');
      } else {
        const userCredentials = await ourCreateUserWithEmailAndPassword(email, password);
        onNavigate('/wall');
        console.log(userCredentials);
      }
    } catch (error) {
      console.log(error.code);
      if (error.code === 'auth/email-already-in-use') {
        showMessage('Este correo ya está registrado');
      } else if (error.code === 'auth/invalid-email') {
        showMessage('Este no es un correo válido');
      } else if (error.code === 'auth/weak-password') {
        showMessage('Tu contraseña es demasiado débil');
      } else if (error.code === 'auth/missing-password') {
        showMessage('Recuerda escribir una contraseña');
      } else if (error.code === 'error.code') {
        showMessage('Algo salió mal');
      }
    }
  });

  // Activa la funcionalidad para validar la cuenta creada con cuenta de Google
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
        showMessage(' La autenticación mediante ventanas emergentes no está soportada en el entorno actual del navegador');
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        showMessage('Existe una cuenta con diferentes credenciales de inicio de sesión asociadas');
      }
    }
  });

  return allDiv;
};
