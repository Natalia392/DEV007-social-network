// eslint-disable-next-line no-unused-vars
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../app/firebase';

export const Register = (onNavigate) => {
  // Elementos que se crean para el formulario
  const titleRegister = document.createElement('h1');
  const registerForm = document.createElement('form');
  const inputNameRegister = document.createElement('input');
  const inputEmailRegister = document.createElement('input');
  const inputCreatePassword = document.createElement('input');
  const buttonCreateAcount = document.createElement('button');
  const bottomMessage = document.createElement('p');
  const bottomMessageGoLogin = document.createElement('a');
  const successMessage = document.createElement('p');

  titleRegister.textContent = 'Regístrate';
  buttonCreateAcount.textContent = 'Registrarme';
  bottomMessage.textContent = '¿Ya tienes una cuenta?';
  bottomMessageGoLogin.textContent = 'Inicia sesión';

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

  return registerForm;
};
