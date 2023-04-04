const { Draggable } = require("react-beautiful-dnd")


const Task = ({task, index}) =>{

    return(
        <Draggable draggableId={task.id} index={index} type="task">
            {(provided, snapshot) =>{
                console.log(snapshot, "task")
                const style = {
                    ...provided.draggableProps.style,
                    background: snapshot.isDragging ? 'bg-orange-600' : 'bg-white',
                }
                return(
                    <div
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        // style={style}
                        className={`p-1 pl-3 rounded-sm mb-3 ${style.background}`}
                    >
                        {task.content}
                    </div>
                )
                
            }}
        </Draggable>
    )
}

export default Task