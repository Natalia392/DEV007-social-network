// eslint-disable-next-line no-unused-vars
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { Timestamp, addDoc, collection, getDocs } from 'firebase/firestore';
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

// posts
export const createPost = async (text) => {
  try {
    const docRef = await addDoc(collection(db, 'posts'), {
      content: text,
      postDate: firebase.firestore.Timestamp.now(),
    });

    const snapshot = await getDocs(docRef);
    const data = snapshot.data();
    const whenItWasPosted = data.postDate;

    const docId = docRef.id;
    console.log({ id: docId, content: text, postDate: whenItWasPosted });
  } catch (error) {
    throw new Error(`Error al crear el post: ${error.message}`);
  }
};

export const getPosts = async () => {
  const querySnapshot = await getDocs(collection(db, 'posts'));
  return querySnapshot;
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
