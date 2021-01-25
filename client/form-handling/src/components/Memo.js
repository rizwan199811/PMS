import React from 'react'

function Memo({name}) {
    console.log("Memo Component Rendering");
    return (
        <div>
            <h1>{name}</h1>
        </div>
    )
}

export default React.memo(Memo)
