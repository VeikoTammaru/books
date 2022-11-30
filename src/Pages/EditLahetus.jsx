import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Alert, Button } from "react-bootstrap";
import Countdown from "react-countdown";
import config from "../Data/config.json";
import { RepearSHVc } from "../functions/RepearSHVc";
import "../css/EditLahetus.css";
import style from "../css/Lahetused.module.css";


function EditLahetus() {
    const [list, setList] = useState([]);
    const {LahetusSerNr}  = useParams();
    const navigate = useNavigate();
    const [debug, setDebug] = useState("");

    /* fetch control */
    const fetchControlDefault ={"isErr": false, "errMes":"", "isRet":false, "date": Date.now() - config.booksTime-10};
    const [fetchControl, setFetchControl]=useState (fetchControlDefault);
    if(fetchControl.isErr) setTimeout(()=>setFetchControl(fetchControlDefault), config.errorDuration);
    
    const fechLahetus = () =>{
        const booksUrl = '/SHVc.php?SerNr='+LahetusSerNr+'&r='+Math.random();
        setFetchControl({...fetchControlDefault, "isRet":true, "booksUrl":booksUrl, "date": Date.now()});
        fetch (config.booksUrl + booksUrl)
            .then(response => response.json())
            .then (res =>{
                if (res.SHVc) {
                    setFetchControl({...fetchControlDefault});
                    let data = res.SHVc;
                    setList(RepearSHVc(data)[0]);
                } else {
                    console.log("res", res);
                    if (res.Error){
                        setFetchControl({...fetchControlDefault,  "isErr": true, "errMes":res.Error})
                    } else {
                        setFetchControl({...fetchControlDefault,  "isErr": true, "errMes":"Vastuses ei olenud korrektseid andmeid"})
                    }
                    setList([]);
                }
           })
           .catch (err=>{
                    console.log(err);
                    setFetchControl({...fetchControlDefault,  "isErr": true, "errMes":"catch: " + err });
                    setList([]); 
           });
    }
    const saveToSS = () =>{
        sessionStorage.setItem("lahetus", JSON.stringify(list));
        //TODO - lisa timestamp 
    }

    const makeListObjekt = () =>{
        
        const existingObj= JSON.parse(sessionStorage.getItem ("lahetus"));
        console.log("makeListObjekt",existingObj);
        if (!existingObj) {
            fechLahetus();
            if (list===[]){
                setDebug("Lähetuste toomine ebaõnnestus");
                setTimeout (()=>navigate ("/lahetused"),config.errorDuration);
            }
        }
        setList(existingObj);

            // doto kontrolli timestamp
            // doto kontrolli andmed
        
    }
    
    useEffect(() => {
        
        makeListObjekt();

    }, [LahetusSerNr]);
    
    const editLine = ix =>{ // GOTO - ühe toote täitmisele
        const lineToEdit ={"line":list.line[ix], "SerNr":list.SerNr, "lineNo": ix }
        sessionStorage.setItem("lineToEdit", JSON.stringify(lineToEdit));
        navigate (`/lahetused/${LahetusSerNr}/${ix}`);
    }

    const LahetusDone = () =>{ // GOTO - salvesta lähetus ja lähetuste nimekirja
        setDebug(
            <>
            <br /> TODO: Valimis funktsioon
            <br /> - salvesta booksi
            <br /> - salvesta staatus 'Lõppenud' - DB backend puudu :-(
            </>
        );
       // setTimeout (()=>navigate ("/lahetused"),config.errorDuration);
       saveToSS();
    }

    const LahetusCancel = () => { // GoTO hoiatus + lähetuste nimekiri
        setDebug(
            <>
            <br />TODO: Valimis funktsioon
            <br />- kontrolli kas on tehtud muudatusi
            <br />- kui on siis hoiatus lahkumiseks
            </>
        );
        setTimeout (()=>navigate ("/lahetused"),config.errorDuration);
    }

    console.log(list);
    console.log(debug);
    return (
        <>
        {fetchControl.isRet && 
        <Alert variant="info">
            <img src="/img/refresh.png" className={style.buttonImgRotate} alt="refresh" />
            <Countdown date={fetchControl.date  + config.booksTime} />
            <p><b>{fetchControl.booksUrl}</b></p>
        </Alert>
        }

        {fetchControl.isErr && <Alert variant="danger">{fetchControl.errMes}</Alert>}
        
        {debug!=="" && <Alert>
            <img src="/img/to-do.png" className={style.buttonImg} alt="TODO"/>
                {debug}
        </Alert>}

        {list.length === 0 ?
            <>
                {!fetchControl.isRet && 
                <>
                <button onClick={fechLahetus}>fechLahetus</button>
                <button onClick={makeListObjekt}>makeListObjekt</button>
                </>
                }
            </>  
        :   <>
            <div className="head">
                <span>{list.SerNr}</span>
                <span>{list.ShipDate}</span>
                <span>{list.Addr0}</span>
                <span>{list.SerNr}</span>
                </div>
                {list.line.map((el, ix) => 
                    <div key={ix} className="lines" onClick={() =>editLine(ix)}>
                        
                        <span className="ArtCode">{el.ArtCode}</span>
                        <span className="Spec">{el.Spec}</span>
                        <span className="InStock">{el.InStock}</span>
                        <span className="Ordered">{el.Ordered}</span>
                        <span className="Done">{el.Done?el.Done:0}</span>
                    </div>
                )} 
                <Button onClick = {LahetusDone}>Sisesta</Button>
                <Button onClick = {LahetusCancel}>Tühista</Button>
            </>
        }
        </>
    );
}

export default EditLahetus;