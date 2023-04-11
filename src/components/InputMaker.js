import { FaRegCheckCircle, FaRegFrown } from "react-icons/fa"


const InputMaker = ({value, showInputEle, handleChange, handleBlur, classStyle, validation, inputReference}) =>{

    return(
        <div className="block">
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
                        className={`${validation.inputStyle} w-3/4`}
                        autoFocus
                    />
                    {/* {validation.type === true ?
                        <span className={`${validation.opacity === true ? 'opacity-100': 'opacity-0'} duration-500 transition-all text-red-500 mx-auto drop-shadow-lg rounded-md w-full`}>
                            {
                                validation.type === true ?
                                    <div className="flex items-center">
                                        <FaRegCheckCircle className="mr-2"/>{validation.message}
                                    </div>
                                :null
                            }
                        </span>
                        : null
                    } */}
                </>
                
                ) : (
                <>
                    <div className={`w-full break-words ${classStyle}`}>{value}</div>
                </>
            )
        }
        <div className={`flex items-center ${validation && validation.opacity === true ? 'opacity-100': 'opacity-0'} ${validation && validation.inputStyle} duration-500 transition-all`}>
                    {validation && validation.type === true ?
                            <>
                                <FaRegFrown className="mr-2"/>{validation.message}
                            </>
                            : null
                    }
                    </div>
        </div>
    )

}

export default InputMaker