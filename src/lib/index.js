import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signOut,
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
  // Declara la constante que usa el autenticador de usuarios de google
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

// Exporta el usuario actual
export const getCurrentUser = () => auth.currentUser;

// Función para la creación de posts
export const createPost = async (text, callback) => {
  try {
    // Aquí se crea la colección de posts y se guarda la información que luego se usará
    const docRef = await addDoc(collection(db, 'posts'), {
      content: text,
      postDate: new Date(),
      userWhoPosted: auth.currentUser.displayName,
      emailOfUser: auth.currentUser.email,
      likes: [],
    });
    // Obtiene la instantánea de la colección de posts
    const docSnapshot = await getDoc(docRef);
    // Accede a los datos de la colección de posts
    const postData = docSnapshot.data();
    // Este callback obtiene el objeto del post para luego poder usarlo del otro lado
    callback(postData);
  } catch (error) {
    throw new Error(`Error al crear el post: ${error.message}`);
  }
};

// Esta función es para cambiar la renderización de los posts a medida que se crean.
// 1. Primero, con query, hace una consulta a la colección posts y los ordena con orderBy
// 2. Después, con onSnapshot escucha los cambios que se produzcan en la colección en tiempo real
// 3. Al escuchar esos cambios, ejecuta el callback que se le pasa a nuestra función como parámetro
// Ese callback, por el lado del muro, es un forEach que se hace al querySnapshot
// para que cada documento de la colección de posts se muestre en pantalla con los datos necesarios
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
  // pasamos por parámetro qué post debe remover el like y el uid que debe remover.
  updateDoc(doc(db, 'posts', docId), {
    likes: arrayRemove(uidUser), // se remueve buscando el uid para evitar errores con el mail.
  });
};

export const userLogOut = () => (signOut(auth));
