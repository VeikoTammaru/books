import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import config from "../Data/config.json";
import { RepearSHVc } from "../functions/RepearSHVc";
import "../css/EditLahetus.css";
import { Alert } from "react-bootstrap";

function EditLahetus(props) {
    const [list, setList] = useState([]);
    const {LahetusSerNr}  = useParams();
    
    const navigate = useNavigate();
    

    useEffect(() => {
        const booksUrl = config.booksUrl +'/SHVc.php?SerNr='+LahetusSerNr+'&r='+Math.random();
        fetch (booksUrl)
            .then(response => response.json())
            .then (res =>{
               let data = res.SHVc;
//               console.log("data",data);
               setList(RepearSHVc(data)[0]);
           });
            
    }, [LahetusSerNr]);
    
    const editLine = ix =>{
     //   console.log("EditLahetusLine", LahetusSerNr, ix);
     //   console.log("list",list);
        const lineToEdit ={"line":list.line[ix], "SerNr":list.SerNr, "lineNo": ix }
        sessionStorage.setItem("lineToEdit", JSON.stringify(lineToEdit));
        navigate (`/lahetused/${LahetusSerNr}/${ix}`);
    }
    return (  
        <>
        {list.length === 0?
            <>  <Alert variant="danger">
                    Laadimine ebaõnnestus/pole veel jõudnud
                </Alert>
                <Alert variant="dark">
                    TODO : eristada mitte jõudmine ja ebaõnnestumine;
                </Alert>
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
            </>
        }
        </>
    );
}

export default EditLahetus;