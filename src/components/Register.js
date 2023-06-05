export const Register = (onNavigate) => {

  const title = document.createElement('h1');
  const RegisterForm = document.createElement('form');
  const inputNameRegister = document.createElement('input');
  const inputEmailRegister = document.createElement('input');
  const inputCreatePassword = document.createElement('input');
  const buttonCreateAcount = document.createElement('button');
  const bottomMessage = document.createElement('p');
  const bottomMessageLogin = document.createElement('a');


  title.textContent = 'Regístrate';
  buttonCreateAcount.textContent = 'Registrarme';
  bottomMessage.textContent = '¿Ya tienes una cuenta?';
  bottomMessageLogin.textContent = 'Inicia sesión';

  inputNameRegister.setAttribute('type', 'text');
  inputNameRegister.setAttribute('id', 'user-name');
  inputNameRegister.setAttribute('placeholder', 'Nombre');
  
  inputEmailRegister.setAttribute('type', 'text');
  inputEmailRegister.setAttribute('id', 'user-email');
  inputEmailRegister.setAttribute('placeholder', 'Email');

  inputCreatePassword.setAttribute('type', 'password');
  inputCreatePassword.setAttribute('id', 'user-password');
  inputCreatePassword.setAttribute('placeholder', 'Contraseña');

  RegisterForm.appendChild(title);
  RegisterForm.appendChild(inputNameRegister);
  RegisterForm.appendChild(inputEmailRegister);
  RegisterForm.appendChild(inputCreatePassword);
  RegisterForm.appendChild(buttonCreateAcount);
  RegisterForm.appendChild(bottomMessage);
  RegisterForm.appendChild(bottomMessageLogin);

  bottomMessageLogin.addEventListener('click', () => {
    onNavigate('/login');
  });

  return RegisterForm;
};
