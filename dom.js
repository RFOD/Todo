
import { Project, Task, projects } from "./app.js";
const section = document.querySelector("[data-main-section]");

// Tab Logic
let currTab = 1;
changeTab(currTab);
function changeTab(tab) {
	clearTab(tab);
	switch (tab) {
		case 1:
			starTab();
			break;
		case 2:
			let addbtn;
			const project = document.querySelector(".selected");
			const domIndex = project.dataset.index;
			projects.find((project) => {
				if (project.index === domIndex) {
					project.tasks.map((task) => {
						console.log(task);
					});
				}
			});
			addbtn = createTaskTab();
			const formTaskContainer = document.querySelector("[data-task-form-section]");
			taskSection = document.querySelector('[data-task-section]')
			taskFunctionality(addbtn, formTaskContainer);
			break;
		default:
			console.log("The tab is not right for the task, this is the tab: " + tab);
			break;
	}
}
let taskSection
function starTab() {
	const containerClasses = [
		"font-semibold",
		"text-[2.5rem]",
		"p-5",
		"px-10",
		"text-white",
		"flex",
		"flex-col",
		"justify-center",
		"items-center",
	];
	const container = document.createElement("div");
	container.setAttribute("data-container-box", "");
	containerClasses.forEach((clasa) => container.classList.add(clasa)); 
	container.innerText = "Select a Project to Start!";
	section.appendChild(container);
}
function createTaskTab() {
	const mainContainer = document.createElement("div");
	const buttonContainer = document.createElement("div");
	const formContainer = document.createElement("div");
	const taskContainer = document.createElement("div");
	const hr = document.createElement("hr");
	const taskAddBtn = document.createElement("div");
	const h1 = document.createElement("h1");

	taskAddBtn.setAttribute("data-task-add", "");
	const mainContainerClasses = [
		"font-bold",
		"text-[2rem]",
		"text-white",
		"p-5",
		"px-10",
		"flex",
		"flex-col",
	];
	mainContainerClasses.forEach((clasa) => mainContainer.classList.add(clasa));
	const buttonContainerClasses = ["flex", "gap-2", "items-center", "mb-2"];
	const buttonClasses = [
		"duration-100",
		"w-32",
		"h-10",
		"bg-green-600",
		"rounded-md",
		"text-xl",
		"flex",
		"justify-center",
		"items-center",
		"hover:opacity-80",
	];
	buttonContainerClasses.forEach((clasa) =>
		buttonContainer.classList.add(clasa)
	);
	buttonClasses.forEach((clasa) => taskAddBtn.classList.add(clasa));
	h1.classList.add("mr-6");
	h1.innerText = "Task";
	hr.classList.add("mb-6");
	taskAddBtn.innerText = "Add Task";
	mainContainer.setAttribute("data-container-box", "");

	formContainer.setAttribute("data-task-form-section", "");
	taskContainer.setAttribute("data-task-section", "");

	section.appendChild(mainContainer);
	mainContainer.appendChild(buttonContainer);
	mainContainer.appendChild(hr);
	mainContainer.appendChild(formContainer);
	mainContainer.appendChild(taskContainer);
	buttonContainer.appendChild(h1);
	buttonContainer.appendChild(taskAddBtn);
	return taskAddBtn;
}
function clearTab() {
	const containerBox = section.querySelector("[data-container-box]");
	if (containerBox) {
		section.removeChild(containerBox);
	}
}
// Project functionality
const addBtn = document.querySelector("[data-add-project]");
const projectFormSection = document.querySelector(
	"[data-form-project-section]"
);
const projectSection = document.querySelector("[data-project-section]");
let projectIndex = 0;
addBtn.addEventListener("click", () => addProject());

