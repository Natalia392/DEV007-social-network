import { createPost, getPosts } from '../lib';
import { showMessage } from './modal';

export const Wall = (onNavigate) => {
  const wallDiv = document.createElement('main');
  wallDiv.className = 'wall-main';
  const section = document.createElement('section');
  section.innerHTML = `
    <div class="new-post-container" id="new-post-container">
      <h2>Pronto podrás postear aquí</h2>
      <textarea class="new-post-text"></textarea><br>
      <button id="post-button" class="post-button">Publicar</button>
    </div>
    <div class="posts">
      <div class="all-posts">
      </div>
      <button id="go-home" class="go-home">Home</button>
    </div>
  `;

  section.querySelector('#post-button').addEventListener('click', async () => {
    const textAreaContent = section.querySelector('.new-post-text').value;
    try {
      if (textAreaContent === '') {
        showMessage('Escribe algo para publicar');
      } else {
        const createdPost = await createPost(textAreaContent);
        console.log(createdPost.data);
        console.log(createdPost.id);// Imprimir el ID del post
        console.log(createdPost.content); // Imprimir el contenido del post

        // Crear un nuevo div para el post
        const postDiv = document.createElement('div');
        postDiv.textContent = createdPost.content;
        // Apendizar el nuevo div al contenedor de posts
        const allPostsContainer = section.querySelector('.all-posts');
        allPostsContainer.appendChild(postDiv);
        section.querySelector('.new-post-text').value = '';
      }
    } catch (error) {
      console.error(error);
    }
  });

  window.addEventListener('DOMContentLoaded', async () => {
    const querySnapshot = await getPosts();

    let html = '';

    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      const post = doc.data();
      html += `
      <div class="post-div"> ${post.content} </div>
      `;
    });

    const allPostsDiv = section.querySelector('.all-posts');

    allPostsDiv.innerHTML = html;
  });

  const buttonHome = section.querySelector('#go-home');
  buttonHome.addEventListener('click', () => {
    onNavigate('/');
  });

  wallDiv.appendChild(section);

  return wallDiv;
};
