import { isEscapeKey } from './util.js';

const COMMENT_COUNTER = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseBtn = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const pictureLikes = bigPicture.querySelector('.likes-count');
const pictureCommentsNumber = bigPicture.querySelector('.comments-count');
const pictureCaption = bigPicture.querySelector('.social__caption');

const socialCommentsList = bigPicture.querySelector('.social__comments');
const socialComment = socialCommentsList.querySelector('.social__comment');

const commentLoaderBtn = bigPicture.querySelector('.social__comments-loader');
const commentCount = bigPicture.querySelector('.social__comment-count');
let shownComments = 0;
let comments = [];

const onBigPictureClick = (event) => {
  event.preventDefault();
  // eslint-disable-next-line no-use-before-define
  closeBigPicture();
};

const onCommentLoaderBtnClick = (event) => {
  event.preventDefault();
  // eslint-disable-next-line no-use-before-define
  fillComments();
};

const onDocumentKeyDown = (event) => {
  if (isEscapeKey(event) && !event.target.closest('.social__footer-text')) {
    event.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closeBigPicture();
  }
};

const createComment = (data) => {
  const comment = socialComment.cloneNode(true);
  const commentAvatar = comment.querySelector('.social__picture');
  const commentMessage = comment.querySelector('.social__text');

  commentAvatar.src = data.avatar;
  commentAvatar.alt = data.name;
  commentMessage.textContent = data.message;

  return comment;
};

const fillBigPicture = (picture) => {
  bigPictureImage.src = picture.url;
  pictureLikes.textContent = picture.likes;
  pictureCommentsNumber.textContent = picture.comments.length;
  pictureCaption.textContent = picture.description;
};

const fillCommentCount = () => {
  commentCount.innerHTML = `${shownComments} из <span class="comments-count">${comments.length}</span> комментариев`;
};

const fillComments = () => {
  const commentArray = comments.slice(shownComments, shownComments + COMMENT_COUNTER);
  shownComments += COMMENT_COUNTER;
  shownComments = Math.min(shownComments, comments.length);
  fillCommentCount();
  commentArray.forEach((item) => socialCommentsList.appendChild(createComment(item)));
  if (shownComments >= comments.length) {
    commentLoaderBtn.classList.add('hidden');
  } else {
    commentLoaderBtn.classList.remove('hidden');
  }
};

const openBigPicture = (data) => {
  comments = data.comments;
  socialCommentsList.innerHTML = '';
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureCloseBtn.addEventListener('click', onBigPictureClick);
  document.addEventListener('keydown', onDocumentKeyDown);
  commentLoaderBtn.addEventListener('click', onCommentLoaderBtnClick);
  fillBigPicture(data);
  fillComments();
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureCloseBtn.removeEventListener('click', onBigPictureClick);
  document.removeEventListener('keydown', onDocumentKeyDown);
  commentLoaderBtn.removeEventListener('click', onCommentLoaderBtnClick);
  comments = [];
  shownComments = 0;
};

export { openBigPicture };
