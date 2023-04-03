const { Draggable } = require("react-beautiful-dnd")


const Task = ({task, index}) =>{

    return(
        <Draggable draggableId={task.id} index={index} type="task">
            {(provided, snapshot) =>(
                <div
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                >
                    {task.content}
                </div>
            )}
        </Draggable>
    )
}

export default Task