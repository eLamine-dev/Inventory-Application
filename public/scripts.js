function selectItem(itemId) {
   const rows = document.querySelectorAll('tbody tr');
   rows.forEach((row) => row.classList.remove('selected'));

   const selectedRow = document.querySelector(`tr[data-id='${itemId}']`);
   selectedRow.classList.add('selected');
}

// Utility to open modals
function openModal(modalId) {
   const modal = document.getElementById(modalId);
   modal.showModal();
}

// Utility to close modals
function closeModal(modalId) {
   const modal = document.getElementById(modalId);
   modal.close();
}

function openCategoryModal(action, selectedCategory) {
   const modal = document.getElementById('categoryModal');
   const title = modal.querySelector('#categoryModalTitle');
   const nameInput = modal.querySelector('#categoryName');
   const category = JSON.parse(selectedCategory);

   const form = modal.querySelector('form');

   if (action === 'add') {
      title.textContent = 'Add Category';
      nameInput.value = '';

      form.action = '/categories/create';
   } else if (action === 'edit') {
      title.textContent = 'Edit Category';
      console.log(category);

      nameInput.value = category.name || 'hello';

      form.action = `/categories/update/${category.id}`;
   }

   openModal('categoryModal');
}

// Open Item Modal (Add or Edit)
function openItemModal(action, item = {}) {
   const modal = document.getElementById('itemModal');
   const title = modal.querySelector('#itemModalTitle');
   const nameInput = modal.querySelector('#itemName');
   const categorySelect = modal.querySelector('#itemCategory');
   const manufacturerSelect = modal.querySelector('#itemManufacturer');
   const priceInput = modal.querySelector('#itemPrice');
   const stockInput = modal.querySelector('#itemStock');
   const specificationsInput = modal.querySelector('#itemSpecifications');
   const form = modal.querySelector('form');

   // Configure modal for Add or Edit
   if (action === 'add') {
      title.textContent = 'Add Item';
      nameInput.value = '';
      categorySelect.value = '';
      manufacturerSelect.value = '';
      priceInput.value = '';
      stockInput.value = '';
      specificationsInput.value = '';
      form.action = '/items/create'; // Update form action for creation
   } else if (action === 'edit') {
      title.textContent = 'Edit Item';
      nameInput.value = item.name || '';
      categorySelect.value = item.category_id || '';
      manufacturerSelect.value = item.manufacturer_id || '';
      priceInput.value = item.price || '';
      stockInput.value = item.stock || '';
      specificationsInput.value = JSON.stringify(
         item.specifications || {},
         null,
         2
      );
      form.action = `/items/${item.id}/update`; // Update form action for editing
   }

   openModal('itemModal');
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

function validateForm(formId) {
   const form = document.getElementById(formId);
   const inputs = form.querySelectorAll('[required]');
   let valid = true;

   inputs.forEach((input) => {
      if (!input.value.trim()) {
         valid = false;
         input.classList.add('error'); // Add a CSS class to highlight the error
      } else {
         input.classList.remove('error');
      }
   });

   if (!valid) {
      const errorElement = document.getElementById('formError');
      if (errorElement) {
         errorElement.textContent = 'Please fill in all required fields.';
         errorElement.style.display = 'block';
      }
   }

   return valid;
}

document.querySelectorAll('form').forEach((form) => {
   form.addEventListener('submit', (e) => {
      const errorElement = document.getElementById('formError');
      if (errorElement) errorElement.style.display = 'none';
      if (!validateForm(form.id)) {
         e.preventDefault();
      }
   });
});
