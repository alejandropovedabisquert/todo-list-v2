import { Draggable, Droppable } from "react-beautiful-dnd"
import Task from "./Task"


const Table = ({tasks, table, index}) =>{
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
                        <h2 
                            className="px-3 pt-3 text-lg font-medium bg-slate-300"
                            {...provided.dragHandleProps}
                        >
                            {table.title}
                        </h2>
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
                                            <Task key={task.id} task={task} index={index}/>
                                        ))}
                                        {provided.placeholder}
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