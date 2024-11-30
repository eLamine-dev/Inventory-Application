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
   // const form = modal.getElementById('categoryForm');
   // const title = document.getElementById('categoryModalTitle');

   // form.reset();
   // if (mode === 'edit') {
   //    title.textContent = 'Edit Category';
   //    form.action = `/categories/${category.id}?_method=PUT`;
   //    document.getElementById('categoryName').value = category.name;
   //    document.getElementById('categorySlug').value = category.slug;
   // } else {
   //    title.textContent = 'Add Category';
   //    form.action = '/categories';
   // }
   modal.showModal();
}

function openDeleteCategoryModal(categoryId, categoryName) {
   const modal = document.getElementById('deleteCategoryModal');
   // const form = document.getElementById('deleteCategoryForm');
   // const modalTitle = document.getElementById('deleteCategoryModalTitle');

   // modalTitle.textContent = `Delete Category: ${categoryName}`;
   // form.action = `/categories/${categoryId}`;
   // modal.style.display = 'block';
   modal.showModal();
}

function openItemModal(mode, item = {}) {
   const modal = document.getElementById('itemModal');
   // const form = document.getElementById('itemForm');
   // const title = document.getElementById('itemModalTitle');

   // form.reset();
   // if (mode === 'edit') {
   //    title.textContent = 'Edit Item';
   //    form.action = `/items/${item.id}?_method=PUT`;
   //    document.getElementById('itemName').value = item.name;
   //    document.getElementById('itemPrice').value = item.price;
   //    document.getElementById('itemStock').value = item.stock;
   //    document.getElementById('itemCategory').value = item.category_id;
   //    document.getElementById('itemManufacturer').value = item.manufacturer_id;
   //    document.getElementById('itemSpecifications').value = JSON.stringify(
   //       item.specifications
   //    );
   // } else {
   //    title.textContent = 'Add Item';
   //    form.action = '/items';
   // }
   modal.showModal();
}

function openDeleteItemModal(itemId, itemName) {
   const modal = document.getElementById('deleteItemModal');
   // const form = document.getElementById('deleteItemForm');
   // const modalTitle = document.getElementById('deleteItemModalTitle');

   // modalTitle.textContent = `Delete Item: ${itemName}`;
   // form.action = `/items/${itemId}`;
   // modal.style.display = 'block';
   modal.showModal();
}

function openStockModal(action, itemId) {
   const modal = document.getElementById('stockModal');
   // const form = document.getElementById('stockForm');
   // const title = document.getElementById('stockModalTitle');
   // const actionField = document.getElementById('stockAction');
   // const itemIdField = document.getElementById('stockItemId');
   // const currentStock = document.getElementById('currentStock');

   // // Set the modal title and action
   // title.textContent = action === 'add' ? 'Add Stock' : 'Remove Stock';
   // actionField.value = action;
   // itemIdField.value = itemId;

   // // Get the current stock dynamically
   // const selectedItem = document.querySelector(`[data-id="${itemId}"]`);
   // if (selectedItem) {
   //    currentStock.textContent = selectedItem
   //       .querySelector('td:nth-child(4)')
   //       .textContent.trim();
   // }

   // // Open the modal
   modal.showModal();
}

// Close the stock modal
function closeModal(modalId) {
   const modal = document.getElementById(modalId);
   modal.close();
}
