import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  // onAuthStateChanged,
} from 'firebase/auth';

import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  getDoc,
  onSnapshot,
  query,
  doc as firestoreDoc,
  updateDoc,
  deleteDoc,
  increment,
} from 'firebase/firestore';

import { auth, db } from '../app/firebase';

// Crea un nuevo usuario con el método de autenticación de correo y contraseña de Firebase.
export const ourCreateUserWithEmailAndPassword = async (email, password) => {
  await createUserWithEmailAndPassword(auth, email, password);
};

// Inicia sesión el método de autenticación anterior
export const ourSignInWithEmailAndPassword = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};

// Inicia sesión en la aplicación utilizando la autenticación de Google.
export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

// Función para crear una referencia al documento del usuario actual
export const getUserRef = (userId) => firestoreDoc(db, 'users', userId);

// Exporta el usuario actual
export const getCurrentUser = () => auth.currentUser;

// Función para incrementar los likes
export const incrementLikes = async (postId) => {
  const postRef = firestoreDoc(db, 'posts', postId); // Crea la referencia al documento post
  const postDoc = await getDoc(postRef); // Obtiene el documento referenciado
  if (postDoc.exists()) { // si existe el documento entonces...
    const currentLikes = postDoc.data().likes || 0;// o hay o no hay likes
    await updateDoc(postRef, { likes: currentLikes + 1 });// Actualiza sumandole 1 a los like

    const user = getCurrentUser();// obtiene el usuario actual
    if (user) { // si hay usuario...
      const userId = user.uid;// Obtiene su id
      const likesRef = collection(postRef, 'likes');// Crea referencia a la subcolección likes
      await addDoc(likesRef, { userId });// Añade el id del usuario likeador
    }
  } else {
    throw new Error('La publicación no existe.');
  }
};

// Función para revertir un like
export const revertLike = async (postId) => {
  const postRef = firestoreDoc(db, 'posts', postId);// Crea la referencia al documento que contiene el post
  const postDoc = await getDoc(postRef);// Obtiene el documento
  if (postDoc.exists()) { // Aló post, estas?
    const currentLikes = postDoc.data().likes || 0;// si si estoy, puedo tener un like o ninguno

    if (currentLikes > 0) { // si hay algún like, entonces...
      await updateDoc(postRef, { likes: currentLikes - 1 });// se espera actualización del doc, -1<3

      const currentUser = getCurrentUser();// se obtiene el usuario actual
      if (currentUser) { // alo, usuario, estas?
        const cuerrentUserId = currentUser.uid; // aquí estoy yo usuario y me llamo userId
        const likesRef = collection(postRef, 'likes');// Crea la referencia a la subcolección del like
        const querySnapshot = await getDocs(likesRef);// Toma una instantanea de la subcolección <3
        // filtra el documento y comprueba cual es el usuario actual
        const likeDocs = querySnapshot.docs.filter((doc) => doc.data().userId === cuerrentUserId);

        if (likeDocs.length > 0) { // si es que hay likes...
          // Se crea una referencia al documento de "likes" específico del usuario actual
          const likeDocRef = firestoreDoc(db, 'posts', postId, 'likes', likeDocs[0].id);
          await deleteDoc(likeDocRef); // Borra el documento referenciado
        }
      }
    }
  } else {
    throw new Error('La publicación no existe.');
  }
};

// Función para guardar los likes de los usuarios en el documento del post
export const saveLikesToPost = async (postId, userId) => {
  const postRef = firestoreDoc(db, 'posts', postId);// Crea la referencia con el id del post
  const userRef = getUserRef(userId);// Crea referencia y obtiene el user con id del post
  await updateDoc(postRef, {
    // actualiza el like en el post
    likes: increment(1), // súmale 1
    likedBy: firestoreDoc.FieldValue.arrayUnion(userRef), // <- de quién es el like?
  });
};

