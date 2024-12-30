const pool = require('./pool');

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
   const specificationsContainer = document.querySelector(
      '#specificationsContainer'
   );

   form.reset();
   specificationsContainer.innerHTML = '';

   if (action === 'add') {
      title.textContent = 'Add Item';
      form.setAttribute('method', 'POST');
      form.setAttribute('action', '/items');

      const categorySelect = document.querySelector('#itemCategory');
      categorySelect.addEventListener('change', async () => {
         const categoryId = categorySelect.value;

         specificationsContainer.innerHTML = ''; //

         if (categoryId) {
            const response = await fetch(`items/category-item/${categoryId}`);
            const data = await response.json();
            const specifications = data.specifications || {};

            if (Object.keys(specifications).length > 0) {
               generateSpecificationFields(specifications);
            } else {
               addEmptySpecificationField();
            }
         }
      });

      addSpecificationButton();
   } else if (action === 'edit') {
      title.textContent = 'Edit Item';

      fetch(`/items/specifications/${itemId}`)
         .then((res) => res.json())
         .then((data) => {
            const specifications = data.specifications || {};
            generateSpecificationFields(specifications);
         })
         .catch((err) =>
            console.error('Error fetching item specifications:', err)
         );

      form.setAttribute('method', 'POST');
      form.setAttribute('action', `/items/${itemId}`);

      const methodInput = document.createElement('input');
      methodInput.type = 'hidden';
      methodInput.name = '_method';
      methodInput.value = 'PUT';
      form.appendChild(methodInput);

      addSpecificationButton();
   }

   modal.showModal();
}

function generateSpecificationFields(specifications) {
   const container = document.querySelector('#specificationsContainer');
   container.innerHTML = '';

   Object.keys(specifications).forEach((key) => {
      const div = document.createElement('div');
      div.classList.add('spec-field');

      const label = document.createElement('label');
      label.textContent = key;
      label.setAttribute('for', `spec-${key}`);

      const input = document.createElement('input');
      input.type = 'text';
      input.name = `specifications[${key}]`;
      input.id = `spec-${key}`;
      input.value = specifications[key] || '';

      div.appendChild(label);
      div.appendChild(input);
      container.appendChild(div);
   });
}

function addEmptySpecificationField() {
   const container = document.querySelector('#specificationsContainer');

   const div = document.createElement('div');
   div.classList.add('spec-field');

   const label = document.createElement('label');
   label.textContent = 'New Specification';
   label.setAttribute('for', 'new-spec-key');

   const keyInput = document.createElement('input');
   keyInput.type = 'text';
   keyInput.name = 'new_spec_key';
   keyInput.placeholder = 'Specification Key';

   const valueInput = document.createElement('input');
   valueInput.type = 'text';
   valueInput.name = 'new_spec_value';
   valueInput.placeholder = 'Value';

   div.appendChild(label);
   div.appendChild(keyInput);
   div.appendChild(valueInput);
   container.appendChild(div);
}

function addSpecificationButton() {
   const container = document.querySelector('#specificationsContainer');

   const addButton = document.createElement('button');
   addButton.type = 'button';
   addButton.textContent = 'Add New Specification';
   addButton.onclick = addEmptySpecificationField;

   container.appendChild(addButton);
}

function openDeleteItemModal(itemId, itemName) {
   const modal = document.getElementById('deleteItemModal');
   const title = modal.querySelector('#deleteItemModalTitle');
   const confirmButton = modal.querySelector('#deleteItemConfirm');

   title.textContent = `Delete Item: ${itemName}`;

   const newConfirmButton = confirmButton.cloneNode(true);
   confirmButton.parentNode.replaceChild(newConfirmButton, confirmButton);

   newConfirmButton.addEventListener('click', async () => {
      try {
         const response = await fetch(`/items/${itemId}`, {
            method: 'DELETE',
            headers: {
               'Content-Type': 'application/json',
            },
         });

         modal.close();
         window.location.href = '/';
      } catch (error) {
         console.error('Error:', error);
         alert('Failed to delete item');
      }
   });

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
