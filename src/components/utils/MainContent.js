import React from "react";

const MainContent = ({children, ...props}) => (
    <div className="main-content" {...props}>
        {children}
    </div>
)

export { MainContent }