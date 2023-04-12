import { renderGallery } from './gallery.js';
import { getData, sendData } from './api.js';
import { showAlert } from './util.js';
import { setOnFormSubmit, hideModal } from './form.js';
import { showErrorMessage } from './messages_error.js';
import { showSucessMessage } from './messages_sucess.js';
setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    hideModal();
    showSucessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  renderGallery(data);
} catch (err) {
  showAlert(err.message);
}
