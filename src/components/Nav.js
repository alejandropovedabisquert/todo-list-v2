import { Link, useLocation } from "react-router-dom"
import ProjectForm from "./forms/ProjectForm"
import { useEffect, useRef, useState } from "react"
import MenuButton from "./MenuButton"

const Nav = ({data, setData}) =>{
    // console.log(data)
    const location = useLocation()
    const activationNav = location.pathname.substring(1, location.pathname.length)
    const [open, setOpen] = useState(false)
    const ref = useRef()


    useEffect(()=>{
        const checkIfClickedOutside = e => {
            // Si el menu está abierto y el target del click no esta en el menu
            // entonces cierra el menu
            if (open && ref.current && !ref.current.contains(e.target)) {
                setOpen(false)
            }
        }

        const detectKeyDown= (e) =>{
            //Si pulsas la tecla escape setea como falso  y cierra el menu
            if (e.key === "Escape") {
                setOpen(false)
            }
        }

        document.addEventListener('keydown', detectKeyDown, true)
        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            // Limpia el evento
            document.removeEventListener("mousedown", checkIfClickedOutside)
            document.removeEventListener('keydown', detectKeyDown, true)

          }

    })

    return(
        <>
            <div className={`overflow-y-auto block lg:hidden lg:fixed min-h-[300px] h-full lg:w-72 border-r-2 border-secondary-color bg-slate-50 z-50 transition-all ${open ? "w-screen fixed": "w-24 fixed"}`}>
                <Link to="/" onClick={()=> setOpen(false)}><h1 className={`text-center py-4 text-2xl border-b-2 border-secondary-color ${open ? null: "hidden"}`}>TODO List</h1></Link>
                <MenuButton open={open} setOpen={setOpen}/>
                <>
                {
                    open &&
                        <>
                            <ProjectForm data={data} setData={setData}/>
                        </>
                }
                </>
                <div className="mt-4">
                    {
                        open && 
                            <>
                                {data.projectsOrder !== undefined ? data.projectsOrder.map((projectId)=>{
                                    return(
                                        <Link to={"/"+projectId} data={data} key={projectId} onClick={()=> setOpen(false)}>
                                            <div className={`flex w-full hover:bg-primary-color transition-all duration-300 ${activationNav === projectId ? 'bg-primary-color': null} group`}>
                                                <div className={`text-xl w-full px-10 py-2  break-words`}>{data.projects[projectId].name}</div>
                                            </div>
                                        </Link>
                                    )
                                }):null}
                            </>
                                
                    }
                </div>
            </div>
            <div className={`overflow-y-auto hidden lg:block lg:fixed min-h-[300px] h-full lg:w-72 border-r-2 border-secondary-color bg-slate-50 z-50 transition-all`}>
                <Link to="/"><h1 className={`text-center py-4 text-2xl border-b-2 border-secondary-color`}>TODO List</h1></Link>
                <ProjectForm data={data} setData={setData}/>
                <div className="mt-4">
                    {data.projectsOrder !== undefined ? data.projectsOrder.map((projectId)=>{
                        return(
                            <Link to={"/"+projectId} data={data} key={projectId}>
                                <div className={`flex w-full hover:bg-primary-color transition-all duration-300 ${activationNav === projectId ? 'bg-primary-color': null} group`}>
                                    <div className={`text-xl w-full px-10 py-2  break-words`}>{data.projects[projectId].name}</div>
                                </div>
                            </Link>
                        )
                    }):null}
                </div>
            </div>
        </>
    )
}

export default Nav