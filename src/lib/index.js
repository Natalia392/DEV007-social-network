// eslint-disable-next-line no-unused-vars
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../app/firebase';

export const ourCreateUserWithEmailAndPassword = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password);
};

export const ourSignInWithEmailAndPassword = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};

export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

// posts
export const createPost = (text) => {
  addDoc(collection(db, 'posts'), {
    content: text,
  });
};

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
