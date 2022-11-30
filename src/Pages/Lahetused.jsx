import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import config from "../Data/config.json"
import style from "../css/Lahetused.module.css";
import { RepearSHVc } from "../functions/RepearSHVc";
import MyOverlayTrigger from "../Components/MyOverlayTrigger";
import DatePicker from "react-datepicker";
import { registerLocale } from  "react-datepicker";
import et from 'date-fns/locale/et';
import Countdown from "react-countdown";
import { Alert, Image } from "react-bootstrap";

function Lahetused() {
    
    const [list, setList] = useState([]);
    const OKFlagIsFalseRef = useRef();
    const [startDate, setStartDate] =  useState(new Date());
    const [endDate, setEndDate] =  useState(new Date());
    const [debug, setDebug]= useState("");
    console.log(new Date(), startDate);
    
    /* fetchControl */
    const fetchControlDefault ={"isErr": false, "errMes":"", "isRet":false, "date": Date.now() - config.booksTime-10};
    const [fetchControl, setFetchControl]=useState (fetchControlDefault);
    if(fetchControl.isErr) setTimeout(()=>setFetchControl(fetchControlDefault), config.errorDuration);
    
    useEffect(() => {
        const startDateSS = JSON.parse (sessionStorage.getItem("startDate"));         if (startDateSS) setStartDate(new Date(startDateSS));
        const endDateSS   = JSON.parse (sessionStorage.getItem("endDate"  ));         if (endDateSS)   setEndDate(new Date(endDateSS));
        OKFlagIsFalseRef.current.checked= JSON.parse (sessionStorage.getItem("startDate"))||false;
    },[]);

    useEffect(() => {
        sessionStorage.setItem("startDate",JSON.stringify(startDate));
        sessionStorage.setItem("endDate",JSON.stringify(endDate));
        sessionStorage.setItem("OKFlagIsFalseRef",JSON.stringify(OKFlagIsFalseRef.current.checked));
        console.log("Kirjutab");
    }, [startDate, endDate]);


    const makeBooksFilter = () =>{
        let filter  ="";
        let s ="&sort=ShipDate"; 
        // s =""; //- Koostab Books API vea
        filter += startDate?s+"&range="+startDate.yyyymmdd():"";
        filter += endDate?":"+endDate.yyyymmdd():"";
        if(OKFlagIsFalseRef.current.checked) { 
            filter +="&filter.OKFlag=false";
        }
        const ret = 
            "&filter="+ encodeURIComponent(filter) + 
            "&fields=SerNr,Addr0,TotWeight,TotQty,ShipDate,ArtCode,Spec,Ordered,InStock,Spec";
        return ret;
    }

    const fechBooks =() =>{
        const booksUrl = config.booksUrl +'/SHVc.php?r='+Math.random()+makeBooksFilter();
        setDebug(booksUrl); 
        setTimeout(()=>setDebug(""), config.booksTime);
        setFetchControl({ "isErr": false, "errMes":"", "isRet":true, "date": Date.now()});

        fetch(booksUrl, { 
            method: 'GET'
        })
            .then(response => response.json())
            .then (res =>{
                const data = res.SHVc;
                if(data){
                    console.log("data", data);
                    setList(RepearSHVc(data)); //TODO setFetchControl -> error kui on vigane data
                    setFetchControl({ "isErr": false, "errMes":"", "isRet":false, "date": Date.now() - config.booksTime-1})    
                } else {
                    console.log("res", res);
                    if (res.Error){
                        setFetchControl({ "isErr": true, "errMes":res.Error, "isRet":false, "date": Date.now() - config.booksTime-1})
                    } else {
                        setFetchControl({ "isErr": true, "errMes":"Vastuses ei olenud korrektseid andmeid", "isRet":false, "date": Date.now() - config.booksTime-1})
                    }
                    setList([]);
                }
            })
            .catch (err=>{
                console.log(err);
                setFetchControl({
                    "isErr": true,
                    "errMes":"catch: " + err  , //TODO: err mingi mess välja tuua
                    "isRet":false, 
                    "date": Date.now()
                });
                setList([]);
            });
    } 

    const openCloseLines = ix =>{
        list[ix].isLines=!list[ix].isLines;
        setList(list.slice());
    }
    
    const onDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    registerLocale('et', et);
   
    return ( 
        <>
            <h1>Lähetuste nimekiri</h1>
            <div>
                <MyOverlayTrigger 
                    //myStyle={reloadClass} 
                    //myImgSrc ="/img/refresh.png" 
                    myTooltip="Värskenda lähetuste nimekirja!"
                    myClick = {fechBooks}
                    myElement ={<Image
                        //ref={ref}
                        roundedCircle
                        src={"/img/refresh.png"}
                        className={fetchControl.isRet ? style.buttonImgRotate : style.buttonImg}
                    />}
                />
                <span className={style.picerBox}>
                    <DatePicker 
                        selected={startDate} 
                        onChange={onDateChange} 
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        isClearable
                        dateFormat="dd.MM.yyyy"
                        locale="et"
                    />
                </span>
                <span className={style.picerBox}>
                <MyOverlayTrigger 
                    myElement={<input type="checkbox" className="" ref={OKFlagIsFalseRef}/>}
                    myTooltip="Valitud -> kinnitamata, Valimata -> Kõik"
                    myClick = {undefined}
                /></span>
                <span className={style.picerBox}>
                    {fetchControl.isRet && <Countdown date={fetchControl.date  + config.booksTime} />}
                </span>
                <button onClick={makeBooksFilter}>Test Button</button>
            </div>
            {debug}<br />

            {fetchControl.isErr && 
                <Alert variant="danger">
                    {fetchControl.errMes}
                </Alert>
            }
            {list.map((el, ix) =>
                <div key={ix} className={style.lahetused}>
                    <div><label>Nr</label>{el.SerNr}</div>
                    <div><label>Kuup</label>{el.ShipDate}</div>
                    <div><label>Saaja</label>{el.Addr0}</div>
                    <div><label>Ühikuid</label>{el.TotQty}</div>
                    <div><label>Kaal kg</label>{el.TotWeight}</div>
                    <span>
                        <span className={style.goToEdit}>
                        <Link to={`/lahetused/${el.SerNr}`}>
                            <img src="/img/edit.png" alt="edit"  />
                        </Link>
                        </span>
                        {el.isLines ?
                        <>
                            <img src="/img/minus.png" alt="plus" className={style.openCloseRowsImage} onClick={()=>openCloseLines(ix)}/>
                            {el.line.map((rowsEl, rowIx) =>
                                <div className={style.rida} key={rowIx} >
                                    <span className={style.ArtCode}>{rowsEl.ArtCode}</span>
                                    <span className={style.Spec}>{rowsEl.Spec}</span>
                                    <span className={style.Ordered}>{rowsEl.Ordered}</span>
                                    <span className={style.InStock}>{rowsEl.InStock}</span>
                                </div>
                             )}
                        </>
                        :<img src="/img/plus.png" alt="plus" className={style.openCloseRowsImage} onClick={()=>openCloseLines(ix)}/>
                        }
                    </span>
                </div>
            )}
        </> 
    );
}

export default Lahetused;