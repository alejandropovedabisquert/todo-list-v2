const { Draggable } = require("react-beautiful-dnd")


const Task = ({task, index}) =>{

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
                        {task.content}
                    </div>
                )
                
            }}
        </Draggable>
    )
}

export default Task