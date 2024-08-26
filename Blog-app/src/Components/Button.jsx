import React from 'react'

const Button = ({children, styles='', ...props}) => {
  return (
    <button className={`${styles}`} {...props}>
        {children}
    </button>
  );
}

export default Button
