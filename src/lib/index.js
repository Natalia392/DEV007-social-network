import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signOut,
  // onAuthStateChanged,
} from 'firebase/auth';

import {
  addDoc,
  collection,
  orderBy,
  onSnapshot,
  query,
  getDoc,
  doc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';

import { auth, db } from '../app/firebase';

// Crea un nuevo usuario con el método de autenticación de correo y contraseña de Firebase.
export const ourCreateUserWithEmailAndPassword = (email, password) => {
  const result = createUserWithEmailAndPassword(auth, email, password);
  return result;
};

// Inicia sesión el método de autenticación anterior
export const ourSignInWithEmailAndPassword = (email, password) => (
  signInWithEmailAndPassword(auth, email, password));

// Inicia sesión en la aplicación utilizando la autenticación de Google.
export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

// Exporta el usuario actual
export const getCurrentUser = () => auth.currentUser;

// Función para la creación de posts
export const createPost = async (text, callback) => {
  try {
    const docRef = await addDoc(collection(db, 'posts'), {
      content: text,
      postDate: new Date(),
      userWhoPosted: auth.currentUser.displayName,
      emailOfUser: auth.currentUser.email,
      likes: [],
    });
    const docSnapshot = await getDoc(docRef);
    const postData = docSnapshot.data();

    callback(postData);
  } catch (error) {
    throw new Error(`Error al crear el post: ${error.message}`);
  }
};

/* Suscribe los cambios en la colección de posts y ejecuta la función de devolución de llamada */
export const onGetPosts = (callback) => onSnapshot(query(collection(db, 'posts'), orderBy('postDate', 'asc')), callback);

export const deletePost = async (id) => deleteDoc(doc(db, 'posts', id));

export const editPost = async (id, newText) => {
  updateDoc(doc(db, 'posts', id), {
    content: newText,
  });
};
export const likePost = async (docId, uidUser) => {
  // pasamos por parámetro que post debe agregar un like, y dentro del like
  // se almacenará el uid del usuario
  updateDoc(doc(db, 'posts', docId), {
    likes: arrayUnion(uidUser), // se une el uid para evitar errores con el mail.
  });
};

export const removeLike = async (docId, uidUser) => {
  // pasamos por parámetro que post debe remover el like y el uid que debe remover.
  updateDoc(doc(db, 'posts', docId), {
    likes: arrayRemove(uidUser), // se remueve buscando el uid para evitar errores con el mail.
  });
};

export const userLogOut = () => (signOut(auth));
