const multiboxSelect = document.querySelectorAll(".form-field__options");

multiboxSelect.forEach((select) => {
  const selectedItems = new Set();
  select.addEventListener("change", (e) => {
    const selectBtn = e.target.parentElement.parentElement.parentElement.querySelector(".multiselect__button");
    const selectedValue = e.target.value;

    if (selectedValue && !selectedItems.has(selectedValue)) {
      selectedItems.add(selectedValue);
    } else {
      selectedItems.delete(selectedValue);
    }

    if(selectedItems.size === 1) {
      selectBtn.textContent = selectedItems.values().next().value;
    } else if(selectedItems.size > 1) {
      selectBtn.textContent = `${selectedItems.size} Selecionados`

    } else {
      selectBtn.textContent = "Valor Selecionado"
    }

  });
})


// sidebar right
const sideBarActionButton = document.getElementById("sidebar-action-button");
if (sideBarActionButton) {
  sideBarActionButton.addEventListener("click", () => {
    const sidebarRight = document.getElementById("sidebar-right");
    const isExpanded = sidebarRight.getAttribute('aria-hidden');
    sidebarRight.setAttribute('aria-hidden', isExpanded === 'true' ? 'false' : 'true');
    
    sideBarActionButton.children[0].textContent = 'chat';

  });
}

// sidebar right row
const sideBarActionRow = document.getElementById("sidebar-action-row");
if (sideBarActionRow) {
  sideBarActionRow.addEventListener("click", () => {
    const sidebarRight = document.getElementById("sidebar-right");
    const isExpanded = sidebarRight.getAttribute('aria-hidden');
    sidebarRight.setAttribute('aria-hidden', isExpanded === 'true' ? 'false' : 'true');
    
    sideBarActionButton.children[0].textContent = 'chat'

  });
}


/////////////////////////////////////
// GEMS MENU AND SIDEBAR FUNCTIONS //
/////////////////////////////////////

function handleGemTriggerClick(event) {
  // Set all elements with [gem-trigger-for] to 'aria-active="false"'
  const gemTriggerElements = document.querySelectorAll("[gem-trigger-for]");
  gemTriggerElements.forEach((element) => {
    element.setAttribute("aria-active", "false");
  });

  // Set the clicked button with 'aria-active="true"'
  event.target.setAttribute("aria-active", "true");

  // Set all elements under #gems-sidebar-menu to aria-hidden="true"
  const gemsSidebarMenuElements = document.querySelectorAll(
    "[gems-sidebar-content]"
  );
  gemsSidebarMenuElements.forEach((element) => {
    element.setAttribute("aria-hidden", "true");
  });

  // Find an element with an id equal to the value from the 'gem-trigger-for' value, and set it to 'aria-hidden="false"'
  const targetId = event.target.getAttribute("gem-trigger-for");
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    targetElement.setAttribute("aria-hidden", "false");

    // Check if any of #gems-sidebar-menu children has aria-hidden="false"
    const gemsSidebarMenuElements = document.querySelectorAll(
      "[gems-sidebar-content]"
    );
    const anyVisible = Array.from(gemsSidebarMenuElements).some(
      (element) => element.getAttribute("aria-hidden") === "false"
    );

    // If any child is visible, set #sidebar-left to aria-hidden="false"
    if (anyVisible) {
      const sidebarLeft = document.getElementById("sidebar-left");
      if (sidebarLeft) {
        sidebarLeft.setAttribute("aria-hidden", "false");
      }
    }
  }
}

// Add event listeners to elements with the gem-trigger-for attribute
const gemTriggerElements = document.querySelectorAll("[gem-trigger-for]");
gemTriggerElements.forEach((element) => {
  element.addEventListener("click", handleGemTriggerClick);
});

function handleCloseGemsSidebarClick() {
  // Set all elements under #gems-sidebar-menu to aria-hidden="true"
  const gemsSidebarMenuElements = document.querySelectorAll(
    "[gems-sidebar-content]"
  );

  gemsSidebarMenuElements.forEach((element) => {
    element.setAttribute("aria-hidden", "true");
  });

  // Set #sidebar-left to aria-hidden="true"
  const sidebarLeft = document.getElementById("sidebar-left");
  if (sidebarLeft) {
    sidebarLeft.setAttribute("aria-hidden", "true");
  }
}

// Add event listeners to elements with the close-gems-sidebar attribute
const closeGemsSidebarElements = document.querySelectorAll(
  "[close-gems-sidebar]"
);
closeGemsSidebarElements.forEach((element) => {
  element.addEventListener("click", handleCloseGemsSidebarClick);
});

function activateMicrophone() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (stream) {
        console.log("Microphone activated");
        // You can add additional logic here to handle the audio stream
      })
      .catch(function (err) {
        console.error("Error accessing the microphone: ", err);
      });
  } else {
    console.error("getUserMedia not supported on your browser!");
  }
}

const dockGravarButton = document.getElementById("dock-gravar");
if (dockGravarButton) {
  dockGravarButton.addEventListener("click", activateMicrophone);
}