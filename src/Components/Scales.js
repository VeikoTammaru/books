import { useRef } from "react";
import { Button } from "react-bootstrap";
import style from "../css/Keyboard.module.css"
import config from "../Data/config.json"

function Scales({WeigthingPR}) {
    const scalesRef = useRef();
    

    const  weightReading = (reading) =>{
        
        const arr = reading.replace(/\s+/g, " ").split(" ");
        //console.log ("weightReading", arr);
        if(arr.shift()!=="SI") return false;
        let a = arr.shift();
        if(a==="-") {
            return Number(a+arr.shift());
        } else {
            return Number(a);
        }
    }
    
    const scalesReading =() =>{
        //console.log("scalesReading")
        // scalesRef.current.value =  weightReading("SI - 0.06 kg");
        fetch(config.scalesUrl)
        .then(res =>res.json())
        .then(res=>{
            console.log(res);
            scalesRef.current.value=weightReading(res)
        })
    }

    const saveReading = () =>{
        WeigthingPR(arr => {
            arr.push(scalesRef.current.value);
            return arr.slice();
        })
    }
    const takeReading = () =>{
        scalesReading();
    }
    
    //setInterval(() =>  scalesReading(), 1500);
    

    return (  
        <>
        <span className={style.keyboardBox}>
            <input className={style.scalesInput} ref={scalesRef} readOnly/>
            <Button onClick={takeReading}>Kaalu</Button>
            <Button onClick={saveReading}>Fikseeri</Button>
        </span>
        </>
    );
}

export default Scales;