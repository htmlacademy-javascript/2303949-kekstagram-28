import { isEscapeKey } from './util.js';
import { onDocumentKeydown } from './form.js';


const body = document.querySelector('body');
const errorTemplateFragment = document.querySelector('#error').content.querySelector('.error');

function showErrorMessage() {
  const errorMessage = errorTemplateFragment.cloneNode(true);
  body.appendChild(errorMessage);
  const errorButton = document.querySelector('.error__button');

  function closeErrorMessage() {
    const onErrorMessageClose = document.querySelector('.error');
    onErrorMessageClose.remove();
  }

  errorButton.addEventListener('click', closeErrorMessage);

  document.removeEventListener('keydown', onDocumentKeydown);

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeErrorMessage();
    }
  });

  document.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('error')) {
      closeErrorMessage();
    }
  });
}


export { showErrorMessage };
