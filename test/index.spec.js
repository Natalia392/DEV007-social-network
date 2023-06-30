// importamos la funcion que vamos a testear
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { ourSignInWithEmailAndPassword, ourCreateUserWithEmailAndPassword } from '../src/lib/index';

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

  it('debe llamar a la función de firebase', async () => { // <----------OJO borrar
    signInWithEmailAndPassword.mockReturnValueOnce('hola');
    expect(signInWithEmailAndPassword()).toBe('hola');
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

describe('ourCreateUserWithEmailAndPassword', () => {
  it('debería ser una función', () => {
    expect(typeof ourCreateUserWithEmailAndPassword).toBe('function');
  });
  it('debería llamar a la función createUserWithEmailAndPassword', async () => {
    createUserWithEmailAndPassword.mockReturnValueOnce();
    await ourCreateUserWithEmailAndPassword('juan@perez.com', 'contraseña');
    expect(createUserWithEmailAndPassword()).toHaveBeenCalled();
  });
}); // ------------------que paso nos estamos saltando?