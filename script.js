Application.load();

let notes = document.querySelectorAll('.note');
let columns = document.querySelectorAll('.column');
let addColumnButton = document.querySelector('[data-action-addColumn]');

notes.forEach(Note.editNote);
columns.forEach(Note.processNote);
columns.forEach(Column.editColumn);
addColumnButton.addEventListener('click', function () {
	Column.createColumn();
	Application.save();
});