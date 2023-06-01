// Aquí inicia Home

export const Home = (onNavigate) => {
  const HomeDiv = document.createElement("div");
  const buttonLogin = document.createElement("button");
  const buttonRegister = document.createElement("button");

  buttonRegister.textContent = "Regístrate";
  buttonLogin.textContent = "Inicia Sesión";

  buttonRegister.addEventListener("click", () => {
    onNavigate("/login");
  });

  buttonLogin.addEventListener("click", () => {
    onNavigate("/login");
  });

  HomeDiv.appendChild(buttonRegister);
  HomeDiv.appendChild(buttonLogin);

  return HomeDiv;
};
