import React, { useId } from 'react'

function Select({
    options=[],
    label,
    className='',
    ...props
}, ref) {
    const id = useId();

    return(
    <div className='p-3'>
        {label && <label htmlFor={id} className='text-lg ml-0 mr-auto mb-3'>{label}</label>}

        <select ref={ref} id={id} {...props}>
            {options.map((option) => (
                <option key={option}>{option}</option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select);