//Function for toggling notification
export function showNotification(message) {
  const notification = document.getElementById('notification');
  if (notification) {
    notification.innerHTML = message;
    notification.classList.add('visible');
    notification.classList.remove('hidden');
    // Hide the notification after 2 seconds
    setTimeout(() => {
      notification.classList.remove('visible');
      notification.classList.add('hidden');
    }, 2000);
  }
}
//Function for handling dialog box, where confirmation and cancellation functions are passed as parameters
export function showDialogBox(message, onConfirm, onCancel) {
  // Get the dialog and buttons from the DOM
  const dialog = document.getElementById('dialog');
  const yesButton = document.getElementById('dialog-yes');
  const noButton = document.getElementById('dialog-no');
  // Set the dialog message
  const messageElement = document.getElementById('dialog-message');
  if (messageElement) {
    messageElement.innerHTML = message;
  }
  // Show the dialog by removing the 'hidden' class
  dialog === null || dialog === void 0
    ? void 0
    : dialog.classList.remove('hidden');
  // Handle the 'Yes' button click
  yesButton === null || yesButton === void 0
    ? void 0
    : yesButton.addEventListener('click', () => {
        onConfirm(); // Execute the onConfirm function
        dialog === null || dialog === void 0
          ? void 0
          : dialog.classList.add('hidden'); // Hide the dialog after action
      });
  // Handle the 'No' button click
  noButton === null || noButton === void 0
    ? void 0
    : noButton.addEventListener('click', () => {
        onCancel(); // Execute the onCancel function
        dialog === null || dialog === void 0
          ? void 0
          : dialog.classList.add('hidden'); // Hide the dialog after action
      });
}