const MenuButton = ({open, setOpen}) =>{

  const hamburguerButton = `flex flex-col scale-75 z-10 h-20 w-full cursor-pointer justify-center items-center group relative`
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

export default MenuButton