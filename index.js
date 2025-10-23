let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");
const addButtonElement = document.querySelector('.to-do__submit')

function toggleDisabled(isDisabled) {
	isDisabled
		? addButtonElement.setAttribute('disabled', 'true')
		: addButtonElement.removeAttribute('disabled')
}

function loadTasks() {
	const tasksFromStorage = JSON.parse(localStorage.getItem('tasks'))
	return tasksFromStorage ?? items
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
	const textElement = clone.querySelector(".to-do__item-text");
	const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
	const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
	const editButton = clone.querySelector(".to-do__item-button_type_edit");

	deleteButton.addEventListener('click', () => {
		clone.remove()
		const items = getTasksFromDOM()
		saveTasks(items)
	})

	duplicateButton.addEventListener('click', () => {
		const newItem = createItem(textElement.textContent)
		listElement.prepend(newItem)
		const items = getTasksFromDOM()
		saveTasks(items)
	})

	editButton.addEventListener('click', () => {
		textElement.contentEditable = true
		textElement.focus()
	})

	textElement.addEventListener('blur', (e) => {
		textElement.contentEditable = false
		const items = getTasksFromDOM()
		saveTasks(items)
	})

	textElement.textContent = item;
	return clone
}

function getTasksFromDOM() {
	const itemsNamesElements = Array.from(document.querySelectorAll('.to-do__item-text'))
	return itemsNamesElements.map(item => item.textContent)
}

function saveTasks(tasks) {
	localStorage.setItem('tasks', JSON.stringify(tasks))
}

items = loadTasks()
toggleDisabled(true)

items.forEach((item) => {
	listElement.append(createItem(item))
})

formElement.addEventListener('submit', (event) => {
	event.preventDefault()
	listElement.prepend(createItem(inputElement.value))
	items = getTasksFromDOM()
	saveTasks(items)
	formElement.reset()
	toggleDisabled(true)
})

inputElement.addEventListener('input', (e) => {
	toggleDisabled(!e.target.value.trim())
})