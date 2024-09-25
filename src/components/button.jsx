/* eslint-disable react/prop-types */
import React from 'react'

//button,text-white,'' are all default values
//...props -> all other props sent are also spread
function Button({ children, type = 'button', textColor = 'text-white', classname = '', ...props }) {
    return (
        <button
        className={`px-4 py-2 rounded-lg ${type} ${textColor} ${classname} `} 
        {...props}  //spread the rest of the props(attributes) to the button tag
        >
            
            {children}
        
        </button>
    )
}


export default Button