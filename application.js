let Application = {
	save () {
		let object = {
			columns: {
				id: Column.idCounter,
				items: []
			},
			notes: {
				id: Note.idCounter,
				items: []
			}
		}

		document.querySelectorAll('.column').forEach(column => {
			let columnElement = {
				id: parseInt(column.getAttribute('data-column-id')),
				title: column.querySelector('.column-header').textContent,
				notesId: []
			};

			column.querySelectorAll('.note').forEach(note => {
				columnElement.notesId.push(parseInt(note.getAttribute('data-note-id')));
			});

			object.columns.items.push(columnElement);
		});

		document.querySelectorAll('.note').forEach(note => {
			let noteElement = {
				id: parseInt(note.getAttribute('data-note-id')),
				content: note.textContent
			}

			object.notes.items.push(noteElement);
		});

		let json = JSON.stringify(object);
		localStorage.setItem('trello', json);
		return object
	},

	load () {
		if (!localStorage.getItem('trello')) {
			Application.save()
		}

		document.querySelector('.columns').innerHTML = '';

		let object = JSON.parse(localStorage.getItem('trello'));
		let getNoteById = id => object.notes.items.find(note => note.id === id);

		object.columns.items.forEach(column => {
			let columnElement =  new Column(column.id, column.title);
			let notes = columnElement.element.querySelector('[data-notes]');
			
			column.notesId.forEach(note => {
				let {id, content} = getNoteById(note);
				let createdNote = new Note(id, content);
				notes.appendChild(createdNote.element);
			})
		})
		
	}
}