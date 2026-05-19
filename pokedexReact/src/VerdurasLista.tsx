import React, { useState } from "react";
import { Verdura } from "./Verdura";

type Item = {
    name: string;
    isDone: boolean;
    btnClick : (name:string) => void
};

const INITIAL_ITEMS: Item[] = [
    { name: "Zanahoria", isDone:false,btnClick: () => {}},
    { name: "Puerro", isDone: false, btnClick: () => {}},
    { name: "Calabaza", isDone: false,btnClick: () => {}},
    { name: "Cebolla", isDone: false,btnClick: () => {}},
];

export function VerdurasLista(){
    const [items, setItems] = useState(INITIAL_ITEMS);
    
    function changeIsDone(name:string):void{
        setItems(items.map(e=> {
            if(e.name === name){
                return {...e, isDone: true};
            }
            return e;
        }));
    }
    
    return <ul>{
        items.map( verdura => {return <Verdura name = {verdura.name} isDone={verdura.isDone} btnClick={changeIsDone}></Verdura>})
    }</ul>
}
