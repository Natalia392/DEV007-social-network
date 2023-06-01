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

  const component = routes[pathname];
  if (component) {
    rootDiv.appendChild(component(onNavigate));
  }
};

const handlePopstate = () => {
  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }

  const component = routes[window.location.pathname];
  if (component) {
    rootDiv.appendChild(component(onNavigate));
  }
};

window.onpopstate = handlePopstate;

const currentPath = window.location.pathname;
const component = routes[currentPath];
if (component) {
  rootDiv.appendChild(component(onNavigate));
}
