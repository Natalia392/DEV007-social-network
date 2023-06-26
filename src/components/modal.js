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

// función para preguntar si se quiere eliminar el post -------
export function showDeleteMessage({ deletePostCallBack }) {
  // Crea el contenedor de la ventana modal
  const modalContainer = document.createElement('div');
  modalContainer.className = ('modal-container');

  // Crea el fondo oscuro
  const overlay = document.createElement('div');
  overlay.className = 'overlay';

  // Crea el contenido de la ventana modal
  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  // Crea el contenido de la ventana modal
  const askIfDelete = document.createElement('p');
  askIfDelete.textContent = '¿Estás segur@ de que quieres eliminar tu post?';
  askIfDelete.className = 'p-modal';

  // Crea el elemento <span> para cerrar
  const closeButton = document.createElement('span');
  closeButton.textContent = 'x';
  closeButton.className = 'close-button';

  // Div para los botones
  const divButtons = document.createElement('div');
  divButtons.className = 'div-buttons-modal-container';

  // Botón para aceptar
  const acceptButton = document.createElement('button');
  acceptButton.textContent = 'Aceptar';
  acceptButton.className = 'accept-button-modal';

  // Botón para cancelar
  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancelar';
  cancelButton.className = 'cancel-button-modal';

  // Agrega el contenido a la ventana modal
  modalContent.appendChild(closeButton);
  modalContent.appendChild(askIfDelete);
  modalContent.appendChild(divButtons);
  modalContainer.appendChild(modalContent);

  // Agrega botones al div de botones
  divButtons.appendChild(acceptButton);
  divButtons.appendChild(cancelButton);

  // Agrega la ventana modal y el fondo oscuro al cuerpo del documento
  document.body.appendChild(overlay);
  document.body.appendChild(modalContainer);

  // Función para mostrar la ventana modal
  function showModal() {
    overlay.style.display = 'flex';
    modalContainer.style.display = 'flex';
  }

  // Función para ocultar la ventana modal
  function hideModal() {
    overlay.style.display = 'none';
    modalContainer.style.display = 'none';
  }

  // Asignar la función hideModal al evento click del botón de cerrar
  closeButton.addEventListener('click', hideModal);

  // Eventlistener para aceptar borrar el post
  acceptButton.addEventListener('click', async () => {
    await deletePostCallBack();
    hideModal();
  });

  // Eventlistener para el botón que cancela
  cancelButton.addEventListener('click', hideModal);

  // Mostrar mensaje en la ventana modal
  showModal();
}
export function showEditModal(originalText, onSave) {
  // Crea el contenedor de la ventana modal
  const modalContainer = document.createElement('div');
  modalContainer.className = 'modal-container';

  // Crea el fondo oscuro
  const overlay = document.createElement('div');
  overlay.className = 'overlay';

  // Crea el contenido de la ventana modal
  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  // Crea el contenido de la ventana modal
  const editPostMessage = document.createElement('p');
  editPostMessage.textContent = 'Edita tu post';
  editPostMessage.className = 'p-modal';

  // Crea el campo de entrada de texto
  const inputText = document.createElement('input');
  inputText.type = 'text';
  inputText.className = 'edit-post-text';

  // Crea el elemento <span> para cerrar
  const closeButton = document.createElement('span');
  closeButton.textContent = 'x';
  closeButton.className = 'close-button';

  // Div para los botones
  const divButtons = document.createElement('div');
  divButtons.className = 'div-buttons-modal-container';

  // Botón para aceptar
  const acceptButton = document.createElement('button');
  acceptButton.textContent = 'Aceptar';
  acceptButton.className = 'accept-button-modal';

  // Botón para cancelar
  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancelar';
  cancelButton.className = 'cancel-button-modal';

  // Agrega el contenido a la ventana modal
  modalContent.appendChild(closeButton);
  modalContent.appendChild(editPostMessage);
  modalContent.appendChild(inputText);
  modalContent.appendChild(divButtons);
  modalContainer.appendChild(modalContent);

  // Agrega botones al div de botones
  divButtons.appendChild(acceptButton);
  divButtons.appendChild(cancelButton);

  // Agrega la ventana modal y el fondo oscuro al cuerpo del documento
  document.body.appendChild(overlay);
  document.body.appendChild(modalContainer);

  // Función para mostrar la ventana modal
  function showModal() {
    overlay.style.display = 'flex';
    modalContainer.style.display = 'flex';
    inputText.value = originalText; // Establecer el valor original en el campo de entrada
  }

  // Función para ocultar la ventana modal
  function hideModal() {
    overlay.style.display = 'none';
    modalContainer.style.display = 'none';
  }

  // Asignar la función hideModal al evento click del botón de cerrar
  closeButton.addEventListener('click', hideModal);

  // Eventlistener para aceptar editar el post
  acceptButton.addEventListener('click', async () => {
    const newText = inputText.value;
    if (newText !== '') {
      await onSave(newText); // Llamada a la función onSave con el nuevo texto
      hideModal();
    }
  });

  // Eventlistener para el botón que cancela
  cancelButton.addEventListener('click', hideModal);

  // Mostrar mensaje en la ventana modal
  showModal();
}
