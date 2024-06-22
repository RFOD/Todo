import {Project, Task, projects} from "./app.js"

// Checkbox Fill Logic
let checkboxes = document.querySelectorAll('[data-checkbox]')
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('click',() => toggleCheckboxStatus(checkbox))
})
function toggleCheckboxStatus(checkbox)
{
    if(checkbox.classList.contains('bg-white'))
        {
            checkbox.closest('[data-index]').classList.remove(`order-last`)
            checkbox.classList.toggle('bg-white')
            return
        }
    checkbox.classList.toggle('bg-white')
    checkbox.closest('[data-index]').classList.add(`order-last`)
}

// Project functionality 
const addBtn = document.querySelector('[data-add-project]')
const projectFormSection = document.querySelector('[data-form-project-section]')
const projectSection = document.querySelector('[data-project-section]')
let projectIndex = 0
addBtn.addEventListener('click', () => addProject())

function addProject()
{
    let title = ''
    createProjectForm(projectIndex ,title)
    projectIndex++
    
}
function createProject(projectIndex, title)
{
    const containerClasses = ['duration-200', 'grid', 'grid-cols-[70%_30%]', 'grid-rows-1', 'bg-[#00000020]','shadow-md', 'p-2', 'rounded-lg', 'mb-2', 'hover:bg-[#00000030]'] 
    const titleClasses = ['font-semibold', 'text-white', 'text-lg','ml-2']
    const buttonClasses = ['flex', 'justify-center', 'items-center']
    const delBtnClasses = ['duration-100', 'w-36', 'h-8', 'bg-red-700', 'rounded-md', 'text-md', 'text-white', 'flex', 'justify-center', 'items-center', 'hover:opacity-80'] 

    const buttonContainer = document.createElement('div')
    const container = document.createElement('div')
    const projectTitle = document.createElement('h2')
    const deleteBtn = document.createElement('div')

    container.setAttribute('data-index', `${projectIndex}`)
    containerClasses.forEach((clasa) => container.classList.add(clasa))
    titleClasses.forEach((clasa) => projectTitle.classList.add(clasa))
    buttonClasses.forEach((clasa) => {buttonContainer.classList.add(clasa)})
    deleteBtn.setAttribute('data-rem-project', '')
    delBtnClasses.forEach((clasa) => deleteBtn.classList.add(clasa))
    projectTitle.innerText = `${title}`
    deleteBtn.innerText = `Delete`

    projectSection.appendChild(container)
    container.appendChild(projectTitle)
    container.appendChild(buttonContainer)
    buttonContainer.appendChild(deleteBtn)
    const removeBtns = document.querySelectorAll('[data-rem-project]')
    removeBtns.forEach((button) => {
    button.addEventListener('click', () => removeProject(event))
    })
    console.log(projects)
}
function removeProject(event)
{
    
    const container = event.target.closest('[data-index]')
    projects.splice(container.dataset.index, 1)
    if(projectIndex !== 0)  {projectIndex--}
    projectSection.removeChild(container)
    console.log(projects)
}

function createProjectForm(index ,title)
{
    if(document.querySelector('[data-container]') !== null){return}
    const containerClasses =['flex', 'justify-center', 'bg-[#00000020]', 'p-2', 'rounded-lg', 'mb-2']
    const formClasses =['flex', 'justify-center', 'items-center', 'flex-col', 'w-[100%]']
    const textClasses =['font-bold', 'opacity-85', 'text-white', 'text-center', 'text-[125%]', 'mb-2']
    const inputClasses =['px-2', 'rounded-md', 'border-[3px]', 'border-[#00698998]', 'shadow-lg', 'w-[60%]', 'mb-2', 'focus:outline-none']
    const submitClasses =['bg-[#00000040]', 'hover:bg-[#00000070]', 'duration-200', 'text-white', 'font-bold', 'py-1', 'px-3', 'rounded', 'shadow-lg']

    let container = document.createElement('div')
    let form = document.createElement('form')
    let text = document.createElement('p')
    let input = document.createElement('input')
    let submit = document.createElement('button')
    
    containerClasses.forEach((clasa) => container.classList.add(clasa))
    container.setAttribute('data-container', ``)
    formClasses.forEach((clasa) => form.classList.add(clasa))
    textClasses.forEach((clasa) => text.classList.add(clasa))
    inputClasses.forEach((clasa) => input.classList.add(clasa))
    submitClasses.forEach((clasa) => submit.classList.add(clasa))
    
    
    text.innerText = "Set the Title of The Project!"
    input.placeholder = "Enter Title"
    submit.innerText = "Create"
    
    projectFormSection.appendChild(container)
    container.appendChild(form)
    form.appendChild(text)
    form.appendChild(input)
    form.appendChild(submit)
    
    submit.addEventListener('click', (event) => {
        event.preventDefault()
        title = input.value
        if(title)
        {
            let project = new Project(title)
            projects.push(project)
            console.log(project)
            input.value = ''
            projectFormSection.removeChild(container)
            createProject(index, title)
        }
        else{
            input.placeholder = 'ENTER TITLE!'
        }
    })
}

// Task Functionality 

let tasks = document.querySelectorAll('[data-task]')
tasks.forEach((task) => task.addEventListener('click',() => toggleDescription(event)))

function toggleDescription(event)
{
    const button = event.target.closest('[data-button-desc]')
    if(button)
        {
            const description = button.nextSibling.nextSibling
            description.classList.toggle('hidden')
        }

}
// TO-DO for tomorrow!
// 
// 0.0 Create a funciton to switch between project tasks lists and every times it switches it updated the tasks part of DOM
// 1.0 Add task/ Delete task funtionality!
// 1.1 Create function to take care of creation of the form for the tasks
// 1.2 Create function to store data from the Form to the object Task
// 1.3 Create function to add the task to the DOM 
// 1.4 Create funtion to delete task from DOM
// 1.5 Create funtion to delete task from task list of the project 
// 2.0 Storage Functionality!
// 2.1 Store the projects with their corresponding tasks in a .json file ig?
// 2.2 Check every time the browser loads if there are any files containing 
// projects, and if so display them with their corresponding tasks