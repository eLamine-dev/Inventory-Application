function selectItem(itemId) {
   const rows = document.querySelectorAll('tbody tr');
   rows.forEach((row) => row.classList.remove('selected'));

   const selectedRow = document.querySelector(`tr[data-id='${itemId}']`);
   selectedRow.classList.add('selected');
}

// document.addEventListener('DOMContentLoaded', () => {
//    const selectedRow = document.querySelector(
//       `tr[data-id="${selectedItemId}"]`
//    );
//    if (selectedRow) selectedRow.classList.add('selected');
// });
