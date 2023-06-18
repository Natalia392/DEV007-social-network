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

// Exporta el usuario actual
export const getCurrentUser = () => auth.currentUser;

// Función para incrementar los likes
export const incrementLikes = async (postId) => {
  const postRef = firestoreDoc(db, 'posts', postId);
  const postDoc = await getDoc(postRef);
  if (postDoc.exists()) {
    const currentLikes = postDoc.data().likes || 0;
    await updateDoc(postRef, { likes: currentLikes + 1 });

    const user = getCurrentUser();
    if (user) {
      const userId = user.uid;
      const likesRef = collection(postRef, 'likes');
      await addDoc(likesRef, { userId });
    }
  } else {
    throw new Error('La publicación no existe.');
  }
};

// Función para revertir un like
export const revertLike = async (postId) => {
  const postRef = firestoreDoc(db, 'posts', postId);
  const postDoc = await getDoc(postRef);
  if (postDoc.exists()) {
    const currentLikes = postDoc.data().likes || 0;

    if (currentLikes > 0) {
      await updateDoc(postRef, { likes: currentLikes - 1 });

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
    }
  } else {
    throw new Error('La publicación no existe.');
  }
};

// Función para crear una referencia al documento del usuario actual
export const getUserRef = (userId) => firestoreDoc(db, 'users', userId);

// Función para guardar los likes de los usuarios en el documento del post
export const saveLikesToPost = async (postId, userId) => {
  const postRef = firestoreDoc(db, 'posts', postId);
  const userRef = getUserRef(userId);
  await updateDoc(postRef, {
    likes: increment(1),
    likedBy: firestoreDoc.FieldValue.arrayUnion(userRef),
  });
};

// Verifica si un usuario ha dado "me gusta" a un post específico.
export const checkIfUserLikedPost = async (userId, postId) => {
  const likesRef = collection(db, 'posts', postId, 'likes');
  const querySnapshot = await getDocs(likesRef);
  return querySnapshot.docs.some((doc) => doc.data().userId === userId);
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
    });

    const docSnapshot = await getDoc(docRef);
    const post = docSnapshot.data();
    const nowUser = auth.currentUser;
    const whenItWasPosted = post.postDate;
    const docId = docRef.id;

    return {
      id: docId,
      user: nowUser,
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
export const getPosts = async () => {
  const querySnapshot = await getDocs(query(collection(db, 'posts'), orderBy('postDate', 'desc')));
  return querySnapshot;
};

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
