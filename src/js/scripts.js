    document.addEventListener('DOMContentLoaded', function() {
    // Function to open the dialog
    function openDialog(event) {
      const targetId = event.target.getAttribute('modal-target');
      const dialog = document.getElementById(targetId);
      if (dialog) {
        dialog.setAttribute('open', 'open');
      }
    }

    // Function to close the dialog
    function closeDialog(event) {
      const dialog = event.target.closest('dialog');
      if (dialog) {
        dialog.removeAttribute('open');
      }
    }

    // Add event listeners to buttons with the modal-target attribute
    const modalButtons = document.querySelectorAll('button[modal-target]');
    modalButtons.forEach(button => {
      button.addEventListener('click', openDialog);
    });

    // Add event listeners to close buttons inside dialogs
    const closeButtons = document.querySelectorAll('dialog button[modal-close]');
    closeButtons.forEach(button => {
      button.addEventListener('click', closeDialog);
    });
  });
