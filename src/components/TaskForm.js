import { useRef } from "react";


const TaskForm = ({data, setData, tableId}) =>{
    const tableRef = useRef(undefined);
    const handleSubmit = (e) =>{
        e.preventDefault()
        const id = Object.keys(data.tasks).length + 1
        const task = tableRef.current.value
        if (task !== "") {
            const newTask = {
                ["task-"+id]: {
                    id:"task-"+id,
                    content: task
                }
            }
            const assignTask = {taskIds: [...data.tables[tableId].taskIds, "task-"+id]}
            setData({
                ...data,
                tasks: Object.assign(data.tasks, newTask),
                tables: Object.assign({...data.tables, [tableId]: Object.assign(data.tables[tableId], assignTask)})
            })
            e.target.reset()
        }else{
            console.log("esta vacio");
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" ref={tableRef} placeholder="Tarea"/>
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}

export default TaskForm