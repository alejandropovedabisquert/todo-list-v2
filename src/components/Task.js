import { Draggable } from "react-beautiful-dnd"
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";

const Task = ({task, index, data, allData, setData, tableId}) =>{
    const handleDeleteTask = (e) =>{
        console.log(data);
        const index = data.content.tables[tableId].taskIds.indexOf(e)
        let reduceTask = data.content.tasks
        let reduceTaskAssigned = data.content.tables[tableId].taskIds
        delete reduceTask[e]
        reduceTaskAssigned.splice(index, 1)
        setData({
            ...allData,
        })
        // setData({
        //     ...data,
        //     tasks: reduceTask,
        //     tables: Object.assign({...data.tables, [tableId]: Object.assign(data.tables[tableId], {taskIds: reduceTaskAssigned})})
        // })
    }

    return(
        <Draggable draggableId={task.id} index={index} type="task">
            {(provided, snapshot) =>{
                const style = {
                    background: snapshot.isDragging ? 'bg-orange-600' : 'bg-white',
                }
                return(
                    <div
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        className={`p-1 pl-3 rounded-sm mb-3 last:mb-0 ${style.background}`}
                    >
                        <div className="flex group relative">
                            <div className="w-full">{task.content}</div>
                            <div className="float-right">
                                <span className="cursor-pointer hidden group-hover:inline-block group-hover:absolute group-hover:right-0 group-hover:p-1 group-hover:bg-slate-200 opacity-40 hover:opacity-75" onClick={() => handleDeleteTask(task.id)}><FaTrashAlt color="red"/></span>
                            </div>

                        </div>
                    </div>
                )
                
            }}
        </Draggable>
    )
}

export default Task