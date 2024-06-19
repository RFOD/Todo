let orderCounter = 0
let checkboxes = document.querySelectorAll('[data-checkbox]')
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('click',() => toggleCheckboxStatus(checkbox))
})
function toggleCheckboxStatus(checkbox)
{
    const tasks = document.querySelectorAll('[data-index]')
    
    nrOfTasks = tasks.length - 1
    if(orderCounter === nrOfTasks)
        {
            orderCounter = 0
        }

    if(checkbox.classList.contains('bg-white'))
        {
            checkbox.classList.toggle('bg-white')
            return
        }

    tasks.forEach((task) => {
    if(task.classList.contains('order-1'))
        {
            task.classList.remove('order-1')
        }
    else if(task.classList.contains('order-2'))
        {
            task.classList.remove('order-2')
        }
    else if(task.classList.contains('order-3'))
        {
            task.classList.remove('order-3')
        }
    else if(task.classList.contains('order-4'))
        {
            task.classList.remove('order-4')
        }
})
    orderCounter++
    checkbox.classList.toggle('bg-white')
    checkbox.closest('[data-index]').classList.add(`order-${orderCounter}`)
}
