function selectItem(itemId) {
   const rows = document.querySelectorAll('tbody tr');
   rows.forEach((row) => row.classList.remove('selected'));

   const selectedRow = document.querySelector(`tr[data-id='${itemId}']`);
   selectedRow.classList.add('selected');
}

function openModal(modalId) {
   const modal = document.getElementById(modalId);
   modal.showModal();
}

function closeModal(modalId) {
   const modal = document.getElementById(modalId);
   modal.close();
}

function openCategoryModal(action, categoryData = null) {
   const modal = document.getElementById('categoryModal');
   const form = modal.querySelector('form');
   const title = modal.querySelector('#categoryModalTitle');
   const nameInput = modal.querySelector('#categoryName');

   form.reset();

   if (action === 'add') {
      title.textContent = 'Add Category';
      form.setAttribute('method', 'POST');
      form.setAttribute('action', '/categories');
   } else if (action === 'edit') {
      const category = categoryData ? JSON.parse(categoryData) : {};
      title.textContent = 'Edit Category';
      nameInput.value = category.name || '';

      form.setAttribute('method', 'POST');
      form.setAttribute('action', `/categories/${category.id}`);

      const methodInput = document.createElement('input');
      methodInput.type = 'hidden';
      methodInput.name = '_method';
      methodInput.value = 'PUT';
      form.appendChild(methodInput);
   }

   modal.showModal();
}

function openItemModal(action, itemId = null) {
   const modal = document.getElementById('itemModal');
   const form = modal.querySelector('form');
   const title = modal.querySelector('#itemModalTitle');

   form.reset();

   if (action === 'add') {
      title.textContent = 'Add Item';
      form.setAttribute('method', 'POST');
      form.setAttribute('action', '/items');
   } else if (action === 'edit') {
      title.textContent = 'Edit Item';

      const selectedItem = document.querySelector(`tr[data-id="${itemId}"]`);
      if (selectedItem) {
         const itemData = {
            name: selectedItem.cells[0].textContent,
            category_name: selectedItem.cells[1].textContent,
            manufacturer_name: selectedItem.cells[2].textContent,
            stock: selectedItem.cells[3].textContent,
            price: selectedItem.cells[4].textContent.replace('$', ''),
         };

         document.querySelector('#itemName').value = itemData.name;
         document.querySelector('#itemStock').value = itemData.stock;
         document.querySelector('#itemPrice').value = itemData.price;

         const categorySelect = document.querySelector('#itemCategory');
         const manufacturerSelect = document.querySelector('#itemManufacturer');

         Array.from(categorySelect.options).forEach((option) => {
            if (option.textContent === itemData.category_name) {
               option.selected = true;
            }
         });

         Array.from(manufacturerSelect.options).forEach((option) => {
            if (option.textContent === itemData.manufacturer_name) {
               option.selected = true;
            }
         });
      }

      form.setAttribute('method', 'POST');
      form.setAttribute('action', `/items/${itemId}`);

      const methodInput = document.createElement('input');
      methodInput.type = 'hidden';
      methodInput.name = '_method';
      methodInput.value = 'PUT';
      form.appendChild(methodInput);
   }

   modal.showModal();
}

function openDeleteItemModal(itemId, itemName) {
   const modal = document.getElementById('deleteItemModal');
   const form = modal.querySelector('form');
   const title = modal.querySelector('#deleteItemModalTitle');

   title.textContent = `Delete Item: ${itemName}`;
   form.setAttribute('method', 'POST');
   form.setAttribute('action', `/items/${itemId}`);

   const methodInput = document.createElement('input');
   methodInput.type = 'hidden';
   methodInput.name = '_method';
   methodInput.value = 'DELETE';
   form.appendChild(methodInput);

   modal.showModal();
}

function openStockModal(action, itemId) {
   const modal = document.getElementById('stockModal');
   const form = modal.querySelector('#stockForm');
   const title = modal.querySelector('#stockModalTitle');
   const quantityInput = modal.querySelector('#stockChange');
   const currentStockSpan = modal.querySelector('#currentStock');

   const itemRow = document.querySelector(`tr[data-id="${itemId}"]`);
   const currentStock = itemRow ? itemRow.cells[3].textContent : '0';

   title.textContent = action === 'add' ? 'Add Stock' : 'Remove Stock';
   currentStockSpan.textContent = currentStock;

   form.reset();
   document.querySelector('#stockAction').value = action;
   document.querySelector('#stockItemId').value = itemId;

   quantityInput.min = 1;
   if (action === 'remove') {
      quantityInput.max = currentStock;
   } else {
      quantityInput.removeAttribute('max');
   }

   modal.showModal();
}

function validateForm(form) {
   const requiredFields = form.querySelectorAll('[required]');
   let isValid = true;

   requiredFields.forEach((field) => {
      if (!field.value.trim()) {
         field.classList.add('error');
         isValid = false;
      } else {
         field.classList.remove('error');
      }
   });

   if (
      form.id === 'stockForm' &&
      document.querySelector('#stockAction').value === 'remove'
   ) {
      const quantity = parseInt(document.querySelector('#stockChange').value);
      const currentStock = parseInt(
         document.querySelector('#currentStock').textContent
      );
      if (quantity > currentStock) {
         document.querySelector('#stockChange').classList.add('error');
         isValid = false;
      }
   }

   return isValid;
}

document.addEventListener('DOMContentLoaded', function () {
   document.querySelectorAll('form').forEach((form) => {
      form.addEventListener('submit', function (e) {
         if (!validateForm(this)) {
            e.preventDefault();
         }
      });
   });

   document.querySelectorAll('input, select, textarea').forEach((input) => {
      input.addEventListener('input', function () {
         if (this.value.trim()) {
            this.classList.remove('error');
         }
      });
   });
});

function sortTable(columnIndex) {
   const table = document.querySelector('table');
   const tbody = table.querySelector('tbody');
   const rows = Array.from(tbody.querySelectorAll('tr'));

   rows.sort((a, b) => {
      let aValue = a.cells[columnIndex].textContent;
      let bValue = b.cells[columnIndex].textContent;

      if (columnIndex === 4) {
         aValue = parseFloat(aValue.replace('$', ''));
         bValue = parseFloat(bValue.replace('$', ''));
      } else if (columnIndex === 3) {
         aValue = parseInt(aValue);
         bValue = parseInt(bValue);
      }

      if (typeof aValue === 'number') {
         return aValue - bValue;
      }
      return aValue.localeCompare(bValue);
   });

   rows.forEach((row) => tbody.appendChild(row));
}
