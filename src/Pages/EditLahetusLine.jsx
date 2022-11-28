import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Alert } from 'react-bootstrap';
import Keyboard from "../Components/Keyboard";
import WeighingLog from "../Components/WeighingLog";


function EditLahetusLine () {
    const {LahetusSerNr, lineNr}  = useParams();
    const navigate = useNavigate();
    const lineToEdit =(JSON.parse(sessionStorage.getItem("lineToEdit"))||{});
    const [weigthing, setWeigthing] = useState([]);
    
    console.log(weigthing);
    const cleanAndUp = () => {
        sessionStorage.removeItem("lineToEdit");
        navigate (`/lahetused/${LahetusSerNr}`);
    }

    useEffect(() => {
        return () => {
            sessionStorage.removeItem("lineToEdit");
            navigate (`/lahetused/${LahetusSerNr}`);
        }
    }, []);
/*
    useEffect(() => {
        setWeigthing(returnevent);
    }, [returnevent]);
*/

    if (Object.keys(lineToEdit).length === 0 || !(lineToEdit.line["@attributes"].rownumber === lineNr &&String(lineToEdit.lineNo) ===lineNr)){
        setTimeout( () => {
            cleanAndUp();
        }, 15000);
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
        <Keyboard WeigthingPR={setWeigthing}  /> 
        <WeighingLog weigthing={weigthing} WeigthingPR={setWeigthing}/>
        </div>
        

        
        <button onClick={cleanAndUp}>Lähetusele</button>
        
        </> 
    ); 
}

export default EditLahetusLine;