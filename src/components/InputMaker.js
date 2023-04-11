
const InputMaker = ({value, showInputEle, handleChange, handleBlur, classStyle, inputReference}) =>{

    return(
        <div className="inline-block">
        {
            // Use JavaScript's ternary operator to specify <span>'s inner content
            showInputEle ? (
                <>
                    <input 
                        type="text"
                        ref={inputReference}
                        value={value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${classStyle} align-middle w-3/4`}
                        autoFocus
                    />
                </>
                
                ) : (
                <>
                    <div className={`w-full break-words ${classStyle}`}>{value}</div>
                </>
            )
        }        
        </div>
    )

}

export default InputMaker