function addProject() {
	let title = "";
	createProjectForm(projectIndex, title);
	projectIndex++;
}
function createProject(projectIndex, title) {
	const containerClasses = [
		"duration-100",
		"grid",
		"grid-cols-[70%_30%]",
		"grid-rows-1",
		"bg-[#00000020]",
		"shadow-md",
		"p-4",
		"rounded-lg",
		"mb-2",
		"hover:bg-[#00000030]",
	];
	const titleClasses = ["font-semibold", "text-white", "text-xl", "ml-2"];
	const buttonClasses = ["flex", "justify-center", "items-center"];
	const delBtnClasses = [
		"duration-100",
		"w-36",
		"h-8",
		"bg-red-700",
		"rounded-md",
		"text-md",
		"text-white",
		"flex",
		"justify-center",
		"items-center",
		"hover:opacity-80",
	];

	const buttonContainer = document.createElement("div");
	const container = document.createElement("div");
	const projectTitle = document.createElement("h2");
	const deleteBtn = document.createElement("div");

	container.setAttribute("data-index", `${projectIndex}`);
	containerClasses.forEach((clasa) => container.classList.add(clasa));
	titleClasses.forEach((clasa) => projectTitle.classList.add(clasa));
	buttonClasses.forEach((clasa) => {
		buttonContainer.classList.add(clasa);
	});
	deleteBtn.setAttribute("data-rem-project", "");
	delBtnClasses.forEach((clasa) => deleteBtn.classList.add(clasa));
	projectTitle.innerText = `${title}`;
	deleteBtn.innerText = `Delete`;

	projectSection.appendChild(container);
	container.appendChild(projectTitle);
	container.appendChild(buttonContainer);
	buttonContainer.appendChild(deleteBtn);
	const removeBtns = document.querySelectorAll("[data-rem-project]");
	removeBtns.forEach((button) => {
		button.addEventListener("click", () => removeProject(event));
	});
	container.addEventListener("click", (event) => selectProject(event));
	currTab = 2;
	const selected = document.querySelector(".selected");
	if (selected) {
		selected.classList.remove("selected");
	}
	container.classList.add("selected");
	changeTab(currTab);
	console.log(projects);
}
function removeProject(event) {
	const project = event.target.closest("[data-index]");
	projectSection.removeChild(project);
	const domIndex = project.dataset.index;
	let arrayIndex;
	projects.find((project) => {
		if (project.index === domIndex) {
			arrayIndex = projects.indexOf(project);
		}
	});
	projects.splice(arrayIndex, 1);
	if (projectIndex !== 0) {
		projectIndex--;
	}
	if (projects.length === 0) {
		currTab = 1;
		changeTab(currTab);
	}
	console.log(projects);
}
function selectProject(event) {
	const selected = document.querySelector(".selected");
	if (selected) {
		selected.classList.remove("selected");
	}
	const project = event.target.closest("[data-index]");
	console.log(project);
	project.classList.add("selected");
}

function createProjectForm(index, title) {
	const containerBox = document.querySelector("[data-container]");
	if (containerBox !== null) {
		projectFormSection.removeChild(containerBox);
		return;
	}
	const containerClasses = [
		"flex",
		"justify-center",
		"bg-[#00000020]",
		"p-2",
		"rounded-lg",
		"mb-2",
	];
	const formClasses = [
		"flex",
		"justify-center",
		"items-center",
		"flex-col",
		"w-[100%]",
	];
	const textClasses = [
		"font-bold",
		"opacity-85",
		"text-white",
		"text-center",
		"text-[125%]",
		"mb-2",
	];
	const inputClasses = [
		"px-2",
		"rounded-md",
		"border-[3px]",
		"border-[#00698998]",
		"shadow-lg",
		"w-[60%]",
		"mb-2",
		"focus:outline-none",
	];
	const submitClasses = [
		"bg-[#00000040]",
		"hover:bg-[#00000070]",
		"duration-200",
		"text-white",
		"font-bold",
		"py-1",
		"px-3",
		"rounded",
		"shadow-lg",
	];

	let container = document.createElement("div");
	let form = document.createElement("form");
	let text = document.createElement("p");
	let input = document.createElement("input");
	let submit = document.createElement("button");

	containerClasses.forEach((clasa) => container.classList.add(clasa));
	container.setAttribute("data-container", ``);
	formClasses.forEach((clasa) => form.classList.add(clasa));
	textClasses.forEach((clasa) => text.classList.add(clasa));
	inputClasses.forEach((clasa) => input.classList.add(clasa));
	submitClasses.forEach((clasa) => submit.classList.add(clasa));

	text.innerText = "Set the Title of The Project!";
	input.placeholder = "Enter Title";
	submit.innerText = "Create";

	projectFormSection.appendChild(container);
	container.appendChild(form);
	form.appendChild(text);
	form.appendChild(input);
	form.appendChild(submit);

	submit.addEventListener("click", (event) => {
		event.preventDefault();
		title = input.value;
		if (title) {
			let project = new Project(title, index);
			projects.push(project);
			console.log(project);
			input.value = "";
			projectFormSection.removeChild(container);
			createProject(index, title);
		} else {
			input.placeholder = "ENTER TITLE!";
		}
	});
}
// Task Functionality

