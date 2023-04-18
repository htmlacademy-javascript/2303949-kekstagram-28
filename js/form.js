import { resetScale } from './scale.js';
import { resetEffects } from './effect.js';

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-za-яё0-9]{1,19}$/i;
const TAG_ERROR_TEXT = 'Неправильно заполнены хэштеги';

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Загружаем...'
};

const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const cancelButton = document.querySelector('#upload-cancel');
const fileField = document.querySelector('#upload-file');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const newLocal = document.querySelector('img-upload__field-wrapper__error');
const submitButton = form.querySelector('.img-upload__submit');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: newLocal,
});
// сама модалка.открытие
const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};
// сама модалка.закрытие
const hideModal = () => {
  form.reset();
  resetScale();
  resetEffects();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.add('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

//отмена обработчика по keydown в случае фокуса на текстовом поле
function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    hideModal();
  }
}

const onCancelButtonClick = () => {
  hideModal();
};
// по событию change - обработчик(показать модалку)
const onFileInputChange = () => {
  showModal();
};

const isValidTag = (tag) => VALID_SYMBOLS.test(tag);

const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value
    .trim ()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

// валидатор пристин
pristine.addValidator(hashtagField, validateTags, TAG_ERROR_TEXT);

const setOnFormSubmit = (cb) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      await cb(new FormData(form));
      unblockSubmitButton();
    }
  });
};

fileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);


export { onDocumentKeydown, hideModal, setOnFormSubmit };
