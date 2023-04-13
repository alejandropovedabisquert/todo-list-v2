
const InputMaker = ({value, showInputEle, handleChange, handleBlur, classStyle, inputReference}) =>{

    return(
        <div className="inline-block">
        {
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
                    <p className={`w-full ${classStyle}`}>{value}</p>
                </>
            )
        }        
        </div>
    )

}

export default InputMaker