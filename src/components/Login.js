import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../app/firebase';

export const Login = (onNavigate) => {
  const titleLogin = document.createElement('h1');
  const loginForm = document.createElement('form');
  const inputEmailLogin = document.createElement('input');
  const inputPasswordLogin = document.createElement('input');
  const buttonLogin = document.createElement('button');
  const bottomMessage = document.createElement('p');
  const bottomMessageGoRegister = document.createElement('a');
  const googleButton = document.createElement('button');

  titleLogin.textContent = 'Inicia Sesión';
  buttonLogin.textContent = 'Ingresar';
  googleButton.textContent = 'Ingresar con Google';
  bottomMessage.textContent = '¿Aún no tienes una cuenta?';
  bottomMessageGoRegister.textContent = 'Regístrate';

  buttonLogin.setAttribute('class', 'button-login');
  inputEmailLogin.setAttribute('type', 'text');
  inputEmailLogin.setAttribute('id', 'user-email');
  inputEmailLogin.setAttribute('placeholder', 'Email');
  loginForm.setAttribute('class', 'sub-div');

  inputPasswordLogin.setAttribute('type', 'password');
  inputPasswordLogin.setAttribute('id', 'user-password');
  inputPasswordLogin.setAttribute('placeholder', 'Contraseña');

  loginForm.appendChild(titleLogin);
  loginForm.appendChild(inputEmailLogin);
  loginForm.appendChild(inputPasswordLogin);
  loginForm.appendChild(buttonLogin);
  loginForm.appendChild(bottomMessage);
  loginForm.appendChild(bottomMessageGoRegister);

  bottomMessageGoRegister.addEventListener('click', () => {
    onNavigate('/register');
  });

  buttonLogin.addEventListener('click', async (e) => {
    e.preventDefault();

    const email = inputEmailLogin.value;
    const password = inputPasswordLogin.value;

    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredentials);
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/invalid-email') {
        alert('El correo electrónico proporcionado no es válido');
      } else if (error.code === 'auth/wrong-password') {
        alert('La contraseña ingresada es incorrecta');
      } else if (error.code === 'auth/missing-password') {
        alert('No se ha proporcionado una contraseña');
      } else if (error.code === 'auth/user-not-found') {
        alert('El usuario no ha sido encontrado');
      } else if (error.code === 'error.code') {
        alert('Algo salió mal');
      }
    }
  });

  return loginForm;
};
