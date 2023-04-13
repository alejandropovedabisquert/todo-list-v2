const ApMenuButton = ({open, setOpen}) =>{

  const hamburguerButton = `flex flex-col scale-75 md:scale-100 z-10 h-20 w-20 shadow-xl rounded-md bg-slate-50 border-4 border-secondary-color cursor-pointer justify-center items-center group float-right top-4 right-4 relative`
    const genericHamburgerLine = `h-[6px] w-9 my-1 rounded-full bg-black transition ease transform duration-300`
    return(
      <div className={`${hamburguerButton}`} onClick={()=> setOpen(!open)}>
        <div
          className={`${genericHamburgerLine} ${
            open
              ? "rotate-45 translate-y-[0.85rem] opacity-100"
              : "opacity-100"
          }`}
        />
        <div
          className={`${genericHamburgerLine} ${
            open ? "opacity-0" : "opacity-100"
          }`}
        />
        <div
          className={`${genericHamburgerLine} ${
            open
              ? "-rotate-45 -translate-y-[0.85rem] opacity-100"
              : "opacity-100"
          }`}
        />
      </div>

    )
}

export default ApMenuButton