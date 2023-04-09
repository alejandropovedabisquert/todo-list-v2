import { Draggable, Droppable } from "react-beautiful-dnd"
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";
import Task from "./Task"
import TaskForm from "./forms/TaskForm"


const Table = ({tasks, table, index, data, allData, setData}) =>{
    
    const handleDeleteTable = (e) =>{
        const index = data.content.tableOrder.indexOf(e)
        let reduceTableOrder = data.content.tableOrder
        let reduceTable = data.content.tables
        delete reduceTable[e]
        reduceTableOrder.splice(index, 1)
        setData({
            ...allData,
        })
        //Crear una eliminación masiva de las tareas asignadas a una propia tabla
        // console.log(data.tasks);
    }


    return(
        <Draggable index={index} draggableId={table.id} type='table'>
            {(provided) => {
                return(
                    <div
                        className={`w-72 min-w-[18rem] m-5`}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                    >
                        <div 
                            className="flex p-3 text-lg font-medium bg-slate-50 hover:bg-slate-200 rounded-t-md border-2 border-secondary-color border-b-0 group" 
                            {...provided.dragHandleProps}
                        >
                            <h2 className="w-full font-bold break-words">{table.title}</h2>
                            <div className="float-right">
                                <span className="cursor-pointer hidden align-middle group-hover:inline-block opacity-40 hover:opacity-75" onClick={() => handleDeleteTable(table.id)}><FaTrashAlt color="red"/></span>
                            </div>

                        </div>
                        <Droppable droppableId={table.id} type="task">
                            {(provided, snapshot) => {
                                const style = {
                                    backgroundColor: snapshot.isDraggingOver ? 'bg-slate-200' : 'bg-slate-50',
                                }

                                return(
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className={`px-3 py-3 rounded-b-md border-2 border-secondary-color border-t-0 shadow-lg ${style.backgroundColor}`}
                                    >
                                        {tasks.map((task, index) =>(
                                            <Task key={task.id} task={task} index={index} data={data} allData={allData} setData={setData} tableId={table.id}/>
                                        ))}
                                        {provided.placeholder}
                                        <TaskForm data={data} setData={setData} tableId={table.id} allData={allData}/>
                                    </div>
                                )
                                
                            }}
                        </Droppable>
                        
                    </div> 
                )
               
            }}
        </Draggable>
    )
}

export default Table