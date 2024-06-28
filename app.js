export class Project
{
    constructor(title, index)
    {
        this.title = title
        this.index = index
        this.tasks = []
    }
    addTask(task)
    {
        this.tasks.push(task)
    }
    removeTask(task)
    {
        const index = this.Tasks.indexOf(task)
        if(index !== -1)
            {
                this.tasks.splice(index, 1)
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
    addDesc(description)
    {
        this.description = description
    }
}