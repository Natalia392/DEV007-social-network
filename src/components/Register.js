// eslint-disable-next-line no-unused-vars
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../app/firebase';

export const Register = (onNavigate) => {
  // Elementos que se crean para el formulario
  const titleRegister = document.createElement('h1');
  const registerForm = document.createElement('form');
  const inputNameRegister = document.createElement('input');
  const inputEmailRegister = document.createElement('input');
  const inputCreatePassword = document.createElement('input');
  const buttonCreateAcount = document.createElement('button');
  const googleButton = document.createElement('button');
  const bottomMessage = document.createElement('p');
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

  inputEmailRegister.setAttribute('type', 'text');
  inputEmailRegister.setAttribute('id', 'user-email');
  inputEmailRegister.setAttribute('placeholder', 'Email');

  inputCreatePassword.setAttribute('type', 'password');
  inputCreatePassword.setAttribute('id', 'user-password');
  inputCreatePassword.setAttribute('placeholder', 'Contraseña');

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

  // eslint-disable-next-line spaced-comment
  /* const showModalUsedEmail = () => {
    divModal.style.display = 'block';

    divTextInModal.innerHTML = '';
    modalMessage.innerHTML = '';

    divTextInModal.textContent = 'Error';
    modalMessage.textContent = 'Este correo ya está registrado';

    divModal.appendChild(divTextInModal);
    divTextInModal.appendChild(spanModal);
    divTextInModal.appendChild(modalMessage);
  };*/

  bottomMessageGoLogin.addEventListener('click', () => {
    onNavigate('/login');
  });
  buttonCreateAcount.addEventListener('click', async (e) => {
    e.preventDefault();

    const email = inputEmailRegister.value;
    const password = inputCreatePassword.value;

    // console.log(email, password);
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      successMessage.innerHTML = '¡Has iniciado sesión exitosamente!';
      registerForm.appendChild(successMessage);

      console.log(userCredentials);
    } catch (error) {
      console.log(error.code);
      if (error.code === 'auth/email-already-in-use') {
        // showModalUsedEmail();
        alert('Este correo ya está registrado');
      } else if (error.code === 'auth/invalid-email') {
        alert('Este no es un correo válido');
      } else if (error.code === 'auth/weak-password') {
        alert('Tu contraseña es demasiado débil');
      } else if (error.code === 'auth/missing-password') {
        alert('Recuerda escribir una contraseña');
      } else if (error.code === 'error.code') {
        alert('Algo salió mal');
      }
    }
  });

  googleButton.addEventListener('click', async (e) => {
    e.preventDefault();

    const provider = new GoogleAuthProvider();

    try {
      const credentials = await signInWithPopup(auth, provider);
      console.log(credentials);
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        // showModalUsedEmail();
        alert('El usuario cerró la ventana emergente de inicio de sesión de Google antes de completar el proceso');
      } else if (error.code === 'auth/popup-blocked') {
        alert('El navegador del usuario bloqueó la ventana emergente de inicio de sesión de Google');
      } else if (error.code === 'auth/cancelled-popup-request') {
        alert('La solicitud de ventana emergente de inicio de sesión de Google fue cancelada antes de completarse');
      } else if (error.code === 'auth/operation-not-supported-in-this-environment') {
        alert(' La autenticación mediante ventanas emergentes no está soportada en el entorno actual del navegador');
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        alert('Existe una cuenta con diferentes credenciales de inicio de sesión asociadas');
      }
    }
  });

  return registerForm;
};
