export function RepearSHVc(data) {
    if (!data.length){
        let arr = [];
        arr.push(data);
        data = arr;
    }
    data.map( el => {
        /* TotWeight bug cleanup */
        if (typeof( el.TotWeight)==="object") el.TotWeight ="0";
        /* Rows to the same standard */
        el.line = []
        if (el.rows.row.length) {
            el.line = el.rows.row;
        } else {
            el.line.push(el.rows.row);
        }
        /* */
        el.isLines= false;
    });

    return data.slice();  
}