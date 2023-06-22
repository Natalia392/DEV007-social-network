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
  orderBy,
  getDoc,
  onSnapshot,
  query,
  doc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
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

// Función para la creación de posts
export const createPost = async (text) => {
  try {
    const docRef = await addDoc(collection(db, 'posts'), {
      content: text,
      postDate: new Date(),
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
    };
  } catch (error) {
    throw new Error(`Error al crear el post: ${error.message}`);
  }
};

/* Suscribe los cambios en la colección de posts y ejecuta la función de devolución de llamada */
export const onGetPosts = (callback) => onSnapshot(query(collection(db, 'posts'), orderBy('postDate', 'asc')), callback);

export const deletePost = async (id) => deleteDoc(doc(db, 'posts', id));

export const likePost = (id, likes) => {
  if (likes.length === 0 || !(likes.includes(auth.currentUser.email))) {
    updateDoc(doc(db, 'posts', id), {
      likes: arrayUnion(auth.currentUser.email),
    });
  }
};

export const removeLike = (id, likes) => {
  if (likes.includes(auth.currentUser.email)) {
    updateDoc(doc(db, 'posts', id), {
      likes: arrayRemove(auth.currentUser.email),
    });
  }
};
