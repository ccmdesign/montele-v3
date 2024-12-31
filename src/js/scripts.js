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


// sidebar right button on navbar
const sideBarActionButton = document.getElementById("sidebar-action-button");
if (sideBarActionButton) {
  sideBarActionButton.addEventListener("click", () => {
    const sidebarRight = document.getElementById("sidebar-right");
    const isExpanded = sidebarRight.getAttribute('aria-hidden');
    sidebarRight.setAttribute('aria-hidden', isExpanded === 'true' ? 'false' : 'true');
    
    sideBarActionButton.children[0].textContent = 'chat';

  });
}

// sidebar right row on table
const sideBarActionRow = document.querySelectorAll(".sidebar-action-row");
sideBarActionRow.forEach((row) => {
  row.addEventListener("click", () => {
    const sidebarRight = document.getElementById("sidebar-right");
    const isExpanded = sidebarRight.getAttribute('aria-hidden');
    sidebarRight.setAttribute('aria-hidden', isExpanded === 'true' ? 'false' : 'true');
    
  });
});

// if (sideBarActionRow) {
//   sideBarActionRow.addEventListener("click", () => {
//     const sidebarRight = document.getElementById("sidebar-right");
//     const isExpanded = sidebarRight.getAttribute('aria-hidden');
//     sidebarRight.setAttribute('aria-hidden', isExpanded === 'true' ? 'false' : 'true');
    
//     sideBarActionButton.children[0].textContent = 'chat'

//   });
// }


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





// Tabs
// @ToDo: Por algum motivo esse JS não carrega no live reload
(function() {
  // Get relevant elements and collections
  const tabbed = document.querySelector('.tabbed');
  const tablist = tabbed.querySelector('[role="tablist"]');
  const tabs = tablist.querySelectorAll('a');
  const panels = tabbed.querySelectorAll('[id^="section"]');
  
  // The tab switching function
  const switchTab = (oldTab, newTab) => {
    newTab.focus();
    // Make the active tab focusable by the user (Tab key)
    newTab.removeAttribute('tabindex');
    // Set the selected state
    newTab.setAttribute('aria-selected', 'true');
    oldTab.removeAttribute('aria-selected');
    oldTab.setAttribute('tabindex', '-1');
    // Get the indices of the new and old tabs to find the correct
    // tab panels to show and hide
    let index = Array.prototype.indexOf.call(tabs, newTab);
    let oldIndex = Array.prototype.indexOf.call(tabs, oldTab);
    panels[oldIndex].hidden = true;
    panels[index].hidden = false;
  }
    
  // Add semantics are remove user focusability for each tab
  Array.prototype.forEach.call(tabs, (tab, i) => {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('id', 'tab' + (i + 1));
    tab.setAttribute('tabindex', '-1');
    
    // Handle clicking of tabs for mouse users
    tab.addEventListener('click', e => {
      e.preventDefault();
      let currentTab = tablist.querySelector('[aria-selected]');
      if (e.currentTarget !== currentTab) {
        switchTab(currentTab, e.currentTarget);
      }
    });
    
    // Handle keydown events for keyboard users
    tab.addEventListener('keydown', e => {
      // Get the index of the current tab in the tabs node list
      let index = Array.prototype.indexOf.call(tabs, e.currentTarget);
      // Work out which key the user is pressing and
      // Calculate the new tab's index where appropriate
      let dir = e.which === 37 ? index - 1 : e.which === 39 ? index + 1 : e.which === 40 ? 'down' : null;
      if (dir !== null) {
        e.preventDefault();
        // If the down key is pressed, move focus to the open panel,
        // otherwise switch to the adjacent tab
        dir === 'down' ? panels[i].focus() : tabs[dir] ? switchTab(e.currentTarget, tabs[dir]) : void 0;
      }
    });
  });
  
  // Add tab panel semantics and hide them all
  Array.prototype.forEach.call(panels, (panel, i) => {
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('tabindex', '-1');
    let id = panel.getAttribute('id');
    panel.setAttribute('aria-labelledby', tabs[i].id);
    panel.hidden = true; 
  });
  
  // Initially activate the first tab and reveal the first tab panel
  tabs[0].removeAttribute('tabindex');
  tabs[0].setAttribute('aria-selected', 'true');
  panels[0].hidden = false;
})();



function toggleVisibility(elementName) {
  const targetElements = document.querySelectorAll(`[data-coluna="${elementName}"]`);
  targetElements.forEach(targetElement => {
    const isVisible = targetElement.getAttribute('aria-visible') === 'true';
    targetElement.setAttribute('aria-visible', !isVisible);
  });
}


