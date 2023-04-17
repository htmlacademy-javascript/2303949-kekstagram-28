import { isEscapeKey } from './util.js';

const body = document.querySelector('body');
const successTemplateFragment = document.querySelector('#success').content.querySelector('.success');

function showSuccessMessage() {
  const successMessage = successTemplateFragment.cloneNode(true);
  body.appendChild(successMessage);
  const successButton = document.querySelector('.success__button');

  function closeSuccessMessage() {
    const onSuccessMessageClose = document.querySelector('.success');
    onSuccessMessageClose.remove();
  }

  successButton.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeSuccessMessage();
    }
  });

  document.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('success')) {
      closeSuccessMessage();
    }
  });
}
export { showSuccessMessage };
