import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Alert, Button } from 'react-bootstrap';
import Keyboard from "../Components/Keyboard";
import WeighingLog from "../Components/WeighingLog";
import style from "../css/EditLahetusLine.module.css"
import Scales from "../Components/Scales";

function EditLahetusLine () {
    const {LahetusSerNr, lineNr}  = useParams();
    const navigate = useNavigate();
    const lineToEdit =(JSON.parse(sessionStorage.getItem("lineToEdit"))||{});
    const [weigthing, setWeigthing] = useState([]);
    const [isScales, setIsScales] = useState(true);
    const sumRef = useRef();
    
    const cleanAndUp = () => {
        const olol = JSON.parse (sessionStorage.getItem("lahetus"));
        olol.line[lineNr].Done=weigthingSum();
        console.log ("olol.line[lineNr].Done", olol.line[lineNr].Done);
        console.log ("olol.", olol);
        sessionStorage.setItem ("lahetus", JSON.stringify(olol));



        sessionStorage.removeItem("lineToEdit");
        navigate (`/lahetused/${LahetusSerNr}`);
    }

    useEffect(() => {
        return () => {
            sessionStorage.removeItem("lineToEdit");
            navigate (`/lahetused/${LahetusSerNr}`);
        }
    }, []);
    useEffect(() => {
        sumRef.current.value = weigthingSum();
    }, [weigthing]);

    const weigthingSum = ()=>{
        let WSum = 0;
        weigthing.map(s=> WSum += Number(s));
        return WSum;
    }

    if (Object.keys(lineToEdit).length === 0 || !(lineToEdit.line["@attributes"].rownumber === lineNr &&String(lineToEdit.lineNo) ===lineNr)){
        setTimeout( () => cleanAndUp(), 15000);
        return (
            <>
                <Alert variant="danger">ANDMED VIGASED</Alert>
                <button onClick={cleanAndUp}>Lähetusele</button>
            </>
        )}
            
    return ( 
        <>
        <h1>EditLahetusLine</h1>
        Lähetuse nr:{LahetusSerNr} Rea nr:{lineNr}<br />
        <div>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div>
            <span className="choosMetodBox">
                <Button className={style.choosMetodButton} onClick={()=>setIsScales(true)}>Kaalu</Button>
                <Button className={style.choosMetodButton} onClick={()=>setIsScales(false)}>Sisesta</Button>
            </span>
            <span>Kokku: 
                <input ref={sumRef} readOnly/>
            </span>
        </div>
        <div>
            {isScales?<Scales WeigthingPR={setWeigthing}/>
                     :<Keyboard WeigthingPR={setWeigthing}/> 
            }
        <WeighingLog weigthing={weigthing} WeigthingPR={setWeigthing}/>
        </div>
        

        
        <button onClick={cleanAndUp}>Lähetusele</button>
        
        </> 
    ); 
}

export default EditLahetusLine;