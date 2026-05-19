import React from "react";
import styles from "./Verdura.module.css";

type Props ={
    name:string
    isDone :boolean
    btnClick :  (name:string) => void
}

export const Verdura:React.FC<Props> =({name,isDone,btnClick})=>{
    return <React.Fragment>
    <li className={isDone ? styles.cocinada : styles.cruda}>
        <button onClick ={()=>{btnClick(name)}}>{name}</button>
    </li>
    </React.Fragment>
}
