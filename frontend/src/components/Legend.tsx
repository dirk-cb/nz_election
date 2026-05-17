import { range } from "d3-array";
import { memo } from "react";

 interface LegendInfo {

    type: "Normal"
    min: number
    max: number
    name: string
    colourScale: Function
    notPct?: boolean
    isMoney?: boolean

}

 interface LegendInfoBivar {

    type: "Bivariate"
    X: string
    Y: string
    minX: number
    maxX: number
    colourScale: Function
    minY: number
    maxY: number
    notPct?: boolean
    isMoney?: boolean

}


export const Legend = memo(({type, legendInfo, isShowing}:{type:"ColourScale", legendInfo: LegendInfo | LegendInfoBivar, isShowing: boolean}) => {

    let toDisplay = <></>

    if (legendInfo.type === "Normal") {

        let legend = [<div key={-1}></div>];

        if (type === "ColourScale") {
            // Do code

                const step = (legendInfo.max - legendInfo.min) / 4;

                if (legendInfo.colourScale) {
                    legend = range(5)
                        .map((_,i)=>legendInfo.min + (step * i))
                        .map((v)=>legendInfo.colourScale(v))
                        .map((v, i)=><div key={i} className="flex-1 h-5" style={{ backgroundColor: v }}></div>)
                } 


            toDisplay = <>
                <div className="text-md font-medium italic">{legendInfo.name || "Test Field"}</div>
                <div className="flex justify-between text-xl font-medium italic">
                    <p>{legendInfo.isMoney && "$"}{legendInfo.min.toLocaleString()}{legendInfo.notPct || "%"}</p>
                    <p>{legendInfo.isMoney && "$"}{legendInfo.max.toLocaleString()}{legendInfo.notPct || "%"}</p>
                </div>
                <div className="flex">{ legend }</div>
            
            </>
        }

    } else if (legendInfo.type === "Bivariate" ) {


        let legend: any = [<div key={-1}></div>];



        const stepX = (legendInfo.maxX - legendInfo.minX) / 3;
        const stepY = (legendInfo.maxY - legendInfo.minY) / 3;


        const stepsX = range(4).map((_,i)=>legendInfo.minX + (stepX * i))
        const stepsY = range(4).map((_,i)=>legendInfo.minY + (stepY * i))

        const allSteps = stepsX.map(vX => stepsY.map(vY=>[vX, vY]));


        const getSquares = allSteps.map((x, i)=>{

            return <div key={i} className="flex flex-col w-8 h-32 ">
            
            {x.map((v, j)=>{

                let borderOptions = ""

                if (i == 0) {
                    borderOptions += " border-l-2 "
                }

                if (j == 0) {
                    borderOptions += " border-t-2 "
                }
                const colour = legendInfo.colourScale(v[0], v[1]);
                return <div key={ j } className= {`flex-1 h-5 border-solid  ` + borderOptions} style={{ backgroundColor: colour}}>&nbsp;</div>

            })}</div>;

        });

        // rotate-225

        legend = (
        <div className="m-10 rotate-225 pb-10">
            <div className="rotate-180 text-center">% {legendInfo.X}</div>
            <div className="flex">
                <div className=" flex-1 text-center" style={{writingMode: "vertical-rl"}}>{legendInfo.notPct || "%"} {legendInfo.Y.slice(0,18)}</div>
                <div className="flex flex-6">{getSquares}</div>
            </div>
        </div>)

        

        toDisplay = <>
            <div className="flex">{ legend }</div>
        </>
    }

    
    return (
        <div className={`absolute bottom-0  m-15 z-10 bg-blue-300 p-5 text-gray-900 w-1/8 shadow-md/50 ${isShowing ? "right-[30%]" : "right-0"}`}>
            <h1 className="font-bold italic text-2xl mb-2">Legend</h1>
            { toDisplay }
        </div>
    )
});