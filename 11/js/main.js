
import './big-picture.js';
import './thumbnail.js';
import './form.js';

import { getPictures } from './data.js';
import { renderGallery } from './gallery.js';
renderGallery(getPictures());
