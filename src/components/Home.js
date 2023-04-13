
const Home = () =>{
    return(
        <div className="ml-28 mr-5 lg:ml-80 lg:w-160 text-justify">
            <p className="text-2xl text-red-500 text-center pt-4 mb-1">¡¡AVISO!!</p>
            <p>Este proyecto no utiliza base de datos ni se guardan los datos en local, por lo que todo lo que hagáis se perderá si actualizáis la página o si la abrís en una pestaña nueva.</p>
            <p className="text-2xl text-bold text-center mt-4 mb-1">INFORMACIÓN</p>
            <p>Este proyecto es un TODO List con Drag & Drop que está basado a como funciona la aplicación Trello.</p>
            <p>En el podréis crear las listas de proyectos que deseéis y en cada proyecto asignar diferentes tipos tareas al gusto, arrastrando podréis cambiarlas las tareas de posición (a excepción de los proyectos), también podréis editarlas y eliminarlas si lo deseáis.</p>
            <img src={process.env.PUBLIC_URL+"/Tutorial-Todo.gif"} alt="tutorial del funcionamiento"/>
        </div>
    )
}

export default Home