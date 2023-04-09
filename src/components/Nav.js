import { Link, useLocation } from "react-router-dom"
import ProjectForm from "./forms/ProjectForm"

const Nav = ({data, setData}) =>{
    // console.log(data)
    const location = useLocation()
    const activationNav = location.pathname.substring(1, location.pathname.length)
    return(
        <div className="fixed min-h-[300px] h-full w-72 border-r-2 border-secondary-color bg-slate-50 z-10 overflow-y-auto">
           
            <Link to="/"><h1 className='text-center py-4 text-2xl'>TODO List</h1></Link>
            <ProjectForm data={data} setData={setData}/>
            <div className="mt-4">
                {data.projectsOrder !== undefined ? data.projectsOrder.map((projectId)=>{
                    return(
                        <div key={projectId}>
                            <Link to={"/"+projectId} data={data} ><div className={`text-xl px-10 py-2 hover:bg-primary-color break-words ${activationNav === projectId ? 'bg-primary-color': null}`}>{data.projects[projectId].name}</div></Link>
                        </div>
                    )
                }):null}
            </div>
        </div>
    )
}

export default Nav