// Verifica si un usuario ha dado "me gusta" a un post específico.
export const checkIfUserLikedPost = async (userId, postId) => {
  const likesRef = collection(db, 'posts', postId, 'likes');// Crea la referencia a likes de los post
  const querySnapshot = await getDocs(likesRef);// Instantanea del like del usuario
  return querySnapshot.docs.some((doc) => doc.data().userId === userId);// que usuario dió like
};

/* Función para eliminar todos los posts
export const deleteAllPosts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'posts'));

    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    console.log('Todos los posts han sido eliminados.');
  } catch (error) {
    console.error('Error al eliminar los posts:', error);
  }
}; */

// Función para la creación de posts
export const createPost = async (text) => {
  try {
    const docRef = await addDoc(collection(db, 'posts'), {
      content: text,
      postDate: new Date(),
      likes: 0, // contador en 0
      userWhoPosted: auth.currentUser.displayName,
      emailOfUser: auth.currentUser.email,
    });
    console.log(docRef);
    const docSnapshot = await getDoc(docRef);
    const post = docSnapshot.data();
    const userWhoPosted = auth.currentUser;
    console.log(userWhoPosted);
    const whenItWasPosted = post.postDate;
    const docId = docRef.id;

    return {
      id: docId,
      user: userWhoPosted,
      content: text,
      when: whenItWasPosted,
      likes: post.likes || 0, // Incluir el contador de likes en la respuesta
      incrementLikes: () => incrementLikes(docId), // Agrega esta línea para el botón de "like"
      revertLike: () => revertLike(docId), // Agrega esta línea para el botón de "dislike"
    };
  } catch (error) {
    throw new Error(`Error al crear el post: ${error.message}`);
  }
};

// Obtiene todos los posts de la base de datos en orden descendente por fecha.
/* export const getPosts = async () => {
  const querySnapshot = await getDocs(query(collection(db, 'posts'), orderBy('postDate', 'desc')));
  return querySnapshot;
}; */

/* Suscribe los cambios en la colección de posts y ejecuta la función de devolución de llamada */
export const onGetPosts = (callback) => onSnapshot(query(collection(db, 'posts'), orderBy('postDate', 'asc')), callback);

// Remueve los likes de un post especificado por su ID.
export const removeLikesFromPost = async (postId) => {
  const postRef = firestoreDoc(db, 'posts', postId);
  const postDoc = await getDoc(postRef);
  if (postDoc.exists()) {
    const currentLikes = postDoc.data().likes || 0;
    const newLikes = Math.max(currentLikes - 1, 0);
    await updateDoc(postRef, {
      likes: newLikes,
    });

    const user = getCurrentUser();
    if (user) {
      const userId = user.uid;
      const likesRef = collection(postRef, 'likes');
      const querySnapshot = await getDocs(likesRef);
      const likeDocs = querySnapshot.docs.filter((doc) => doc.data().userId === userId);

      if (likeDocs.length > 0) {
        const likeDocRef = firestoreDoc(db, 'posts', postId, 'likes', likeDocs[0].id);
        await deleteDoc(likeDocRef);
      }
    }
  } else {
    throw new Error('La publicación no existe.');
  }
};

export const deletePost = async (id) => deleteDoc(firestoreDoc(db, 'posts', id));

/* export const deletePost = async (id) => {
  const postCollection = collection(db, 'posts');
  const querySnapshot = await getDocs(query(postCollection));
  console.log(querySnapshot);
  const postRef = firestoreDoc(db, 'posts', id);
  const user = getCurrentUser();
  const userId = user.uid;
  console.log(user.uid);
  const findPostUserId = querySnapshot.docs.filter((doc) => doc.data().userId === userId);
  console.log(findPostUserId);
  if (findPostUserId === userId) {
    await deleteDoc(postRef);
  }
}; */
/*
export const handleLogin = (user, onNavigate) => {
  if (user) {
    onNavigate('/wall');
  }
}; */

/* Escucha los cambios en el estado de autenticación
onAuthStateChanged(auth, async (user) => {
  if (user) {
    await addDoc(collection(db, 'posts'));
  }
}); */
