/* eslint-disable react/prop-types */
import React, { useId } from 'react';

// The component accepts `options`, `className`, and `label` as props, along with other props through the `...props` rest operator. 
// `ref` is received through `forwardRef` to allow external components to reference the internal `select` DOM element.

function Select({
    options,          
    className = '',  
    label,            
    ...props         
}, ref) {

    const id = useId();

    return (
        <div className='w-full'> 
            {/* If a label is provided, render it  */}
            {label && <label htmlFor={id} className=''>{label}</label>} 

               {/*} - ref={ref}: The ref is forwarded so that the parent component can directly access the select field.
                 */}
            <select
                ref={ref} 
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border-gray-200 w-full ${className}`}
                {...props}
                id={id}
            >
                {/* Dynamically render options from the `options` array. Each `option` is rendered with a key and value. */}
                {options && options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

// `forwardRef` is used to allow the parent component to access the `select` element's ref.
export default React.forwardRef(Select);
