class Note {
	constructor (id = null, content = '') {
		let element = this.element = document.createElement('div')
		element.classList.add('note')
		element.setAttribute('draggable', 'true')
		element.textContent = content
		element.focus()

		if (id) {
			element.setAttribute('data-note-id', id)
		} else {
			element.setAttribute('data-note-id', Note.idCounter)
			Note.idCounter++
		}

		element.addEventListener('dblclick', function () {
			element.setAttribute('contenteditable', 'true')
			element.removeAttribute('draggable')
			element.closest('.column').removeAttribute('draggable')
			element.focus()
		})

		element.addEventListener('blur', function () {
			if (!element.textContent.trim().length) {
				element.remove()
			} else {
				element.removeAttribute('contenteditable')
				element.setAttribute('draggable', 'true')
				element.closest('.column').setAttribute('draggable', 'true')
			}
			Application.save()
		})
		
		element.addEventListener('dragstart', dragstart.bind(this))
		element.addEventListener('dragend', dragend.bind(this))
		element.addEventListener('dragenter', dragenter.bind(this))
		element.addEventListener('dragover', dragover.bind(this))
		element.addEventListener('dragleave', dragleave.bind(this))
		element.addEventListener('drop', drop.bind(this))

		function dragstart (evt) {
			evt.stopPropagation()
			Note.dragged = this.element
			this.element.classList.add('dragged')
		}

		function dragend () {
			Note.dragged = null
			this.element.classList.remove('dragged')
			Application.save()
		}

		function dragenter (evt) {
			if (Note.dragged && Note.dragged.classList.contains('note')) {
				this.element.classList.add('under')
			}
		}

		function dragover (evt) {
			evt.preventDefault()
		}

		function dragleave () {
			this.element.classList.remove('under')
		}

		function drop (evt) {
			evt.stopPropagation()
			this.element.classList.remove('under')

			if (Note.dragged && this.element.parentElement == Note.dragged.parentElement) {
				
				let arrayNotes = Array.from(this.element.parentElement.querySelectorAll('.note'))
				let indexThis = arrayNotes.indexOf(this.element)
				let indexDraggedElement = arrayNotes.indexOf(Note.dragged)

				if (indexThis < indexDraggedElement) {
					this.element.parentElement.insertBefore(Note.dragged, this.element)
				} else {
					this.element.parentElement.insertBefore(Note.dragged, this.element.nextElementSibling)
				}
			} else if (Note.dragged) {
				this.element.parentElement.insertBefore(Note.dragged, this.element)
			}
		}
	}
}

Note.idCounter = 8
Note.dragged = null
