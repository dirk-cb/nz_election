//import { PartyVoteResults } from "../services";


export const Table = ({data, cols, className}: {data:any, cols:string[], className:string}) => {


    const formatValue = (column: string, val: number) => {
        
        if (column === "Percent" && val) return val.toFixed(2) + "%";
        else if (val) return val.toLocaleString();

        return "";
    }

    return (
        <table className={`my-2  ${className} `}>
                <thead className="italic bg-blue-600 text-blue-100">
                    <tr>
                    {
                        cols.map((col, i)=><th key={i} className="py-1">{col}</th>)
                    }
                    </tr>
                </thead>
                <tbody >

                    {
                        data.map((row: any, i: number)=>
                        <tr key={i} className="even:bg-gray-100 odd:bg-gray-300">

                            {
                                cols.map((col, j)=>
                                <td key={j} 
                                    className={
                                        `text-left
                                         p-1 ${row[cols[0]] == "Total" ? "font-semibold" : ""}
                                         ${Number(row[col]) === row[col] ? "text-right" : ""}
                                        `
                                    }
                                
                                >
                                    { j == 0 && <span style={{backgroundColor:row.Colour}}>&nbsp;&nbsp;</span>} {formatValue(col, row[col])}
                                </td>)
                            }
                            
                        </tr>
                        )

                    }

                </tbody>
            </table>

    )
}