import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';

import {
  addDoc,
} from 'firebase/firestore';

import {
  ourSignInWithEmailAndPassword,
  ourCreateUserWithEmailAndPassword,
  signInWithGoogle,
  createPost,
} from '../src/lib/index';

import { auth } from '../src/app/firebase';

jest.mock('firebase/firestore');
jest.mock('firebase/auth');
jest.mock('../src/app/firebase.js', () => ({
  auth: {
    currentUser: {
      email: 'email@example.com',
      password: '123456',
    },
    createUserWithEmailAndPassword: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    signInWithPopup: jest.fn(),
    GoogleAuthProvider: jest.fn(),
  },
  db: {
    collection: jest.fn(),
    addDoc: jest.fn(),
  },
}));

describe('ourCreateUserWithEmailAndPassword', () => {
  it('debería ser una función', () => {
    expect(typeof ourCreateUserWithEmailAndPassword).toBe('function');
  });
  it('debería llamar a la función createUserWithEmailAndPassword', async () => {
    createUserWithEmailAndPassword.mockReturnValueOnce({ user: { email: 'email@example.com' } });
    await ourCreateUserWithEmailAndPassword('email@example.com', '123456');
    expect(createUserWithEmailAndPassword).toHaveBeenCalled();
  });
});

describe('ourSignInWithEmailAndPassword', () => {
  it('debería ser una función', () => {
    expect(typeof ourSignInWithEmailAndPassword).toBe('function');
  });

  it('Debe devolver un objeto', async () => {
    signInWithEmailAndPassword.mockReturnValueOnce({});
    const response = await ourSignInWithEmailAndPassword('email@example.com', '123456');
    expect(typeof response).toBe('object');
  });

  it('Debe llamar a la función signInWithEmailAndPassword', async () => {
    await ourSignInWithEmailAndPassword('email@example.com', '123456');
    expect(signInWithEmailAndPassword).toHaveBeenCalled();
  });

  it('Debe ser un objeto que contiene el email email@example.com', async () => {
    signInWithEmailAndPassword.mockReturnValueOnce({ user: { email: 'email@example.com' } });
    const response = await ourSignInWithEmailAndPassword('email@example.com', '123456');
    expect(response.user.email).toBe('email@example.com');
  });
});

describe('signInWithGoogle', () => {
  it('debería ser una función', () => {
    expect(typeof signInWithGoogle).toBe('function');
  });

  it('debería llamar a la función signInWithPopUp con el provider correcto', async () => {
    await signInWithGoogle();
    expect(signInWithPopup).toHaveBeenCalledWith(auth, expect.any(GoogleAuthProvider));
  });
});

describe('createPost', () => {
  it('debería ser una función', () => {
    expect(typeof createPost).toBe('function');
  });

  it('debería llamar a addDoc', async () => {
    const addDocMock = jest.fn().mockResolvedValue();
    addDoc.mockImplementationOnce(addDocMock);
    await createPost('my post content');
    expect(addDocMock).toHaveBeenCalled();
  });
});
