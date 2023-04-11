import { FaRegCheckCircle } from "react-icons/fa"


const InputMaker = ({value, showInputEle, handleChange, handleBlur, classStyle, validation, inputReference}) =>{


    return(
        <>
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
                        className={`${validation} w-3/4`}
                        autoFocus
                    />
                    <div className={`${validation.opacity === true ? 'opacity-100': 'opacity-0'} duration-500 transition-all p-4 bg-green-500 absolute -bottom-7 mx-auto left-0 right-0 drop-shadow-lg rounded-md w-auto md:w-80`}>
                        {
                            validation.type === true ?
                                <div className="flex items-center">
                                    <FaRegCheckCircle className="mr-2"/>{validation.message}
                                </div>
                            :null
                        }
                    </div>
                </>
                
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