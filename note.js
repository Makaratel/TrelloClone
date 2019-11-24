let Note = {
	idCounter: 8,
	dragged: null,

	editNote (note) {
		note.addEventListener('dblclick', function () {
			note.setAttribute('contenteditable', 'true');
			note.removeAttribute('draggable');
			note.closest('.column').removeAttribute('draggable');
			note.focus();
		});

		note.addEventListener('blur', function () {
			if (!note.textContent.trim().length) {
				note.remove();
			} else {
				note.removeAttribute('contenteditable');
				note.setAttribute('draggable', 'true');
				note.closest('.column').setAttribute('draggable', 'true');
				Application.load();
			}
		});

		note.addEventListener('dragstart', function (evt) {
			evt.stopPropagation();
			Note.dragged = this;
			this.classList.add('dragged');
		});

		note.addEventListener('dragend', function () {
			Note.dragged = null;
			this.classList.remove('dragged');
			Application.load();
		});

		note.addEventListener('dragenter', function (evt) {
			if (Note.dragged && Note.dragged.classList.contains('note')) {
				this.classList.add('under');
			}
		});

		note.addEventListener('dragover', function (evt) {
			evt.preventDefault();
		});

		note.addEventListener('dragleave', function () {
			this.classList.remove('under');
		});

		note.addEventListener('drop', function () {
			this.classList.remove('under');

			if (Note.dragged && this.parentElement == Note.dragged.parentElement) {
				let arrayNotes = Array.from(this.parentElement.querySelectorAll('.note'));
				let indexThis = arrayNotes.indexOf(this);
				let indexDraggedElement = arrayNotes.indexOf(Note.dragged);

				if (indexThis < indexDraggedElement) {
					this.parentElement.insertBefore(Note.dragged, this);
				} else {
					this.parentElement.insertBefore(Note.dragged, this.nextElementSibling);
				}
			} else if (Note.dragged) {
				this.parentElement.insertBefore(Note.dragged, this);
			}
		});
	},

	createNote (id = null, content = '') {
		let newNote = document.createElement('div');
		newNote.classList.add('note');
		newNote.setAttribute('draggable', 'true');
		newNote.textContent = content;
		newNote.setAttribute('contenteditable', 'true');
		newNote.focus();
		Note.editNote(newNote);

		if (id) {
			newNote.setAttribute('data-note-id', id);
		} else {
			newNote.setAttribute('data-note-id', Note.idCounter);
			Note.idCounter++;
		}

		return newNote;
	},

	processNote (column) {
		let addNoteButton = column.querySelector('[data-action-addNote]');
		addNoteButton.addEventListener('click', function () {
			let note = Note.createNote();
			column.querySelector('[data-notes]').appendChild(note);
			note.focus();
			Note.editNote(note);
		});
	}	
};
