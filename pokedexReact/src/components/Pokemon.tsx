import React from "react";


type Props ={
    name:string
    type:string
    btnClick:(name:string)=>void
}

export const POKEMON:React.FC<Props> =({name,type,btnClick})=>{
    return <React.Fragment>
    <li >{name+type}</li>
    <button onClick ={()=>{btnClick(name)}}>{name}</button>
    </React.Fragment>
}
