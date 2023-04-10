
const InputMaker = ({value, showInputEle, handleChange, handleBlur, classStyle}) =>{
    return(
        <>
        {
            // Use JavaScript's ternary operator to specify <span>'s inner content
            showInputEle ? (
                <input 
                    type="text"
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoFocus
                />
                ) : (
                <div 
                    className={`w-full break-words ${classStyle}`}
                >
                    {value}
                </div>
            )
        }
        </>
    )

}

export default InputMaker