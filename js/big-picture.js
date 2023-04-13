import { isEscapeKey } from './util.js';
const AVATAR_HEIGHT = 35;
const AVATAR_WIDTH = 35;

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImageElement = bigPictureElement.querySelector('.big-picture__img');
const likesNumberElement = bigPictureElement.querySelector('.likes-count');
const commentsNumberElement = bigPictureElement.querySelector('.comments-count');
const socialCommentsList = bigPictureElement.querySelector('.social__comments');
const pictureDescriptiionElement = bigPictureElement.querySelector('.social__caption');
const pictureCloseButton = bigPictureElement.querySelector('.big-picture__cancel');
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');

socialCommentsList.innerHTML = '';

const createCommentElements = (commentNumber, socialComments) => {
  for (let i = 0; i < commentNumber; i++) {
    const commentElement = document.createElement('li');
    const avatarElement = document.createElement('img');
    const commentTextElement = document.createElement('p');

    commentElement.classList.add('social__comment');
    avatarElement.classList.add('social__picture');
    commentTextElement.classList.add('social__text');

    avatarElement.src = socialComments[i].avatar;
    avatarElement.alt = socialComments[i].name;
    avatarElement.width = String(AVATAR_WIDTH);
    avatarElement.height = String(AVATAR_HEIGHT);
    commentTextElement.textContent = socialComments[i].message;


    commentElement.append(avatarElement);
    commentElement.append(commentTextElement);

    socialCommentsList.append(commentElement);
  }
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey (evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function closeBigPicture () {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
}

const showBigPicture = ({url, likes, comments, description}) => {
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureImageElement.src = url;
  likesNumberElement.textContent = likes;
  commentsNumberElement.textContent = comments.length;
  createCommentElements(comments.length, comments);
  pictureDescriptiionElement.textContent = description;

  commentCountElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
  pictureCloseButton.addEventListener('click', closeBigPicture);

};
export { showBigPicture };

