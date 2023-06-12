// eslint-disable-next-line no-unused-vars
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../app/firebase';

export const ourCreateUserWithEmailAndPassword = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithGoogle = (provider) => {
  signInWithPopup(auth, provider);
};
