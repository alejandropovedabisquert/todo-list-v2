import { useRef } from "react";


const TaskForm = ({data, setData, tableId, allData}) =>{
    const tableRef = useRef(undefined);
    console.log(data);
    const handleSubmit = (e) =>{
        e.preventDefault()
        const id = Object.keys(data.content.tasks).length + 1
        const task = tableRef.current.value
        if (task !== "") {
            const newTask = {
                ["task-"+id]: {
                    id:"task-"+id,
                    content: task
                }
            }
            const assignTask = {taskIds: [...data.content.tables[tableId].taskIds, "task-"+id]}
            
            console.log({
                ...allData,
                projects:{
                    ...allData.projects,
                    [data.id]:{
                        ...allData.projects[data.id],
                        content:{
                            ...data.content,
                            tasks: Object.assign(data.content.tasks, newTask),
                            tables: Object.assign({...data.content.tables, [tableId]: Object.assign(data.content.tables[tableId], assignTask)})
                        }
                    }
                },
                // ...data,
                // tasks: Object.assign(data.tasks, newTask),
                // tables: Object.assign({...data.tables, [tableId]: Object.assign(data.tables[tableId], assignTask)})

            });
            
            setData({
                ...allData,
                projects:{
                    ...allData.projects,
                    [data.id]:{
                        ...allData.projects[data.id],
                        content:{
                            ...data.content,
                            tasks: Object.assign(data.content.tasks, newTask),
                            tables: Object.assign({...data.content.tables, [tableId]: Object.assign(data.content.tables[tableId], assignTask)})
                        }
                    }
                },
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