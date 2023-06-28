// importamos la funcion que vamos a testear
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ourSignInWithEmailAndPassword } from '../src/lib/index';

jest.mock('firebase/auth');

describe('ourSignInWithEmailAndPassword', () => {
  it('debería ser una función', () => {
    expect(typeof ourSignInWithEmailAndPassword).toBe('function');
  });

  it('Debe devolver un objeto', async () => {
    signInWithEmailAndPassword.mockReturnValueOnce({});
    const response = await ourSignInWithEmailAndPassword('harry@potter.com', 'harrypotter');
    expect(typeof response).toBe('object');
  });

  it('debe llamar a la función de firebase', async () => {
    signInWithEmailAndPassword.mockReturnValueOnce('hola');
    expect(signInWithEmailAndPassword()).toBe('hola');
  });
});
