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
