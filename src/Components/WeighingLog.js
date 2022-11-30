import { ListGroup, ListGroupItem } from "react-bootstrap";
import style from "../css/WeighingLog.module.css"

function WeighingLog({weigthing, WeigthingPR}) {
    const deleteLogRow =ix=>{
        weigthing.splice(ix,1);
        WeigthingPR(weigthing.slice());
    }
    
    const printLabel = () =>{
        alert ("TODO Prindi kujundus: -toode -kogus - jne");

    }

    return (  
        <span className={style.logbox}>
        <ListGroup>
            {weigthing.map( (el, ix)=>
                <ListGroupItem key={ix}>
                    {ix}) {el} 
                    <img src="/img/print.png" className={style.rowimg} onClick={()=>printLabel(ix)} alt="print"/>
                    <img src="/img/cancel.png" className={style.rowimg} onClick={()=>deleteLogRow(ix)} alt="cancal"/>
                </ListGroupItem>
            )}
        </ListGroup>
        </span>
    );
}

export default WeighingLog;