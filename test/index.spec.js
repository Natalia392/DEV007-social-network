import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';

//* import { addDoc } from 'firebase/firestore';

import {
  ourSignInWithEmailAndPassword,
  ourCreateUserWithEmailAndPassword,
  signInWithGoogle,
  createPost,
} from '../src/lib/index';

import { auth } from '../src/app/firebase';

jest.mock('firebase/auth');

jest.mock('firebase/auth');

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  addDoc: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  auth: {
    currentUser: {
      email: 'email@example.com',
    },
  },
}));

describe('ourCreateUserWithEmailAndPassword', () => {
  it('debería ser una función', () => {
    expect(typeof ourCreateUserWithEmailAndPassword).toBe('function');
  });
  it('debería llamar a la función createUserWithEmailAndPassword', async () => {
    createUserWithEmailAndPassword.mockReturnValueOnce();
    await ourCreateUserWithEmailAndPassword('juan@perez.com', 'contraseña');
    expect(createUserWithEmailAndPassword).toHaveBeenCalled();
  });
});

describe('ourSignInWithEmailAndPassword', () => {
  it('debería ser una función', () => {
    expect(typeof ourSignInWithEmailAndPassword).toBe('function');
  });

  it('Debe devolver un objeto', async () => {
    signInWithEmailAndPassword.mockReturnValueOnce({});
    const response = await ourSignInWithEmailAndPassword('harry@potter.com', 'harrypotter');
    expect(typeof response).toBe('object');
  });

  it('Debe llamar a la función signInWithEmailAndPassword', async () => {
    await ourSignInWithEmailAndPassword('harry@potter.com', 'harrypotter');
    expect(signInWithEmailAndPassword).toHaveBeenCalled();
  });

  it('Debe ser un objeto que contiene el email harry@potter.com', async () => {
    signInWithEmailAndPassword.mockReturnValueOnce({ user: { email: 'harry@potter.com' } });
    const response = await ourSignInWithEmailAndPassword('harry@potter.com', 'harrypotter');
    expect(response.user.email).toBe('harry@potter.com');
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

  /* it('debería devolver un objeto', async () => {
    addDoc.mockResolvedValue();
    const response = await createPost('texto del post');
    expect(typeof response).toBe('object');
  }); */
});
