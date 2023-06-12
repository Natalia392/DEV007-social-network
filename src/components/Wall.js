import { createPost } from '../lib';

export const Wall = (onNavigate) => {
  const wallDiv = document.createElement('main');
  wallDiv.className = 'wall-main';
  const section = document.createElement('section');
  section.innerHTML = `
    <div class="new-post-container" id="new-post-container">
      <textarea class="new-post-text"></textarea><br>
      <button id="post-button" class="post-button">Publicar</button>
    </div>
    <div class="posts">
      <div class="all-posts">
      </div>
      <button id="go-home" class="go-home">Home</button>
    </div>
  `;

  section.querySelector('#post-button').addEventListener('click', () => {
    const textAreaContent = section.querySelector('.new-post-text').value;
    createPost(textAreaContent);
    console.log(textAreaContent);
    alert(textAreaContent);
  });

  const buttonHome = section.querySelector('#go-home');
  buttonHome.addEventListener('click', () => {
    onNavigate('/');
  });

  wallDiv.appendChild(section);

  return wallDiv;
};
