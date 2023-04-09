import { useRef } from "react";
import { useNavigate } from "react-router-dom";


const ProjectForm = ({data, setData}) =>{
    const tableRef = useRef(undefined);
    const buttonClassStyle = "border-2 z-10 bg-white border-secondary-color p-2 mt-4 px-4 inline-block rounded-md shadow-sm transition-all font-bold duration-300 relative hover:text-white before:content-[''] before:absolute before:top-0 before:left-0 before:h-full before:content-[''] before:absolute before:top-0 before:left-0 before:w-0 before:-z-10 before:bg-primary-color before:transition-all before:duration-300 before:hover:w-full"
    const navigate = useNavigate()
    // console.log(data);
    const handleSubmit = (e) =>{
        e.preventDefault()
        const project = tableRef.current.value
        if (project !== "" && project.trim().length !== 0) {
            if (Object.entries(data).length === 0) {
                const createFirstProject = {
                    projects:{
                        ['project-1']:{
                            id: 'project-1',
                            name: project,
                            content:{
                               tasks:{},
                               tables:{},
                               tableOrder:[]
                            }
                        }
    
                    },
                    projectsOrder:['project-1']
                }
                setData(createFirstProject)
                navigate("/project-1")
    
            }else{
                const conteoProjectos = Object.keys(data.projects).length + 1
                const id = 'project-'+conteoProjectos
                const createNewProject={
                    ...data,
                    projects:{
                        ...data.projects,
                        [id]:{
                            id: id,
                            name: project,
                            content:{
                                tasks:{},
                                tables:{},
                                tableOrder:[]
                            }
                        }
                    },
                    projectsOrder:[...data.projectsOrder, id]
                }
                console.log(createNewProject);
                setData(createNewProject)
                navigate(id)
            }

            e.target.reset()
        }else{
            console.log("esta vacio");
        }
    }

    return(
        <div className="mx-5 text-center pt-4">
            <form onSubmit={handleSubmit}>
                <input type="text" ref={tableRef} placeholder="Escribe tu nuevo proyecto" className="shadow-sm w-full text-center border border-gray-300 text-gray-900 text-sm rounded focus:ring-primary-500 focus:border-primary-500 p-2.5 focus:outline-none focus:ring-2 focus:ring-secondary-color"/>
                <button type="submit" className={buttonClassStyle}>Añadir proyecto</button>
            </form>
        </div>
    )
}

export default ProjectForm