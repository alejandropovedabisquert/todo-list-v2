import { Link, Route, Routes } from "react-router-dom"
import TodoList from "./TodoList"

const Nav = ({data, setData}) =>{
    // console.log(data)
    return(
        <div className="fixed min-h-[300px] h-full w-72 bg-secondary-color z-10">
           
            <h1 className='text-center text-2xl'>TODO List</h1>
            {data.projectsOrder.map((projectId)=>{
                return(
                    <div key={projectId}>
                        <Link to={"/"+projectId} data={data} ><div className="text-xl pl-10 py-2 mt-5 hover:bg-red-600">{data.projects[projectId].name}</div></Link>
                    </div>
                )
            })}
        </div>
    )
}

export default Nav