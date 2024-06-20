let orderCounter = 0
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
