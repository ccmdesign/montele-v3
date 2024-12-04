const selectedItems = new Set();
const multiboxSelect = document.querySelector(".multibox");
const selectBtn = document.querySelector(".form-field__options[popover]");

if (multiboxSelect) {
  multiboxSelect.addEventListener("change", (e) => {
    const selectedValue = e.target.value;

    if (selectedValue && !selectedItems.has(selectedValue)) {
      selectedItems.add(selectedValue);
    } else {
      selectedItems.delete(selectedValue);
    }

    selectBtn.textContent = selectedItems.size ? `${selectedItems.size} Selected` : "Select";
  });
}
