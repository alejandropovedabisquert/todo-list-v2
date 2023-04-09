import { useRef } from "react";


const TableForm = ({data, setData, projectId}) =>{
    const tableRef = useRef(undefined);
    const buttonClassStyle = "border-2 border-secondary-color ml-2 p-2 px-4 inline-block rounded-md shadow-sm transition-all font-bold duration-300 relative hover:text-white before:content-[''] before:absolute before:top-0 before:left-0 before:h-full before:content-[''] before:absolute before:top-0 before:left-0 before:w-0 before:-z-10 before:bg-primary-color before:transition-all before:duration-300 before:hover:w-full"
    const handleSubmit = (e) =>{
        e.preventDefault()
        const table = tableRef.current.value
        if (table !== "") {
            const conteoTablas = Object.keys(data.projects[projectId].content.tables).length + 1
            const id = projectId+"-table-"+conteoTablas
            const newTable = {
                [id]: {
                    id:id,
                    title: table,
                    taskIds: []
                }
            }

            // console.log(newTable);

            setData({
                ...data,
                projects:{
                    ...data.projects,
                    [projectId]:{
                        ...data.projects[projectId],
                        content:{
                            ...data.projects[projectId].content,
                            tables: Object.assign(data.projects[projectId].content.tables, newTable),
                            tableOrder: [...data.projects[projectId].content.tableOrder, id]
                        }
                    }
                }
            })
            e.target.reset()
        }else{
            console.log("esta vacio");
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" ref={tableRef} placeholder="Escribe tu nueva tabla" className="shadow-sm w-60 border border-gray-300 text-gray-900 text-sm rounded focus:ring-primary-500 focus:border-primary-500 p-2.5 focus:outline-none focus:ring-2 focus:ring-secondary-color"/>
                <button type="submit" className={buttonClassStyle}>Enviar</button>
            </form>
        </div>
    )
}

export default TableForm