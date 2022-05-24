import React from "react";

function Square(props){

    function handleClick(){
        props.onClick()
    }
    return <div>
        <button className="square" onClick={handleClick}>{props.value}</button>
    </div>
}

export default Square;