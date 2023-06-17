import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  getDoc,
  onSnapshot,
  query,
  runTransaction,
  doc,
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
    };
  } catch (error) {
    throw new Error(`Error al crear el post: ${error.message}`);
  }
};

// Función para obtener los posts y así mostrarlos luego en pantalla
export const getPosts = async () => {
  const querySnapshot = await getDocs(query(collection(db, 'posts'), orderBy('postDate', 'desc')));
  return querySnapshot;
};

export const onGetPosts = (callback) => onSnapshot(query(collection(db, 'posts'), orderBy('postDate', 'asc')), callback);

onAuthStateChanged(auth, async (user) => {
  if (user) {
    await addDoc(collection(db, 'posts'));
  }
});

// Exporta el usuario actual
export const getCurrentUser = () => auth.currentUser;

// Función para el contador de likes
export const incrementLikeCount = async (postId) => {
  try {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      throw new Error('No hay un usuario autenticado.');
    }

    const postRef = doc(db, 'posts', postId);
    const postDoc = await getDoc(postRef);

    if (!postDoc.exists()) {
      throw new Error('El post no existe.');
    }

    const currentLikes = postDoc.data().likes || 0;

    await runTransaction(db, async (transaction) => {
      transaction.update(postRef, { likes: currentLikes + 1 });
    });
  } catch (error) {
    throw new Error(`Error al incrementar el contador de likes: ${error.message}`);
  }
};

/*
export const handleLogin = (user, onNavigate) => {
  if (user) {
    onNavigate('/wall');
  }
}; */
