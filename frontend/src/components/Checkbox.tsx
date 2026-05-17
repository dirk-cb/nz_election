

export const Checkbox = ({label="",  className="", func}:{label:string, className:string, func:Function}) => {

    return (
        <div className={`flex  items-start ${className} `}>
            <label className="font-bold text-sm ml-1">{ label } </label>
            <input type="checkbox"  className="bg-blue-100 rounded-lg ml-2 mt-1 scale-[1.2]" onChange = {(e)=>func(e.target.checked)}>
            </input>
        </div>
    ) 
};