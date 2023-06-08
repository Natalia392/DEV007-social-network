export const Wall = (onNavigate) => {
  const titleHome = document.createElement('h1');
  const wallDiv = document.createElement('div');
  const buttonToHome = document.createElement('button');

  buttonToHome.textContent = 'Go home';

  titleHome.textContent = 'Proximamente podrás postear';

  buttonToHome.addEventListener('click', () => {
    onNavigate('/');
  });

  wallDiv.appendChild(buttonToHome);
  wallDiv.appendChild(titleHome);

  return wallDiv;
};
