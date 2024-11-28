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

function openCategoryModal(mode, category = {}) {
   const modal = document.getElementById('categoryModal');
   const form = document.getElementById('categoryForm');
   const title = document.getElementById('categoryModalTitle');

   form.reset();
   if (mode === 'edit') {
      title.textContent = 'Edit Category';
      form.action = `/categories/${category.id}?_method=PUT`;
      document.getElementById('categoryName').value = category.name;
      document.getElementById('categorySlug').value = category.slug;
   } else {
      title.textContent = 'Add Category';
      form.action = '/categories';
   }
   modal.style.display = 'block';
}

function openItemModal(mode, item = {}) {
   const modal = document.getElementById('itemModal');
   const form = document.getElementById('itemForm');
   const title = document.getElementById('itemModalTitle');

   form.reset();
   if (mode === 'edit') {
      title.textContent = 'Edit Item';
      form.action = `/items/${item.id}?_method=PUT`;
      document.getElementById('itemName').value = item.name;
      document.getElementById('itemPrice').value = item.price;
      document.getElementById('itemStock').value = item.stock;
      document.getElementById('itemCategory').value = item.category_id;
      document.getElementById('itemManufacturer').value = item.manufacturer_id;
      document.getElementById('itemSpecifications').value = JSON.stringify(
         item.specifications
      );
   } else {
      title.textContent = 'Add Item';
      form.action = '/items';
   }
   modal.style.display = 'block';
}

function openDeleteItemModal(itemId, itemName) {
   const modal = document.getElementById('deleteItemModal');
   const form = document.getElementById('deleteItemForm');
   const modalTitle = document.getElementById('deleteItemModalTitle');

   modalTitle.textContent = `Delete Item: ${itemName}`;
   form.action = `/items/${itemId}`;
   modal.style.display = 'block';
}

function closeModal(modalId) {
   document.getElementById(modalId).style.display = 'none';
}
