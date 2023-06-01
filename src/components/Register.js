export const Register = (onNavigate) => {
  const RegisterDiv = document.createElement('div');
  const nameRegister = document.createElement('p');
  const inputNameRegister = document.createElement('input');
  const emailRegister = document.createElement('p');
  const inputEmailRegister = document.createElement('input');
  const passwordRegister = document.createElement('p');
  const inputCreatePassword = document.createElement('input');
  const buttonCreateAcount = document.createElement('button');

  nameRegister.textContent = 'Nombre';
  emailRegister.textContent = 'Correo';
  passwordRegister.textContent = 'Constraseña';
  buttonCreateAcount.textContent = 'Crear cuenta';

  RegisterDiv.appendChild(nameRegister);
  RegisterDiv.appendChild(inputNameRegister);
  RegisterDiv.appendChild(emailRegister);
  RegisterDiv.appendChild(inputEmailRegister);
  RegisterDiv.appendChild(inputCreatePassword);
  RegisterDiv.appendChild(buttonCreateAcount);
};
