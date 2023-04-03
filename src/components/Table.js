import { Draggable, Droppable } from "react-beautiful-dnd"
import Task from "./Task"


const Table = ({tasks, table, index}) =>{
    return(
        <Draggable index={index} draggableId={table.id} type='table'>
            {provided => (
               <div
                className='bg-slate-300 w-72 text-center'
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
               >
                <h2>{table.title}</h2>
                <Droppable droppableId={table.id} type="task">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {tasks.map((task, index) =>(
                                <Task key={task.id} task={task} index={index}/>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
               </div> 
            )}
        </Draggable>
    )
}

export default Table