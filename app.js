export class Project
{
    constructor(title)
    {
        this.title = title
        this.Tasks = []
    }
    addToDoItem(task)
    {
        this.Tasks.push(task)
    }
    removeToDoItem(task)
    {
        const index = this.Tasks.indexOf(task)
        if(index !== -1)
            {
                this.Tasks.splice(index, 1)
            }
    }
}
export let projects = []
export class Task
{
    constructor(title, index)
    {
        this.title = title
        this.index = index
        this.description = ''
    }
    addDescription(description)
    {
        this.description = description
    }
}