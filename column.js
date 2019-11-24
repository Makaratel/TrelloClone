let Column = {
	idCounter: 4,
	dragged: null,
	overed: null,

	editColumn (column) {
		let columnTitle = column.querySelector('.column-header');

		columnTitle.addEventListener('dblclick', function () {
			columnTitle.setAttribute('contenteditable', 'true');
			columnTitle.focus();
		});

		columnTitle.addEventListener('blur', function () {
			columnTitle.removeAttribute('contenteditable');
		});

		column.addEventListener('dragstart', function (evt) {
			evt.stopPropagation();
			Column.dragged = this;
			this.classList.add('dragged');
		});

		column.addEventListener('dragend', function () {
			Column.dragged = null;
			this.classList.remove('dragged');
			document.querySelectorAll('.column').forEach(column => {
				column.classList.remove('under');
			});
			Application.load();
		});

		column.addEventListener('dragover', function (evt) {
			evt.preventDefault();
			if (Column.overed) {
				Column.overed.classList.remove('under');
				Column.overed = null;
			}

			Column.overed = this;

			if (Column.dragged && this !== Column.dragged) {		
				this.classList.add('under');
			}
		});

		column.addEventListener('drop', function () {
			if (Column.dragged) {
				let arrayColumns = Array.from(document.querySelectorAll('.column'));
				let indexThis = arrayColumns.indexOf(this);
				let indexDraggedElement = arrayColumns.indexOf(Column.dragged);

				if (indexThis < indexDraggedElement) {
					this.closest('.columns').insertBefore(Column.dragged, this);
				} else {
					this.closest('.columns').insertBefore(Column.dragged, this.nextElementSibling);
				}
			}

			if (Note.dragged) {
				column.querySelector('[data-notes]').append(Note.dragged);
			}
		});
	},

	createColumn (id = null) {
		let newColumn = document.createElement('div');
		newColumn.classList.add('column');
		newColumn.setAttribute('draggable', 'true');

		if (id) {
			newColumn.setAttribute('data-column-id', id);
		} else {
			newColumn.setAttribute('data-column-id', Column.idCounter);
			Column.idCounter++;
		}
		
		newColumn.innerHTML = '<p class="column-header">Заголовок</p><div data-notes></div><p class="column-footer"><span data-action-addNote class="action">+ Добавить карточку</span></p>'
		document.querySelector('.columns').appendChild(newColumn);
		Column.editColumn(newColumn);
		Note.processNote(newColumn);
		return newColumn;
	}
};