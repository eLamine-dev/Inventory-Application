// Select an item in the table and update the right sidebar
function selectItem(itemId) {
   console.log(itemId);

   const rows = document.querySelectorAll('tbody tr');
   rows.forEach((row) => row.classList.remove('selected'));

   const selectedRow = document.querySelector(`tr[data-id='${itemId}']`);
   selectedRow.classList.add('selected');
}
