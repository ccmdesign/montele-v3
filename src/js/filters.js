const { format } = require("path");

// Define your custom filters
function cleanId(value) {
  return value.replace(/^0+/, '');
}

function formatDate(dateTime) {
  const date = new Date(dateTime);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
}

// Export the filters
module.exports = {
  cleanId,
  formatDate,
};