let taskCounter = 0;
function taskFunctionality(btn, formTaskContainer) {
	btn.addEventListener("click", () => {
		createTask();
		console.log(this);
	});
	function createTask() {
		taskForm();
	}
	function taskForm() {
		let currentProject;
		const domProject = document.querySelector(".selected");
		let domIndex = domProject.dataset.index;
		domIndex *= 1;
		let projectIndex;
		projects.find((project) => {
			if (project.index === domIndex) {
				projectIndex = projects.indexOf(project);
				currentProject = projects[projectIndex];
				console.log(currentProject);
			}
		});
		const containerForm = document.querySelector("[data-form]");
		if (containerForm !== null) {
			formTaskContainer.removeChild(containerForm);
			return;
		}
		const containerClasses = [
			"flex",
			"justify-center",
			"bg-[#00000020]",
			"p-2",
			"rounded-lg",
			"mb-2",
		];
		const formClasses = [
			"grid",
			"gap-4",
			"xl:grid-cols-[300px_75%]",
			"md:grid-cols-[250px_60%]",
			"w-[100%]",
		];
		const textClasses = [
			"font-bold",
			"opacity-85",
			"text-white",
			"text-center",
			"text-[80%]",
			"mb-2",
			"col-span-2",
		];
		const textREQClasses = [
			"lg:left-20",
			"relative",
			"font-semibold",
			"opacity-85",
			"text-white",
			"text-center",
			"text-xl",
		];
		const inputDescClasses = [
			"px-2",
			"w-[80%]",
			"row-span-2",
			"text-black",
			"h-[120px]",
			"resize-none",
			"rounded-md",
			"border-[3px]",
			"border-[#00698998]",
			"text-lg",
			"shadow-lg",
			"w-[45%]",
			"mb-2",
			"focus:outline-none",
		];
		const inputClasses = [
			"px-2",
			"rounded-md",
			"text-black",
			"border-[3px]",
			"border-[#00698998]",
			"text-lg",
			"shadow-lg",
			"w-[80%]",
			"h-8",
			"mb-2",
			"focus:outline-none",
		];
		const submitClasses = [
			"lg:left-[50%]",
			"relative",
			"bg-[#00000040]",
			"hover:bg-[#00000070]",
			"duration-200",
			"text-white",
			"text-2xl",
			"font-bold",
			"px-3",
			"w-32",
			"h-12",
			"rounded",
			"shadow-lg",
		];

		let container = document.createElement("div");
		let form = document.createElement("form");
		let text = document.createElement("p");
		let titleText = document.createElement("p");
		let descText = document.createElement("p");
		let inputDesc = document.createElement("textarea");
		let input = document.createElement("input");
		let submit = document.createElement("button");

		containerClasses.forEach((clasa) => container.classList.add(clasa));
		container.setAttribute("data-form", "");
		formClasses.forEach((clasa) => form.classList.add(clasa));
		textClasses.forEach((clasa) => text.classList.add(clasa));
		textREQClasses.forEach((clasa) => {
			titleText.classList.add(clasa);
			descText.classList.add(clasa);
		});
		titleText.classList.add("lg:left-28");
		inputClasses.forEach((clasa) => input.classList.add(clasa));
		inputDescClasses.forEach((clasa) => inputDesc.classList.add(clasa));
		submitClasses.forEach((clasa) => submit.classList.add(clasa));

		titleText.innerText = "Title: ";
		descText.innerText = "Description: ";
		text.innerText = "Add a Task to Your Project!";
		input.placeholder = "Enter Title";
		inputDesc.placeholder = "Enter Description";
		submit.innerText = "Create";

		formTaskContainer.appendChild(container);
		container.appendChild(form);
		form.appendChild(text);
		form.appendChild(titleText);
		form.appendChild(input);
		form.appendChild(descText);
		form.appendChild(inputDesc);
		form.appendChild(submit);

		submit.addEventListener("click", (event) => {
			event.preventDefault();
			const title = input.value;
			if (title) {
				let task = new Task(title, taskCounter);
				taskCounter++;
				currentProject.tasks.push(task);

				input.value = "";
				if (inputDesc.value !== "") {
					task.description = inputDesc.value;
					inputDesc.value = "";
				}
				console.log(task);
				formTaskContainer.removeChild(container);
				createTask(taskCounter, title, task.description);
			} else {
				input.placeholder = "ENTER TITLE!";
			}
		});
		function createTask(index, title, desc) {
			console.log(index)
			const taskContainer = document.createElement("div");
			const taskClasses = [
				"duration-200",
				"shadow-md",
				"grid",
				"grid-cols-[10%_80%_10%]",
				"bg-[#00000020]",
				"p-2",
				"rounded-lg",
				"mb-2",
			];

			taskClasses.forEach((className) =>
				taskContainer.classList.add(className)
			);
			taskContainer.dataset.index = index;
			taskContainer.dataset.task = '';

			const checkbox = document.createElement("div");
			const checkboxClasses = [
				"w-[1.7rem]",
				"h-[1.7rem]",
				"mt-2",
				"border-2",
				"border-white",
				"rounded-[50%]",
				"relative",
				"right-2",
				"ml-4",
			];
			checkboxClasses.forEach((className) => checkbox.classList.add(className));
			checkbox.dataset.checkbox = '';

			const titleDom = document.createElement("h2");
			const titleClasses = ["font-semibold", "text-white", "text-xl", "mt-2"];
			titleClasses.forEach((className) => titleDom.classList.add(className));
			titleDom.dataset.title = '';
			titleDom.textContent = title;

			const buttonDesc = document.createElement("img");
			const buttonDescClasses = [
				"w-[2.5rem]",
				"h-[2.8rem]",
				"pt-[4px]",
				"rounded-[50%]",
				"relative",
				"right-2",
				"ml-4",
				"hover:shadow-lg",
				"hover:opacity-20",
			];
			buttonDescClasses.forEach((className) =>
				buttonDesc.classList.add(className)
			);
			buttonDesc.dataset.buttonDesc = '';
			buttonDesc.alt = "arrow down";
			buttonDesc.src = "src/Images/arrow_down.webp";

			const description = document.createElement("div");
			const descriptionClasses = [
				"text-base",
				"font-normal",
				"m-2",
				"mt-4",
				"col-span-3",
				"hidden",
			];
			descriptionClasses.forEach((className) =>
				description.classList.add(className)
			);
			description.dataset.desc = '';
			description.textContent = desc;

			const deleteButton = document.createElement("div");
			const deleteButtonClasses = [
				"hidden",
				"col-start-3",
				"duration-100",
				"w-24",
				"relative",
				"right-[100%]",
				"h-8",
				"bg-red-700",
				"rounded-md",
				"text-lg",
				"flex",
				"justify-center",
				"items-center",
				"hover:opacity-80",
			];
			deleteButtonClasses.forEach((className) =>
				deleteButton.classList.add(className)
			);
			deleteButton.dataset.deleteTask = '';
			deleteButton.textContent = "Delete";

			// Append all elements to the parent container
			taskContainer.appendChild(checkbox);
			taskContainer.appendChild(titleDom);
			taskContainer.appendChild(buttonDesc);
			taskContainer.appendChild(description);
			taskContainer.appendChild(deleteButton);
			taskSection.appendChild(taskContainer);
			updateTasks()
		}
		

		function updateTasks()
		{		
			// Checkbox Fill Logic
			const checkboxes = document.querySelectorAll("[data-checkbox]");
			checkboxes.forEach((checkbox) => {
				checkbox.addEventListener("click", () => toggleCheckboxStatus(checkbox));
			});
			function toggleCheckboxStatus(checkbox) {
				if (checkbox.classList.contains("bg-white")) {
					checkbox.closest("[data-index]").classList.remove(`order-last`);
					checkbox.classList.toggle("bg-white");
					return;
				}
				checkbox.classList.toggle("bg-white");
				checkbox.closest("[data-index]").classList.add(`order-last`);
			}
	
			
			let tasks = document.querySelectorAll("[data-task]");
			tasks.forEach((task) =>
				task.querySelector('[data-button-desc]').addEventListener("click", (event) => toggleDescription(event))
			);
			function toggleDescription(event) {
				const button = event.target.closest("[data-button-desc]");
					const description = button.nextSibling;
					const deleteBtn = description.nextSibling;
					if (deleteBtn && description) {
						description.classList.toggle("hidden");
						deleteBtn.classList.toggle("hidden");
					}
			}
		}
	}
}

// TO-DOs!
// 1.4 Create funtion to delete task from DOM
// 1.5 Create funtion to delete task from task list of the project
// 2.0 Storage Functionality!
// 2.1 Store the projects with their corresponding tasks in a .json file ig?
// 2.2 Check every time the browser loads if there are any files containing
// projects, and if so display them with their corresponding tasks
