import { useRef } from "react";


const TaskForm = ({data, setData, tableId, allData}) =>{
    const tableRef = useRef(undefined);
    const buttonClassStyle = "border-2 z-10 bg-white w-full mt-2 border-secondary-color p-2 px-4 inline-block rounded-md shadow-md transition-all font-bold duration-300 relative hover:text-white before:content-[''] before:absolute before:top-0 before:left-0 before:h-full before:content-[''] before:absolute before:top-0 before:left-0 before:w-0 before:-z-10 before:bg-primary-color before:transition-all before:duration-300 before:hover:w-full"
    // console.log(data);
    const handleSubmit = (e) =>{
        e.preventDefault()
        const id = Object.keys(data.content.tasks).length + 1
        const task = tableRef.current.value
        if (task !== "" && task.trim().length !== 0) {
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
                <textarea type="text" ref={tableRef} placeholder="Escribe tu nueva tarea" className="block p-2.5 w-full text-sm text-gray-900 rounded shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-secondary-color"/>
                <button type="submit" className={buttonClassStyle}>
                    Añadir una tarea
                </button>
            </form>
        </div>
    )
}

export default TaskForm