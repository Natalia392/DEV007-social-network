import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

import {
  addDoc,
  getDoc,
  collection,
  orderBy,
  query,
  onSnapshot,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';

import {
  ourSignInWithEmailAndPassword,
  ourCreateUserWithEmailAndPassword,
  signInWithGoogle,
  createPost,
  onGetPosts,
  deletePost,
  editPost,
  likePost,
  removeLike,
  userLogOut,
} from '../src/lib/index';

import { auth } from '../src/app/firebase';

jest.mock('firebase/firestore');
jest.mock('firebase/auth');
jest.mock('../src/app/firebase.js', () => ({
  auth: {
    currentUser: {
      // email: 'email@example.com',
      // password: '123456',
    },
    createUserWithEmailAndPassword: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    signInWithPopup: jest.fn(),
    GoogleAuthProvider: jest.fn(),
  },
  db: {
    collection: jest.fn(),
    addDoc: jest.fn(),
    getDoc: jest.fn(),
    query: jest.fn(),
    orderBy: jest.fn(),
    onSnapshot: jest.fn(),
  },
}));

describe('ourCreateUserWithEmailAndPassword', () => {
  it('debería ser una función', () => {
    expect(typeof ourCreateUserWithEmailAndPassword).toBe('function');
  });

  it('debería llamar a la función createUserWithEmailAndPassword', async () => {
    await ourCreateUserWithEmailAndPassword('email@example.com', '123456');
    expect(createUserWithEmailAndPassword).toHaveBeenCalled();
  });
  it('debería retornar un objeto con el email: email@example.com', async () => {
    createUserWithEmailAndPassword.mockReturnValueOnce({ user: { email: 'email@example.com' } });
    const response = await ourCreateUserWithEmailAndPassword('email@example.com', '123456');
    expect(response.user.email).toBe('email@example.com');
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

  it('debería llamar a la función signInWithPopup con el provider correcto', async () => {
    const mockGoogleAuthProvider = new GoogleAuthProvider();
    auth.GoogleAuthProvider.mockReturnValueOnce(mockGoogleAuthProvider);

    await signInWithGoogle();

    expect(signInWithPopup).toHaveBeenCalledWith(auth, mockGoogleAuthProvider);
  });
});

describe('createPost', () => {
  it('debería ser una función', () => {
    expect(typeof createPost).toBe('function');
  });

  it('debería llamar a addDoc', async () => {
    const addDocMock = jest.fn().mockResolvedValue();
    addDoc.mockImplementationOnce(addDocMock);
    const getDocMock = jest.fn(() => Promise.resolve({
      data: () => ({
        content: 'post content',
      }),
    }));
    const callback = jest.fn();
    getDoc.mockImplementationOnce(getDocMock);
    await createPost('post content', callback);
    expect(addDocMock).toHaveBeenCalled();
    expect(getDocMock).toHaveBeenCalled();
  });

  it('Debería arrojar un error', async () => {
    const addDocMock = jest.fn(() => Promise.reject(new Error('Some error')));
    addDoc.mockImplementationOnce(addDocMock);
    const callback = jest.fn();
    await expect(createPost('post content', callback)).rejects.toThrow('Error al crear el post: Some error');
  });
});

describe('onGetPosts', () => {
  it('debería llamar a la función callback con el querySnapshot', () => {
    const collectionMock = jest.fn();
    collection.mockImplementationOnce(collectionMock);

    const orderByMock = jest.fn();
    orderBy.mockImplementationOnce(orderByMock);

    const queryMock = jest.fn();
    query.mockImplementationOnce(queryMock);

    const onSnapshotMock = jest.fn();
    onSnapshot.mockImplementationOnce(onSnapshotMock);

    const callback = jest.fn();
    onGetPosts(callback);
    expect(collectionMock).toHaveBeenCalled();
    expect(orderByMock).toBeCalled();
    expect(queryMock).toHaveBeenCalled();
    expect(onSnapshotMock).toHaveBeenCalled();
  });
});

describe('deletePost', () => {
  it('debería ser una función', () => {
    expect(typeof deletePost).toBe('function');
  });
});

describe('editPost', () => {
  it('debería ser una función', () => {
    expect(typeof editPost).toBe('function');
  });

  it('debería llamar a updateDoc', async () => {
    const updateDocMock = jest.fn();
    updateDoc.mockImplementationOnce(updateDocMock);
    await editPost();
    expect(updateDocMock).toHaveBeenCalled();
  });
});

describe('likePost', () => {
  it('debería ser una función', () => {
    expect(typeof likePost).toBe('function');
  });
  it('debería llamar a updateDoc', async () => {
    const updateDocMock = jest.fn();
    updateDoc.mockImplementationOnce(updateDocMock);
    await likePost();
    expect(updateDocMock).toHaveBeenCalled();
  });
  it('debería llamar a arrayUnion', async () => {
    const arrayUnionMock = jest.fn();
    arrayUnion.mockImplementationOnce(arrayUnionMock);
    await likePost();
    expect(arrayUnionMock).toHaveBeenCalled();
  });
});

describe('removeLike', () => {
  it('debería ser una función', () => {
    expect(typeof removeLike).toBe('function');
  });

  it('debería llamar a updateDoc', async () => {
    const updateDocMock = jest.fn();
    updateDoc.mockImplementationOnce(updateDocMock);
    await likePost();
    expect(updateDocMock).toHaveBeenCalled();
  });

  it('debería llamar a doc', async () => {
    const docMock = jest.fn();
    doc.mockImplementationOnce(docMock);
    await likePost();
    expect(docMock).toHaveBeenCalled();
  });

  it('debería llamar a arrayRemove', async () => {
    const arrayRemoveMock = jest.fn();
    arrayRemove.mockImplementationOnce(arrayRemoveMock);
    await removeLike();
    expect(arrayRemoveMock).toHaveBeenCalled();
  });
});

describe('userLogOut', () => {
  it('debería ser una función', () => {
    expect(typeof userLogOut).toBe('function');
  });

  it('debería llamar a signOut', async () => {
    const signOutMock = jest.fn();
    signOut.mockImplementationOnce(signOutMock);
    await userLogOut();
    expect(signOutMock).toHaveBeenCalled();
  });
});
