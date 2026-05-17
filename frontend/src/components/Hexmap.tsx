/*import { useMemo, useRef, useEffect, useState, useLayoutEffect} from "react";
import { select } from "d3-selection";
import electorates from "../data/electorates.json";




export const Hexmap = () => {   



    const gRef = useRef<any>(null);




    const getAucklandPolygon = () => {
        const aucklandElectorates = electorates
            .filter((r)=>r.region == "Auckland")
            .map((r)=>calculate_points(r.col, r.row))
            .reduce((points, r) => [r.points.split(","), ...points], [] )
            .join(",")
            //.flatMap((r: any)=> r)
            //.reduce((r, x)=>[r.points, ...x], []);


        const hexa = <polygon key={100} points={aucklandElectorates} fill="blue" />;

        console.log(hexa)

        return hexa

    }




     useEffect(()=>{
        select(gRef.current).selectAll("polygon").attr("fill", "red");

        getAucklandPolygon()

        const auckland = getAucklandPolygon();

    }
    ,[gRef]);


    //const normalElectorates = electorates.filter((r)=>r.region != "Auckland");

    



    




   

    const OFFSET_X = 400;
    const OFFSET_Y = 30;
    const SIZE = 20;
    const GAP = 1;

    const HEX_W = Math.sqrt(3) * SIZE; 
    const COL_SPACING = HEX_W + GAP  ;
    const ROW_SPACING = (SIZE * 1.5) + GAP ;
    const ROW_OFFSET = COL_SPACING / 2;

    const calculate_points = (col: number, row: number): any => {
        const cx = OFFSET_X + col * COL_SPACING + (row % 2) * ROW_OFFSET;
        const cy = OFFSET_Y + row * ROW_SPACING;

        const points = Array.from({ length: 6 }, (_, i) => {

            const angle = Math.PI / 180 * (60 * i - 30);
            return `${(cx + SIZE * Math.cos(angle)).toFixed(2)},${(cy + SIZE * Math.sin(angle)).toFixed(2)}`;

        }).join(' ');

        return ({cx:cx, cy:cy, points: points});
    };



    return (
        <div className="h-full w-full relative flex justify-center">
            <svg className="bg-yellow-100" viewBox="0 0 975 610" height="100%" width="100%" > 
                <g ref={gRef}>
                {electorates.map((r, i) => {
                    const res = calculate_points(r.col, r.row);
                    const lines = r.nick ? r.nick.split("\n") : [r.name];

                    const font = 6;
                    const lineHeight = font + 1;
                    const startY = res.cy - ((lines.length - 1) * lineHeight) / 2;
                    return (
                        <g key={r.id || i}>
                        <polygon key={r.id || i} points={res.points} fill="none" />
                        <text
                            x={res.cx}
                            y={startY}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize={font}
                        >
                            {lines.map((n, j) => (
                            <tspan key={j} x={res.cx} dy={j * lineHeight}>
                                {n}
                            </tspan>
                            ))}
                        </text>
                        </g>
                    );
                    })}
                </g>
                </svg>
            <div>
            
            </div>
        </div>
    ) 
    
}*/