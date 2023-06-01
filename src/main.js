import { Home } from "./components/Home.js";
import { Register } from "./components/Register.js";
import { Login } from "./components/Login.js";

const rootDiv = document.getElementById("root");

const routes = {
  "/": Home,
  "/login": Login,
  "/register": Register,
};

export const onNavigate = (pathname) => {
  window.history.pushState({}, pathname, window.location.origin + pathname);

  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }

  rootDiv.appendChild(routes[pathname](onNavigate)); // Pasa onNavigate al componente
};

const component = routes[window.location.pathname];

rootDiv.appendChild(component(onNavigate)); // Pasa onNavigate al componente

window.onpopstate = () => {
  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }
  rootDiv.appendChild(routes[window.location.pathname]);
};
