import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import config from "../Data/config.json"
import style from "../css/Lahetused.module.css";
import { RepearSHVc } from "../functions/RepearSHVc";
import MyOverlayTrigger from "../Components/MyOverlayTrigger";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import et from 'date-fns/locale/et';


function Lahetused() {
    const [list, setList] = useState([]);
/* 
    useEffect(() => {
        fechBooks();
    }, []);
 */
    const fechBooks =() =>{
        const booksUrl = config.booksUrl +'/SHVc.php?r='+Math.random();

        /* fields=SerNr,Addr0,TotWeight,TotQty,ShipDate,ArtCode,Spec,Ordered,InStock,Spec */
        fetch(booksUrl, { 
            method: 'GET'
        })
         .then(response => response.json())
         .then (res =>{
            let data = res.SHVc;
            console.log(data);
            setList(RepearSHVc(data));
        });
    } 
    const openCloseLines = ix =>{
        list[ix].isLines=!list[ix].isLines;
        setList(list.slice());
    }
    /*     const editLines = ix =>{

    } */
    // Todo 
    // ülesse filter  kuupäev / on lahti (books päring) / staatused
    // avame töötluseks 

    
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };
    registerLocale('et', et);
    if (endDate) console.log(endDate.ddmmyyyy())
    return ( 
        <>
        <h1>Lähetuste nimekiri</h1>
        <MyOverlayTrigger 
            myStyle={style.buttonImgRotate} 
            myImgSrc ="/img/refresh.png" 
            myTooltip="Värskenda lähetuste nimekirja!"
            myClick = {fechBooks}
        />
        <span className={style.picerBox}>
            <DatePicker 
                selected={startDate} 
                onChange={onChange} 
                startDate={startDate}
                endDate={endDate}
                selectsRange
                isClearable
                dateFormat="dd.MM.yyyy"
                locale="et"
            />
        </span>
        
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
                        :<>
                        <img src="/img/plus.png" alt="plus" className={style.openCloseRowsImage} onClick={()=>openCloseLines(ix)}/>
                        </>
                        }
                    </span>
                        
                    
                    
                </div>
            )}


            {/* list.map((el, ix) =>
            
                <div className={style.lahetused} key={ix}>
                    
                    <div><label>ShipDate</label>{el.ShipDate}</div>
                    <div><label>Addr0</label>{el.Addr0}</div>
                    <div><label>TotQty</label>{el.TotQty}</div>
                    <div><label>TotWeight</label>{el.TotWeight}</div>
                    { el.read.map((rowsEl, rowIx) =>
                        <>
                            console.log(rowIx)
                            <div className={style.rida} >
                                <span>{rowsEl.ArtCode}</span>
                                <span>{rowsEl.Ordered}</span>
                                <span>{rowsEl.InStock}</span>
                                <span>{rowsEl.Spec}</span>
                            </div>
                        </>
                    )}
                </div>
            ) */}
        
            



        </> 
    );
}

export default Lahetused;