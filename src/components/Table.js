import { Draggable, Droppable } from "react-beautiful-dnd"
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";
import Task from "./Task"
import TaskForm from "./TaskForm"


const Table = ({tasks, table, index, data, setData}) =>{

    const handleDeleteTable = (e) =>{
        const index = data.tableOrder.indexOf(e)
        console.log(data);
        let reduceTableOrder = data.tableOrder
        let reduceTable = data.tables
        delete reduceTable[e]
        reduceTableOrder.splice(index, 1)
        setData({
            ...data,
            tableOrder: reduceTableOrder,
            tables:reduceTable
        })
        //Crear una eliminación masiva de las tareas asignadas a una propia tabla
        // console.log(data.tasks);
    }


    return(
        <Draggable index={index} draggableId={table.id} type='table'>
            {(provided, snapshot) => {
                const style = {
                    backgroundColor: snapshot.isDragging ? 'bg-red-400' : 'inherit',
                }
                return(
                    <div
                        className={`w-72 min-w-[18rem] m-5`}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                    >
                        <div 
                            className="flex px-3 pt-3 text-lg font-medium bg-slate-300 group" 
                            {...provided.dragHandleProps}
                        >
                            <h2 className="w-full">{table.title}</h2>
                            <div className="float-right">
                                <span className="cursor-pointer hidden align-middle group-hover:inline-block opacity-40 hover:opacity-75" onClick={() => handleDeleteTable(table.id)}><FaTrashAlt color="red"/></span>
                            </div>

                        </div>
                        <Droppable droppableId={table.id} type="task">
                            {(provided, snapshot) => {
                                const style = {
                                    backgroundColor: snapshot.isDraggingOver ? 'bg-red-400' : 'bg-slate-300',
                                }

                                return(
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className={`px-3 py-3 rounded-sm shadow-lg ${style.backgroundColor}`}
                                    >
                                        {tasks.map((task, index) =>(
                                            <Task key={task.id} task={task} index={index} data={data} setData={setData} tableId={table.id}/>
                                        ))}
                                        {provided.placeholder}
                                        <TaskForm data={data} setData={setData} tableId={table.id}/>
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