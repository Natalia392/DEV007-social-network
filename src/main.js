import { Home } from './components/Home.js';
import { Register } from './components/Register.js';
import { Login } from './components/Login.js';
import { Wall } from './components/Wall.js';

// Se crea la constante del root (raíz) de todo
const rootDiv = document.getElementById('root');

// Objeto que contiene las (routes) rutas de navegación de la página
const routes = {
  '/': Home,
  '/login': Login,
  '/register': Register,
  '/wall': Wall,
};

// Función que nos permite navegar de ruta en ruta entre los componentes
export const onNavigate = (pathname) => {
  // Se usa para modificar la URL del navegador sin recargar la página
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname,
  );
  // Este while hace que se limpie el contenido de rootDiv antes de agregar un nuevo componente
  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }

  const component = routes[pathname];
  rootDiv.appendChild(component(onNavigate)); // Pasa onNavigate al componente
};

// Navegación en la página con popstate (flechas del navegador)
const handlePopstate = () => {
  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }

  const component = routes[window.location.pathname];
  rootDiv.appendChild(component(onNavigate)); // Pasa onNavigate al componente
};
// evento popstate gatilla la función handlePopstate
window.onpopstate = handlePopstate;

// Guarda el path actual
const currentPath = window.location.pathname;

// guarda la ruta para cada componente, según su path actual
const component = routes[currentPath];

// Apenda el componente al root, pasándole la función onNavigate como argumento
rootDiv.appendChild(component(onNavigate)); // Pasa onNavigate al componente
