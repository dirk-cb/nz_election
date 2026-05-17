
import { useMemo, useRef, useEffect, useState, useLayoutEffect} from "react";
import { Sidebar } from "./Sidebar"
import { Legend } from "./Legend"
import { Tooltip } from "./Tooltip"
import { Path } from "./Path"
import { Profile } from "./Profile";

import { 
    defineZoom
    , updateDisplay
    , updateHover
    , updateClick
    , removeHover
} from "../services";



interface BivariateDemographic {
    demographic1: string
    , demographic2: string
}

export const Map = ({mapData}: {mapData: any}) => {

    /* These need to sent to the Sidebar so filtering can take place*/
    // Which roll to display
    const [filterRoll, setFilterRoll] = useState<"General" | "Māori">("General");
    // Regular or Bivariate analysis, ADD IN RESULTS LATER
    const [filterMapType, setFilterMapType] = useState<"Demographic" | "Bivariate Analysis">("Demographic")
    // Regular analysis filter
    const [filterDemographic, setFilterDemographic] = useState<string>("National");
    // Bivariate analysis filter
    const [filterBivariateDemographic, setFilterBivariateDemographic] = useState<BivariateDemographic>(
        {
            demographic1: "National"
            , demographic2: "Median Household Income"
        }
    );

    const [showTooltip, setShowTooltip] = useState<boolean>(false);


    // Data to determine which kind of legend to render (single or two colours)
    const [legendInfo, setLegendInfo] = useState<any>("General");
    // Mouse position, used to determine which electorate to show on the tooltip / highlight
    const [position, setPosition] = useState<any>({x:0, y:0, show:false, electorate:"", dataVal: 0});


    const [clickedElectorate, setClickedElectorate] = useState<string | null>(null);


    const mapRef = useRef(null); // SVG
    const gRef = useRef<SVGGElement | null>(null); // Main container for paths

    useEffect(() => {
        defineZoom(mapRef.current, gRef.current)
    }, []);

    const pathsGeneral = useMemo(() => {
        return (mapData.general as any)
                .features.map((region: any, i: number) => (    
            <Path 
                onMouseMove={(e)=>{
                    setPosition({x:e.clientX, y:e.clientY, show:true, electorate:region.properties.name, dataVal: e.currentTarget.getAttribute("data-val")});
                    updateHover(e.currentTarget);
                }} 
                onClick={(e)=>{
                    setClickedElectorate(region.properties.name);
                    updateClick(e.currentTarget);

                }}
                region={region} 
                key={i}
                onMouseLeave={(e)=>{
                    setPosition({x:e.clientX, y:e.clientY, show:false , electorate:""});
                    removeHover(e.currentTarget);
                }} 
             />
        ));
    }, []);

    const pathsMaori = useMemo(() => {

        return (mapData.maori as any)
                .features.map((region: any, i: number) => (    
            <Path 
                onMouseMove={(e)=>{
                    setPosition({x:e.clientX, y:e.clientY, show:true, electorate:region.properties.name})
                    updateHover(e.currentTarget);
                    
                }} 
                onClick={()=>setClickedElectorate(region.properties.name)}
                region={region} 
                key={i}
                onMouseLeave={(e)=>{
                    setPosition({x:e.clientX, y:e.clientY, show:false , electorate:""});
                    removeHover(e.currentTarget);
                }} 
            />
        ));
    }, []);

    
    useLayoutEffect(() => {
        if (gRef.current) {
            setLegendInfo(updateDisplay(gRef.current, filterMapType, filterDemographic, filterBivariateDemographic));
        }
    }, [pathsGeneral, pathsMaori, filterMapType, filterDemographic, filterBivariateDemographic]);


    return (<>
        {clickedElectorate && <Profile clickedElectorate={clickedElectorate} setClickedElectorate={setClickedElectorate}/>}
        <Sidebar 
            setFilterRoll={setFilterRoll}
            setFilterDemographic={setFilterDemographic}
            filterMapType={filterMapType}
            setFilterMapType={setFilterMapType}
            setFilterBivariateDemographic={setFilterBivariateDemographic}
            setShowTooltip={setShowTooltip}
        />
        <Legend type="ColourScale" legendInfo={legendInfo} isShowing={clickedElectorate !== null} />
        { position.show && <Tooltip x={position.x} y={position.y} electorate={position.electorate}  showTooltip={showTooltip}/>}


        {
        <div className ="h-full w-full relative select-none" >
            <div className="h-full bg-gray-100 cursor-grab active:cursor-grabbing">
                <svg className="" ref={mapRef} viewBox="0 0 975 610" height="100%" width="100%" > 
                    <g ref={gRef} >
                        <g className={`${filterRoll === "General" ? "block" : "hidden"}`}>{pathsGeneral}</g>
                        <g className={`${filterRoll === "Māori" ? "block" : "hidden"}`}>{pathsMaori}</g>
                    </g>
                </svg>
            </div>
        </div>
        }

    </>)
};