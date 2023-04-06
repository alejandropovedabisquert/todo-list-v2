import { useRef } from "react";


const TableForm = ({data, setData}) =>{
    const tableRef = useRef(undefined);

    const handleSubmit = (e) =>{
        e.preventDefault()
        const table = tableRef.current.value
        if (table !== "") {
            const id = "table-"+Object.keys(data.tables).length + 1
            const newTable = {
                [id]: {
                    id:id,
                    title: table,
                    taskIds: []
                }
            }

            setData({
                ...data,
                tables: Object.assign(data.tables, newTable),
                tableOrder: [...data.tableOrder, id]
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