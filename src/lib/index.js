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
    const docRef = await addDoc(collection(db, 'posts'), {
      content: text,
      postDate: Timestamp.now(),
    });

    const docSnapshot = await getDoc(docRef);
    const post = docSnapshot.data();
    const createdAt = post?.metadata?.createdAt?.toDate(); // Acceder a la fecha de creación del documento

    console.log(createdAt); // Mostrar la fecha de creación en la consola

    const nowUser = auth.currentUser;
    const whenItWasPosted = post.postDate;
    const docId = docRef.id;

    return {
      id: docId,
      user: nowUser,
      content: text,
      postDate: whenItWasPosted,
      createdAt: createdAt, // Agregar la fecha de creación al objeto retornado
    };
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
