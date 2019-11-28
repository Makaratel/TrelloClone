Application.load();

let columns = document.querySelectorAll('.column');
let addColumnButton = document.querySelector('[data-action-addColumn]');
let cart = document.querySelector('.cart');

columns.forEach(processNote);
addColumnButton.addEventListener('click', function () {
	new Column();
	Application.save();
});

cart.addEventListener('dragstart', function () {
	cart.style.backgroundColor = 'rgba(180, 180, 180, 0.5)';
})

cart.addEventListener('dragend', function () {
	cart.style.backgroundColor = 'rgba(180, 180, 180, 1)';
})

cart.addEventListener('dragover', function (evt) {
	evt.stopPropagation();
	evt.preventDefault();
	cart.style.backgroundColor = 'rgba(180, 180, 180, 1)';
})

cart.addEventListener('drop', function (evt) {
	evt.stopPropagation();
	evt.preventDefault();
	cart.style.backgroundColor = 'rgba(180, 180, 180, 0.5)';

	if (Note.dragged) {
		Note.dragged.remove()
	} else if (Column.dragged) {
		Column.dragged.remove()
	}
})
