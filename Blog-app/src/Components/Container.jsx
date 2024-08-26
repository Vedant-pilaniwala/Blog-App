import React from 'react';

const Container = ({children, className=''}) => {
    return(
        <div className={`w-full m-0 ${className}`} >
            {children}
        </div>
    );
}

export default Container