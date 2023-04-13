import { Link, useLocation } from "react-router-dom"
import ProjectForm from "./forms/ProjectForm"
import { useEffect, useRef, useState } from "react"
import ApMenuButton from "./ApMenuButton"

const Nav = ({data, setData}) =>{
    // console.log(data)
    const location = useLocation()
    const activationNav = location.pathname.substring(1, location.pathname.length)
    const [open, setOpen] = useState(false)
    const ref = useRef()


    const listarMenu = data.projectsOrder !== undefined ? data.projectsOrder.map((projectId)=>{
        return(
            <Link to={"/"+projectId} data={data} key={projectId}>
                <div className={`flex w-full hover:bg-primary-color transition-all duration-300 ${activationNav === projectId ? 'bg-primary-color': null} group`}>
                    <div className={`text-xl w-full px-10 py-2  break-words`}>{data.projects[projectId].name}</div>
                </div>
            </Link>
        
        )}
    ):null

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
            <nav className="nav fixed top-0 z-50 w-screen block lg:hidden">
                <div className="grid">
                    <div ref={ref} className="link-list absolute right-0">
                        <ApMenuButton open={open} setOpen={setOpen}/>
                        <div className={`circle-menu shadow-xl origin-[100%_0%] absolute right-0 ease duration-300 ${open ? 'w-screen h-screen bg-slate-50': 'w-0 h-0'}`}>
                            <div className={`${open ? 'transition-opacity duration-300 opacity-100 delay-300': 'opacity-0'} `}>
                                {
                                    open && 
                                            <ul className="absolute transition-all right-[80px] md:right-[100px] top-[70px] md:top-[100px] leading-[40px] md:leading-[50px] text-3xl md:text-4xl text-center">{listarMenu}</ul>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="fixed min-h-[300px] h-full w-72 border-r-2 border-secondary-color bg-slate-50 z-50 overflow-y-auto hidden lg:block">
            
                <Link to="/"><h1 className='text-center py-4 text-2xl border-b-2 border-secondary-color'>TODO List</h1></Link>
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