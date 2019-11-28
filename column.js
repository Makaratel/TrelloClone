class Column {
	constructor (id = null, header = 'Заголовок') {
		let instance = this
		let element = this.element = document.createElement('div')
		this.notes = []
		element.classList.add('column')
		element.setAttribute('draggable', 'true')
		element.innerHTML = '<p class="column-header">Заголовок</p><div data-notes></div><p class="column-footer"><span data-action-addNote class="action">+ Добавить карточку</span></p>'

		if (id) {
			element.setAttribute('data-column-id', id)
		} else {
			element.setAttribute('data-column-id', Column.idCounter)
			Column.idCounter++
		}

		let title = element.querySelector('.column-header')
		title.textContent = header
		document.querySelector('.columns').appendChild(element)
		
		
		element.addEventListener('dragstart', dragstart.bind(this))
		element.addEventListener('dragend', dragend.bind(this))
		element.addEventListener('dragover', dragover.bind(this))
		element.addEventListener('drop', drop.bind(this))

		title.addEventListener('dblclick', function () {
			title.setAttribute('contenteditable', 'true')
			title.focus()
		})

		title.addEventListener('blur', function () {
			title.removeAttribute('contenteditable')
		})

		function dragstart (evt) {
			evt.stopPropagation()
			Column.dragged = this.element
			this.element.classList.add('dragged')
		}

		function dragend () {
			Column.dragged = null
			this.element.classList.remove('dragged')
			document.querySelectorAll('.column').forEach(column => {
				column.classList.remove('under')
			});
			Application.save()
		}

		function dragover (evt) {
			evt.preventDefault()
			if (Column.overed) {
				Column.overed.classList.remove('under')
				Column.overed = null
			}

			Column.overed = this.element

			if (Column.dragged && this.element !== Column.dragged) {		
				this.element.classList.add('under')
			}
		}

		function drop () {
			if (Column.dragged) {
				let arrayColumns = Array.from(document.querySelectorAll('.column'))
				let indexThis = arrayColumns.indexOf(this.element)
				let indexDraggedElement = arrayColumns.indexOf(Column.dragged)

				if (indexThis < indexDraggedElement) {
					this.element.closest('.columns').insertBefore(Column.dragged, this.element)
				} else {
					this.element.closest('.columns').insertBefore(Column.dragged, this.element.nextElementSibling)
				}
			}

			if (Note.dragged) {
				this.element.querySelector('[data-notes]').append(Note.dragged)
			}
		}

		processNote(element)
	}
}

Column.idCounter = 4
Column.dragged = null
Column.overed = null

let processNote = function (column) {
	let addNoteButton = column.querySelector('[data-action-addNote]')
	addNoteButton.addEventListener('click', function () {
		let createdNote = new Note
		column.querySelector('[data-notes]').appendChild(createdNote.element)
		createdNote.element.setAttribute('contenteditable', 'true')
		createdNote.element.focus()
	})
}