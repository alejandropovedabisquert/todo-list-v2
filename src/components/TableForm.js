import { useRef } from "react";


const TableForm = ({data, setData}) =>{
    const tableRef = useRef(undefined);

    const handleSubmit = (e) =>{
        e.preventDefault()
        const table = tableRef.current.value
        if (table !== "") {
            const id = Object.keys(data.tables).length + 1
            console.log(data)
            const newTable = {
                ["table-"+id]: {
                    id:"table-"+id,
                    title: table,
                    taskIds: []
                }
            }

            const asignNewTable = Object.assign(data.tables, newTable)
            setData({
                ...data,
                tables: asignNewTable,
                tableOrder: [...data.tableOrder, "table-"+id]
            })
            // console.log({
            //     ...data,
            //     tables: newTable
            // })
            console.log(data);
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