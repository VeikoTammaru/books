
import { useRef } from "react";
import { Button } from "react-bootstrap";
import style from "../css/Keyboard.module.css"
function Keyboard({WeigthingPR}) {
    const displayRef = useRef();

    const makeLogEntery = ()=>{
        WeigthingPR(arr => {
            arr.push(displayRef.current.value);
            displayRef.current.value ="";
            return arr.slice();

        })
    }

    const pressKey = key =>{
        switch (key){
            case "B":
                const str = displayRef.current.value;
                displayRef.current.value = str.substring(0, str.length-1);
                break;
            case "E":
                makeLogEntery();
                break;
            default :
                displayRef.current.value += key;
        }
       
       
       

       
    }
    return (  
        
        <span className={style.keyboardBox}>
        <input ref={displayRef}/>
        
        <Button onClick={()=>pressKey("B")}>B</Button>
        <Button onClick={()=>pressKey("7")}>7</Button>
        <Button onClick={()=>pressKey("8")}>8</Button>
        <Button onClick={()=>pressKey("9")}>9</Button>
        <Button onClick={()=>pressKey("4")}>4</Button>
        <Button onClick={()=>pressKey("5")}>5</Button>
        <Button onClick={()=>pressKey("6")}>6</Button>
        <Button onClick={()=>pressKey("1")}>1</Button>
        <Button onClick={()=>pressKey("2")}>2</Button>
        <Button onClick={()=>pressKey("3")}>3</Button>
        <Button onClick={()=>pressKey("0")}>0</Button>
        <Button onClick={()=>pressKey(".")}>.</Button>
        <Button onClick={()=>pressKey("E")}>E</Button>
        
        </span>
        
    );
}
export default Keyboard;