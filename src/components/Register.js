import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../app/firebase';

export const Register = (onNavigate) => {
  const titleRegister = document.createElement('h1');
  const RegisterForm = document.createElement('form');
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

  RegisterForm.appendChild(titleRegister);
  RegisterForm.appendChild(inputNameRegister);
  RegisterForm.appendChild(inputEmailRegister);
  RegisterForm.appendChild(inputCreatePassword);
  RegisterForm.appendChild(buttonCreateAcount);
  RegisterForm.appendChild(bottomMessage);
  RegisterForm.appendChild(bottomMessageGoLogin);

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
      RegisterForm.appendChild(successMessage);

      console.log(userCredentials);
    } catch (error) {
      console.log(error);
    }
  });

  return RegisterForm;
};
