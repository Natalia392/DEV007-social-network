import { createPost, getPosts, onGetPosts } from '../lib';
import { showMessage } from './modal';

export const Wall = (onNavigate) => {
  // Crea el div donde están todos los elementos del wall
  const wallDiv = document.createElement('main');
  wallDiv.className = 'wall-main';

  // Crea el header div
  const headerWall = document.createElement('div');
  headerWall.className = 'header-wall';

  // Crea el logo
  const logoWall = document.createElement('img');
  logoWall.src = './assets/images/Logo-Comunidad.png';
  logoWall.className = 'logo-wall';
  headerWall.appendChild(logoWall);

  // Crea el titulo de la comunidad
  const name = document.createElement('p');
  name.textContent = 'La Comunidad del Libro';
  name.className = 'comunidad-libro-wall';
  headerWall.appendChild(name);

  // Crea el a de cerrar sesión
  const logoutButton = document.createElement('a');
  logoutButton.textContent = 'Cerrar sesión';
  logoutButton.className = 'cerrar-sesion';
  headerWall.appendChild(logoutButton);

  // Apendiza el header al wallDiv
  wallDiv.appendChild(headerWall);

  // Sección de los posts
  const section = document.createElement('section');
  section.className = 'posts-section';
  section.innerHTML = `
    <div class="new-post-container" id="new-post-container">
      <input class="new-post-text" placeholder="Escribe aquí lo que quieras compartir sobre libros que hayas leído recientemente"></input><br>
      <button id="post-button" class="post-button">Publica tu post</button>
    </div>
    <div class="all-posts">
    </div>
    <div>
      <button id="go-home" class="go-home">Home</button>
    </div>
    `;

  const allPostsDiv = section.querySelector('.all-posts');
  let html = '';

  section.querySelector('#post-button').addEventListener('click', async () => {
    const textAreaContent = section.querySelector('.new-post-text');
    try {
      if (textAreaContent === '') {
        showMessage('Escribe algo para publicar');
      } else {
        const createdPost = await createPost(textAreaContent.value);
        console.log(createdPost.id);// Imprimir el ID del post
        console.log(createdPost.content); // Imprimir el contenido del post
        console.log(createdPost.user);
        console.log(createdPost.postDate);

        // Crear un nuevo div para el post
        // const postDiv = document.createElement('div');
        // postDiv.textContent = createdPost.content;
        // Apendizar el nuevo div al contenedor de posts
        // const allPostsContainer = section.querySelector('.all-posts');
        // allPostsContainer.appendChild(postDiv);
        section.querySelector('.new-post-text').value = '';
      }
    } catch (error) {
      console.error(error);
    }
  });
  onGetPosts((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const post = doc.data();
      html += `
            <div class="post-div"> ${post.content}</div>
            `;
    });
    allPostsDiv.innerHTML = html;
  });

  window.addEventListener('DOMContentLoaded', async () => {
    console.log('DOMContentLoaded event fired');
  });

  const buttonHome = section.querySelector('#go-home');
  buttonHome.addEventListener('click', () => {
    onNavigate('/');
  });

  wallDiv.appendChild(section);

  return wallDiv;
};
