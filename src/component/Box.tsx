import React from "react";
import './box.css'

export default function Box(props:any){

    const {click, id, name, box} = props

    return(
        <>
            <div>
                <input type="button" id={id+1} name={name} className={`box ${box===true ? "text-info" : box === false && "text-danger"}`} onClick={click} 
                />

            </div>
        </>
    )
}