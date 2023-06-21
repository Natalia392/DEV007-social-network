import {
  onGetPosts,
  incrementLikes,
  getCurrentUser,
  checkIfUserLikedPost,
  createPost,
  revertLike,
  saveLikesToPost,
  removeLikesFromPost,
  deletePost,
} from '../lib';
import { showMessage } from './modal';

export const Wall = (onNavigate) => {
  // Crea el div donde están todos los elementos del wall
  const wallDiv = document.createElement('main');
  wallDiv.className = 'wall-main';

  // Crea el header div
  const headerWall = document.createElement('div');
  headerWall.className = 'header-wall';

  // Crea el logo
  const logoWallDiv = document.createElement('div');
  const logoWall = document.createElement('img');
  logoWallDiv.className = 'logo-wall-div';
  logoWall.src = './assets/images/Logo-Comunidad.png';
  logoWall.className = 'logo-wall';
  logoWallDiv.appendChild(logoWall);

  // Crea el titulo de la comunidad
  const name = document.createElement('p');
  name.textContent = 'La Comunidad del Libro';
  name.className = 'comunidad-libro-wall';
  logoWallDiv.appendChild(name);
  headerWall.appendChild(logoWallDiv);

  // Crea el a de cerrar sesión
  const signOutDiv = document.createElement('div');
  const logoutButton = document.createElement('a');
  logoutButton.textContent = 'Cerrar sesión';
  logoutButton.className = 'cerrar-sesion';
  signOutDiv.appendChild(logoutButton);
  headerWall.appendChild(signOutDiv);

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
    <div class="pink-container">
      <h2 class="title-posts">Todas las publicaciones</h2>
      <div class="all-posts">
      </div>
    <div>
      <button id="go-home" class="go-home">Home</button>
    </div>
    `;

  const allPostsDiv = section.querySelector('.all-posts');
  section.querySelector('#post-button').addEventListener('click', async () => {
    const textAreaContent = section.querySelector('.new-post-text');
    try {
      if (textAreaContent.value === '') {
        showMessage('Escribe algo para publicar');
      } else {
        await createPost(textAreaContent.value);

        // console.log(`Fecha: ${año}-${mes}-${dia}`);
        // console.log(`Hora: ${hora}:${minutos}:${segundos}`);
        section.querySelector('.new-post-text').value = '';
      }
    } catch (error) {
      console.error(error);
    }
  });

  /* FUNCION PARA ELIMINAR LOS POST EN CASO DE NECESITARLA
  section.querySelector('#post-button').addEventListener('click', async () => {
    const textAreaContent = section.querySelector('.new-post-text');
    try {
      if (textAreaContent.value === '') {
        await deleteAllPosts();
        console.log('Posts eliminados.');
      } else {
        // Resto de tu código para crear un nuevo post
      }
    } catch (error) {
      console.error(error);
    }
  }); */

  onGetPosts((querySnapshot) => {
    let postHtml = ''; // Variable para almacenar el postHTML de las publicaciones
    querySnapshot.forEach((doc) => {
      const post = doc.data();
      console.log(post);
      const postDate = post.postDate.toDate();
      const postYear = postDate.getFullYear();
      const postMonth = postDate.getMonth() + 1;
      const postDay = postDate.getDate();
      const likes = post.likes || 0;
      console.log(post.emailOfUser);
      // const user = post.userWhoPosted;
      // const username = user.displayName;
      console.log(likes);

      postHtml += `
  <div>
    <div class="like-div">
      <p class="user-name">${post.emailOfUser}</p>
      <img class="delete-icon" src="/assets/images/delete-icon.png">
      <img class="edit-icon" src="/assets/images/edit-icon.png" data-id="${doc.id}">
      <img class="like-button" src="/assets/images/before-like.png" data-id="${doc.id}">
    </div>
    <div class="post-div" data-id="${doc.id}">${post.content}</div>
    <div class="date-container">
      <p class="p-date">Fecha: ${postYear}-${postMonth}-${postDay}</p>
      <p class="p-likes">Likes: ${likes}</p>
    </div>
  </div>
`;
    });
    allPostsDiv.innerHTML = postHtml;

    // Agregar evento de clic a los botones de like
    allPostsDiv.addEventListener('click', async (event) => {
      const clickedElement = event.target;
      if (clickedElement.matches('.like-button')) {
        const postId = clickedElement.dataset.id;
        console.log(postId);
        try {
          const user = getCurrentUser();
          if (user) {
            const userId = user.uid;
            console.log(userId);
            const hasLiked = await checkIfUserLikedPost(userId, postId);
            if (!hasLiked) {
              incrementLikes(postId).then(async () => {
                clickedElement.src = './assets/images/after-like.png';
                await saveLikesToPost(postId, userId);
              });
            } else {
              revertLike(postId).then(async () => {
                clickedElement.src = './assets/images/before-like.png';
                await removeLikesFromPost(postId);
              });
            }
          }
        } catch (error) {
          console.error(`Error al gestionar el like: ${error.message}`);
        }
      }
    });
  });

  // función para eliminar los posts
  allPostsDiv.addEventListener('click', async (event) => {
    const clickedElement = event.target;
    if (clickedElement.matches('.delete-icon')) {
      await deletePost(clickedElement.dataset.id);
      console.log(clickedElement.dataset.id);
      console.log('delete');
    }
  });

  window.addEventListener('DOMContentLoaded', async () => {
    console.log('DOMContentLoaded event fired');
  });

  const buttonHome = section.querySelector('#go-home');
  buttonHome.addEventListener('click', () => {
    onNavigate('/');
  });
  const editIcons = allPostsDiv.querySelectorAll('.edit-icon');
  editIcons.forEach((editIcon) => {
    editIcon.addEventListener('click', () => {
      const postDiv = editIcon.parentNode.parentNode.querySelector('.post-div');
      postDiv.contentEditable = true;
      postDiv.focus();
    });
  });
  wallDiv.appendChild(section);

  return wallDiv;
};
