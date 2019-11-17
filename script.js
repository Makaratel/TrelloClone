let noteIdCounter = 8;
let columnIdCounter = 8;
let columns = document.querySelectorAll('.column');
let notes = document.querySelectorAll('.note');
let addColumnButton = document.querySelector('[data-action-addColumn]');
let draggedElement = null;

let editNote = function (note) {
	note.addEventListener('dblclick', function () {
		note.setAttribute('contenteditable', 'true');
		note.removeAttribute('draggable');
		note.closest('.column').removeAttribute('draggable');
		note.focus();
	});

	note.addEventListener('blur', function () {
		note.removeAttribute('contenteditable');
		note.setAttribute('draggable');
		note.closest('.column').setAttribute('draggable');

		if (!note.textContent.trim().length) {
			note.remove();
		}
	});

	note.addEventListener('dragstart', function () {
		draggedElement = this;
		this.classList.add('dragged');
	});

	note.addEventListener('dragend', function () {
		draggedElement = null;
		this.classList.remove('dragged');
	});

	note.addEventListener('dragenter', function () {
		this.classList.add('under');
	});

	note.addEventListener('dragover', function (evt) {
		evt.preventDefault();
	});

	note.addEventListener('dragleave', function () {
		this.classList.remove('under');
	});

	note.addEventListener('drop', function () {
		this.classList.remove('under');

		if (this.parentElement == draggedElement.parentElement) {
			let arrayNotes = Array.from(this.parentElement.querySelectorAll('.note'));
			let indexThis = arrayNotes.indexOf(this);
			let indexDraggedElement = arrayNotes.indexOf(draggedElement);

			if (indexThis < indexDraggedElement) {
				this.parentElement.insertBefore(draggedElement, this);
			} else {
				this.parentElement.insertBefore(draggedElement, this.nextElementSibling);
			}
		} else {
			this.parentElement.insertBefore(draggedElement, this);
		}
	});
};

let createNote = function (column) {
	let addNoteButton = column.querySelector('[data-action-addNote]');
	let columnTitle = column.querySelector('.column-header');

	addNoteButton.addEventListener('click', function () {
		let newNote = document.createElement('div');
		newNote.classList.add('note');
		newNote.setAttribute('draggable', 'true');
		newNote.setAttribute('data-note-id', noteIdCounter);

		noteIdCounter++;
		column.querySelector('[data-notes]').appendChild(newNote);
		editNote(newNote);

		newNote.setAttribute('contenteditable', 'true');
		newNote.focus();
	});

	columnTitle.addEventListener('dblclick', function () {
		columnTitle.setAttribute('contenteditable', 'true');
		columnTitle.focus();
	});

	columnTitle.addEventListener('blur', function () {
		columnTitle.removeAttribute('contenteditable');
	});

	column.addEventListener('dragover', function (evt) {
		evt.preventDefault();
	});

	column.addEventListener('drop', function () {
		column.querySelector('[data-notes]').appendChild(draggedElement);
	});
};



columns.forEach(createNote);
notes.forEach(editNote);

addColumnButton.addEventListener('click', function () {
	let newColumn = document.createElement('div');
	newColumn.classList.add('column');
	newColumn.setAttribute('draggable', 'true');
	newColumn.setAttribute('data-column-id', columnIdCounter);
	newColumn.innerHTML = '<p class="column-header">Заголовок</p><div data-notes></div><p class="column-footer"><span data-action-addNote class="action">+ Добавить карточку</span></p>'

	columnIdCounter++;
	document.querySelector('.columns').appendChild(newColumn);
	createNote(newColumn);
});
