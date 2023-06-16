import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

import {
  Timestamp,
  addDoc,
  collection,
  getDocs,
  orderBy,
  getDoc,
  onSnapshot,
  query,
} from 'firebase/firestore';

import { auth, db } from '../app/firebase';

export const ourCreateUserWithEmailAndPassword = async (email, password) => {
  await createUserWithEmailAndPassword(auth, email, password);
};

export const ourSignInWithEmailAndPassword = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};

export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

// Función para la creación de posts
export const createPost = async (text) => {
  try {
    const docRef = await addDoc(collection(db, 'posts'), { // Se crea la constante que crea la colección pidiendo la info de usuario, texto y fecha de publicación
      // user: firebase.auth().currentUser,
      content: text,
      postDate: Timestamp.now(),
    });
    // Se pide una instantánea del post para poder acceder a sus datos
    const docSnapshot = await getDoc(docRef);
    const post = docSnapshot.data();
    console.log(post);
    const nowUser = auth.currentUser;
    console.log(nowUser);
    const whenItWasPosted = post.postDate;
    console.log(whenItWasPosted);
    /* const docId = docRef.id;
    return {
      id: docId,
      user: nowUser,
      content: text,
      postDate: whenItWasPosted,
    }; */
  } catch (error) {
    throw new Error(`Error al crear el post: ${error.message}`);
  }
};

// función para obtener los posts y así mostrarlos luego en pantalla
export const getPosts = async () => {
  const querySnapshot = await getDocs(collection(db, 'posts'));
  return querySnapshot;
};

export const onGetPosts = (callback) => onSnapshot(query(collection(db, 'posts'), orderBy('postDate', 'desc')), callback);

onAuthStateChanged(auth, async (user) => {
  if (user) {
    await addDoc(collection(db, 'posts'));
  }
});
/*
export const handleLogin = (user, onNavigate) => {
  if (user) {
    onNavigate('/wall');
  }
}; */
