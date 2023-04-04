import { Draggable, Droppable } from "react-beautiful-dnd"
import Task from "./Task"


const Table = ({tasks, table, index}) =>{
    return(
        <Draggable index={index} draggableId={table.id} type='table'>
            {(provided, snapshot) => {
  
                return(
                    <div
                        className='bg-slate-300 w-72 m-5 rounded-sm shadow-lg'
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <h2 className="px-3 pt-3 text-lg font-medium">{table.title}</h2>
                        <Droppable droppableId={table.id} type="task">
                            {(provided, snapshot) => {
                                const style = {
                                    backgroundColor: snapshot.isDraggingOver ? 'red' : 'inherit',
                                }
                                // console.log(snapshot, "Table")
                                return(
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        style={style}
                                        className="px-3 pt-3 min-h-full"
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