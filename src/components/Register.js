import { ourCreateUserWithEmailAndPassword, signInWithGoogle } from '../lib';
import { showMessage } from './modal';

export const Register = (onNavigate) => {
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

  // ----------------------Atributos de los elementos de arriba
  logo.setAttribute('alt', 'logo');
  logo.setAttribute('class', 'logo');
  image.setAttribute('class', 'image-logo');
  logoDiv.setAttribute('class', 'container-image');

  // Elementos que se crean para el formulario
  // Título y formulario
  const titleRegister = document.createElement('h1');
  const registerForm = document.createElement('form');

  // inputs
  const inputNameRegister = document.createElement('input');
  const inputEmailRegister = document.createElement('input');
  const inputCreatePassword = document.createElement('input');

  // botones
  const buttonCreateAcount = document.createElement('button');
  const googleButton = document.createElement('button');

  // mensajes
  const bottomMessage = document.createElement('p');
  // eslint-disable-next-line no-unused-vars
  const warnNoSpacesAllowed = document.createElement('p');
  const bottomMessageGoLogin = document.createElement('a');
  const successMessage = document.createElement('p');

  titleRegister.textContent = 'Regístrate';
  buttonCreateAcount.textContent = 'Registrarme';
  googleButton.textContent = 'Regístrate con Google';
  bottomMessage.textContent = '¿Ya tienes una cuenta?';
  bottomMessageGoLogin.textContent = 'Inicia sesión';

  buttonCreateAcount.setAttribute('class', 'button-register');
  buttonCreateAcount.setAttribute('type', 'button');
  inputNameRegister.setAttribute('type', 'text');
  inputNameRegister.setAttribute('id', 'user-name');
  inputNameRegister.setAttribute('placeholder', 'Nombre');
  registerForm.setAttribute('class', 'sub-div');

  inputEmailRegister.setAttribute('type', 'text');
  inputEmailRegister.setAttribute('id', 'user-email');
  inputEmailRegister.setAttribute('placeholder', 'Email');

  inputCreatePassword.setAttribute('type', 'password');
  inputCreatePassword.setAttribute('id', 'user-password');
  inputCreatePassword.setAttribute('placeholder', 'Contraseña');

  googleButton.setAttribute('class', 'google-button');

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
  registerForm.appendChild(bottomMessage);
  registerForm.appendChild(bottomMessageGoLogin);
  registerForm.appendChild(googleButton);

  // Elementos que se crean para la ventana modal
  const divModal = document.createElement('div');
  const divTextInModal = document.createElement('div');
  const spanModal = document.createElement('span');
  // eslint-disable-next-line no-unused-vars
  const modalMessage = document.createElement('p');

  divModal.setAttribute('id', 'div-modal');
  divModal.setAttribute('class', 'modal');

  divTextInModal.setAttribute('class', 'modal-content');

  spanModal.setAttribute('class', 'close');
  spanModal.textContent = '&times;';

  bottomMessageGoLogin.addEventListener('click', () => {
    onNavigate('/login');
  });

  inputCreatePassword.addEventListener('input', (event) => {
    const currentInput = event.target.value;
    const regex = /\s/;
    if (regex.test(currentInput)) {
      inputCreatePassword.value = currentInput.replace(/\s/g, '');
      showMessage('No puedes ingresar espacios');
    }
  });

  buttonCreateAcount.addEventListener('click', async (e) => {
    e.preventDefault();

    const userName = inputNameRegister.value;
    const email = inputEmailRegister.value;
    const password = inputCreatePassword.value;

    if (email === '' || password === '' || userName === '') {
      showMessage('Por favor, completa todos los campos');
      return;
    }

    try {
      const userCredentials = await ourCreateUserWithEmailAndPassword(email, password);
      registerForm.appendChild(successMessage);
      onNavigate('/wall');
      console.log(userCredentials);
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
