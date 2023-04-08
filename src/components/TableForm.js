import { useRef } from "react";


const TableForm = ({data, setData, projectId}) =>{
    const tableRef = useRef(undefined);
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

            console.log(newTable);

            // console.log({
            //     ...data,
            //     projects:{
            //         ...data.projects,
            //         [projectId]:{
            //             ...data.projects[projectId],
            //             content:{
            //                 ...data.projects[projectId].content,
            //                 tables: Object.assign(data.projects[projectId].content.tables, newTable),
            //                 tableOrder: [...data.projects[projectId].content.tableOrder, id]
            //             }
            //         }
            //     }
            // });

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
                <input type="text" ref={tableRef} placeholder="Titulo tabla"/>
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}

export default TableForm