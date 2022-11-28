import { ListGroup, ListGroupItem } from "react-bootstrap";
import style from "../css/WeighingLog.module.css"

function WeighingLog({weigthing, WeigthingPR}) {
    const deleteLogRow =()=>{

    }
    
    const printLabel = () =>{

    }

    return (  
        <span className={style.logbox}>
        <ListGroup>
            {weigthing.map( (el, ix)=>
                <ListGroupItem key={ix}>
                   {ix}) {el} 
                   
                   <img src="/img/print.png" className={style.rowimg}/>
                    <img src="/img/cancel.png" className={style.rowimg}/>
                   
                </ListGroupItem>
            )}
            
        </ListGroup>
        </span>
    );
}

export default WeighingLog;