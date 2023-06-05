export const Login = (onNavigate) => {
  const titleLogin = document.createElement('h1');
  const loginForm = document.createElement('form');
  const inputEmailLogin = document.createElement('input');
  const inputPasswordLogin = document.createElement('input');
  const buttonLogin = document.createElement('button');
  const bottomMessage = document.createElement('p');
  const bottomMessageGoRegister = document.createElement('a');

  titleLogin.textContent = 'Inicia Sesión';
  buttonLogin.textContent = 'Ingresar';
  bottomMessage.textContent = '¿Aún no tienes una cuenta?';
  bottomMessageGoRegister.textContent = 'Regístrate';

  inputEmailLogin.setAttribute('type', 'text');
  inputEmailLogin.setAttribute('id', 'user-email');
  inputEmailLogin.setAttribute('placeholder', 'Email');

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

  return loginForm;
};
