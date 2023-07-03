import {
  onGetPosts,
  getCurrentUser,
  createPost,
  deletePost,
  editPost,
  likePost,
  removeLike,
  userLogOut,
} from '../lib';
import { showMessage, showDeleteMessage, showEditModal } from './modal';
import logoComunidad from '../assets/images/Logo-Comunidad.png';
// import afterLike from '../assets/images/after-like.png';
// import beforeLike from '../assets/images/before-like.png';
import books from '../assets/images/books2.png';
import deleteIcon from '../assets/images/delete-icon.png';
import editIcon from '../assets/images/edit-icon.png';

export const Wall = (onNavigate) => {
  // Creación del div que contiene tanto header como main y footer

  const wallDiv = document.createElement('div');
  wallDiv.className = 'wall-div';

  // -----------Creación del header y todos sus elementos----------------

  // Crea el header div
  const headerWall = document.createElement('header');
  headerWall.className = 'header-wall';

  // Crea el logo
  const logoWallDiv = document.createElement('div');
  logoWallDiv.className = 'logo-wall-div';

  const imgLogo = document.createElement('img');
  imgLogo.className = 'logo-wall';
  imgLogo.src = logoComunidad;

  // Crea el titulo de la comunidad
  const appName = document.createElement('p');
  appName.textContent = 'La Comunidad del Libro';
  appName.className = 'comunidad-libro-wall';

  // Crea el a de cerrar sesión
  const logoutDiv = document.createElement('div');
  logoutDiv.className = 'logout-div';

  const logoutButton = document.createElement('a');
  logoutButton.textContent = 'Cerrar sesión';
  logoutButton.className = 'logout-btn';

  // -----------Creación del footer----------------
  const footerDiv = document.createElement('footer');
  footerDiv.className = 'footer';

  const createdByDiv = document.createElement('div');
  createdByDiv.className = 'created-by';

  const createdByText = document.createElement('p');
  createdByText.textContent = '®Creado por Javiera Gandarillas, Natalia Torrejón y Andrea Ramirez';

  const footerText = document.createElement('p');
  footerText.className = 'footer-text';
  footerText.textContent = 'Por favor, Sé amable con los otros participantes de la red social';

  // Se apendizan todos los elementos dentro del header y el header dentro del wall
  logoWallDiv.appendChild(imgLogo);
  logoWallDiv.appendChild(appName);
  logoutDiv.appendChild(logoutButton);
  headerWall.appendChild(logoWallDiv);
  headerWall.appendChild(logoutDiv);
  wallDiv.appendChild(headerWall);

  // ----POSTS PUBLICADOS---------CREACIÓN DE LA SECCIÓN DE POSTS (<main>)----------------
  // ----POSTS PUBLICADOS-1--------Primero se crea el html para ingresar un nuevo post
  const wallMain = document.createElement('main');
  wallMain.className = 'posts-main';
  wallMain.innerHTML = `
  <div class="books">
  <img class="books" src="${books}">
  </div>
  <div class="new-post-container" id="new-post-container">
      <input class="new-post-text" placeholder="Escribe aquí lo que quieras compartir sobre libros que hayas leído recientemente"></input><br>
      <button id="post-button" class="post-button">Publicar</button>
    </div>
    <div class="pink-container">
      <h2 class="title-posts">Todas las publicaciones</h2>
      <div class="all-posts"></div>
    </div>
    `;
  // Luego se llama al botón de postear para que al darle click genere un nuevo post
  // Esto se hace usando el método de firebase, que incluimos en nuestra función createPost
  wallMain.querySelector('#post-button').addEventListener('click', async () => {
    const inputPost = wallMain.querySelector('.new-post-text');
    try {
      if (inputPost.value === '') {
        showMessage('Escribe algo para publicar');
      } else {
        createPost(inputPost.value, (postData) => {
          // console.log(postData);
          // Se pasa como argumento el texto del input a createPost
          wallMain.querySelector('.new-post-text').value = '';
          return postData;
        });
      }
    } catch (error) {
      // console.error(error);
      throw new Error(`Error al crear el post: ${error.message}`);
    }
  });

  // ----POSTS PUBLICADOS-2--Luego se declara la constante que contendrá todos los posts publicados
  const allPostsDiv = wallMain.querySelector('.all-posts');
  // obetenemos el usuario actual

  // El querySnapshot es un objeto que resulta de una consulta (query) a firestore
  // onGetPosts nos trae todos los posts de la colección posts
  onGetPosts((querySnapshot) => {
    const currentUser = getCurrentUser();
    let postHtml = ''; // Variable para almacenar el postHTML de las publicaciones
    querySnapshot.forEach((documentSnapshot) => {
      const post = documentSnapshot.data();
      const postDate = post.postDate.toDate();
      const postYear = postDate.getFullYear();
      const postMonth = postDate.getMonth() + 1; // Los meses del año se cuentan desde 1 en firebase
      const postDay = postDate.getDate();
      const likes = post.likes.length || 0;
      const likedByUser = post.likes.includes(currentUser.email);
      // aquí validamos si el usuario ya le dio like
      let likeButtonImg = 'https://firebasestorage.googleapis.com/v0/b/la-comunidad-del-libro.appspot.com/o/before-like.png?alt=media&token=d08feeef-ed66-445a-b1f2-3c78757e600b';
      if (likedByUser) {
        likeButtonImg = 'https://firebasestorage.googleapis.com/v0/b/la-comunidad-del-libro.appspot.com/o/after-like.png?alt=media&token=cf96cdc1-0e76-40ab-8dd1-160583978b56';
      }
      // aquí bindeamos cuál se deberá colocar, si el corazón likeado o vacío.
      if (currentUser.email === post.emailOfUser) {
        postHtml += `
        <div>
          <div class="like-div">
            <p class="user-name">${post.emailOfUser}</p>
            <img class="delete-icon" src="${deleteIcon}" data-id="${documentSnapshot.id}">
            <img class="edit-icon" src="${editIcon}" data-id="${documentSnapshot.id}">
            <img class="like-button" src="${likeButtonImg}" data-id="${documentSnapshot.id}">
          </div>
          <div class="post-div" data-id="${documentSnapshot.id}">${post.content}</div>
          <div class="date-container">
            <p class="p-date">Fecha: ${postYear}-${postMonth}-${postDay}</p>
            <p class="p-likes">Likes: ${likes}</p>
          </div>
        </div>
      `;
      } else {
        postHtml += `
        <div>
          <div class="like-div">
            <p class="user-name">${post.emailOfUser}</p>
            <img class="like-button" src="${likeButtonImg}" data-id="${documentSnapshot.id}">
          </div>
          <div class="post-div" data-id="${documentSnapshot.id}">${post.content}</div>
          <div class="date-container">
            <p class="p-date">Fecha: ${postYear}-${postMonth}-${postDay}</p>
            <p class="p-likes">Likes: ${likes}</p>
          </div>
        </div>
      `;
      }
    });
    // ---POSTS PUBLICADOS-3--- finalmente se introduce el html dentro del div de posts
    allPostsDiv.innerHTML = postHtml;

    // ------INICIALIZACIÓN FUNCIONALIDAD ÍCONOS BORRAR, LIKE, EDITAR -----------------
    const deletePostButtons = document.querySelectorAll('.delete-icon'); // ojito aquí
    const editPostButtons = document.querySelectorAll('.edit-icon'); // ojito aquí x2
    const likePostButtons = allPostsDiv.querySelectorAll('.like-button'); // estos se toman ALL, ojo aquí debemos referenciar al contenedor padre

    // Inicialización botón delete
    if (deletePostButtons) {
      deletePostButtons.forEach((deletePostButton) => {
        deletePostButton.addEventListener('click', async () => {
          const postId = deletePostButton.dataset.id;
          const deletePostCallBack = () => deletePost(postId);
          showDeleteMessage({ deletePostCallBack });
        });
      }); // <- Agregar el cierre del paréntesis aquí
    }

    // Inicialización botón edit
    if (editPostButtons) {
      editPostButtons.forEach((editPostButton) => {
        editPostButton.addEventListener('click', async () => {
          const postId = editPostButton.dataset.id;
          const postContentDiv = editPostButton.parentNode.parentNode.querySelector('.post-div');
          const postContent = postContentDiv.textContent; // Obtener el contenido original del post
          showEditModal(postContent, async (newText) => {
            if (newText !== '') {
              await editPost(postId, newText);
              // console.log(newText);
            } else {
              showMessage('No has introducido nada');
            }
          });
        });
      });
    }

    // Inicialización botón like
    likePostButtons.forEach((likePostButton) => {
      likePostButton.addEventListener('click', async () => {
        const postId = likePostButton.dataset.id;
        const post = querySnapshot.docs.find((doc) => doc.id === postId);
        const postData = post.data();

        if (postData.likes && postData.likes.includes(currentUser.email)) {
          await removeLike(postId, currentUser.email);
          postData.likes = postData.likes.filter((like) => like !== currentUser.email);
          likePostButton.src = 'https://firebasestorage.googleapis.com/v0/b/la-comunidad-del-libro.appspot.com/o/before-like.png?alt=media&token=d08feeef-ed66-445a-b1f2-3c78757e600b';
        } else {
          await likePost(postId, currentUser.email);
          postData.likes.push(currentUser.email);
          likePostButton.src = 'https://firebasestorage.googleapis.com/v0/b/la-comunidad-del-libro.appspot.com/o/after-like.png?alt=media&token=cf96cdc1-0e76-40ab-8dd1-160583978b56';
        }

        const likesCountElement = likePostButton.parentNode.parentNode.querySelector('.p-likes');
        likesCountElement.textContent = `Likes: ${postData.likes.length}`;
      });
    });
  });

  logoutButton.addEventListener('click', () => {
    userLogOut().then(() => {
      console.log('saliendo de la web');
      localStorage.clear();
      onNavigate('/');
    });
  });

  wallDiv.appendChild(wallMain);
  wallDiv.appendChild(footerDiv);
  createdByDiv.appendChild(createdByText);
  footerDiv.appendChild(createdByDiv);
  footerDiv.appendChild(footerText);

  return wallDiv;
};
