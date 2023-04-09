import { Link, useLocation } from "react-router-dom"
import ProjectForm from "./forms/ProjectForm"
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";

const Nav = ({data, setData}) =>{
    // console.log(data)
    const location = useLocation()
    const activationNav = location.pathname.substring(1, location.pathname.length)

    const handleDeleteProject = (e) =>{
        const index = data.projectsOrder.indexOf(e)
        let reduceProjectOrder = data.projectsOrder
        let reduceProject = data.projects
        delete reduceProject[e]
        reduceProjectOrder.splice(index, 1)
        console.log(reduceProjectOrder);
        setData({
            ...data,
        })
    }

    return(
        <div className="fixed min-h-[300px] h-full w-72 border-r-2 border-secondary-color bg-slate-50 z-50 overflow-y-auto">
           
            <Link to="/"><h1 className='text-center py-4 text-2xl border-b-2 border-secondary-color'>TODO List</h1></Link>
            <ProjectForm data={data} setData={setData}/>
            <div className="mt-4">
                {data.projectsOrder !== undefined ? data.projectsOrder.map((projectId)=>{
                    return(
                        <Link to={"/"+projectId} data={data} key={projectId}>
                            <div className={`flex w-full hover:bg-primary-color ${activationNav === projectId ? 'bg-primary-color': null} group`}>
                                <div className={`text-xl w-full px-10 py-2  break-words`}>{data.projects[projectId].name}</div>
                                <div className="float-right">
                                    <span className="cursor-pointer hidden align-middle group-hover:inline-block opacity-40 hover:opacity-75" onClick={() => handleDeleteProject(projectId)}><FaTrashAlt color="red"/></span>
                                </div>
                            </div>
                        </Link>
                    )
                }):null}
            </div>
        </div>
    )
}

export default Nav