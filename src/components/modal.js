export function showMessage(message) {
  // Crea el contenedor de la ventana modal
  const modalContainer = document.createElement('div');
  modalContainer.className = ('modal-container');

  // Crea el fondo oscuro
  const overlay = document.createElement('div');
  overlay.className = 'overlay';

  // Crea el contenido de la ventana modal
  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  // Crea el elemento <span> para cerrar
  const closeButton = document.createElement('span');
  closeButton.textContent = 'x';
  closeButton.className = 'close-button';

  // Agrega el contenido a la ventana modal
  modalContainer.appendChild(closeButton);
  modalContainer.appendChild(modalContent);

  // Agrega la ventana modal y el fondo oscuro al cuerpo del documento
  document.body.appendChild(overlay);
  document.body.appendChild(modalContainer);

  // Función para mostrar la ventana modal
  function showModal() {
    overlay.style.display = 'block';
    modalContainer.style.display = 'block';
  }

  // Función para ocultar la ventana modal
  function hideModal() {
    overlay.style.display = 'none';
    modalContainer.style.display = 'none';
  }

  // Asignar la función hideModal al evento click del botón de cerrar
  closeButton.addEventListener('click', hideModal);

  // Mostrar mensaje en la ventana modal
  showModal();
  modalContent.textContent = message;
}
