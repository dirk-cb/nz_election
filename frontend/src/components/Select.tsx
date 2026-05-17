
//import { useState } from "react";


interface SelectOption {
    value: string;
    label: string;
};


export const Select = ({label="", options, className="", func}:{label:string, options: SelectOption[], className:string, func:Function}) => {

    const optionList = options.map((val)=>
        <option key={val?.value} value={val?.value}>{val?.label}</option>
    )
    return (
        <div className={`flex flex-col ${className}`}>
            <label className="font-bold text-sm ml-1">{ label } </label>
            <select className="bg-blue-100 rounded-lg p-1  " onChange = {(e)=>func(e.target.value)}>
                { optionList }
            </select>
        </div>
    ) 
};