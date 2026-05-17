
import { useState, memo } from "react";

import { Select } from "./Select";
import { Checkbox } from "./Checkbox";

import { BivarDemographic2Options } from "../services";



export const Sidebar = memo((
        {
            setFilterRoll
            , setFilterDemographic
            , filterMapType
            , setFilterMapType
            , setFilterBivariateDemographic
            , setShowTooltip
        }:
        {
            setFilterRoll:any
            , setFilterDemographic:any
            , filterMapType: any
            , setFilterMapType: any
            , setFilterBivariateDemographic: any
            , setShowTooltip: any
        }
    ) => {

    const [showSidebar, setShowSidebar] = useState<boolean>(true);

    const collapseSidebar = () => {
        setShowSidebar(!showSidebar);
    }

    const rolls = [
        "General"
        , "Māori"
    ].map((v)=>{
        return {value:v, label:v}
    });

    const viewOptions = [
        "Demographic"
        , "Bivariate Analysis"
    ].map((v)=>{
        return {value:v, label:v}
    });

    const politicalParties = [
        "National"
        , "Labour"
        , "Greens"
        , "ACT"
        , "NZ First"
        , "Māori"
        , "TOP"
        , "Other"
    ]

    const politicalPartyVoters = politicalParties.map((v)=>{
        return {value:v, label:"% " + v + " (2023)", isPct: true}
    });

    const bivarDemographic2Options = BivarDemographic2Options;

    const allOptions = politicalPartyVoters.concat(bivarDemographic2Options);


    // Wasted too much time making the sidebar interactivity

    return (<>

        <div className={`bg-blue-300 w-[20vw] p-5 flex flex-col text-xl text-gray-900 absolute z-10 inset-y-0 shadow-2xl/50
        ${showSidebar ? 'translate-x-0' : '-translate-x-full'} ease-in-out duration-300`}>
            <div>
                <div className="flex justify-between mb-5" >
                    <h2 className=" font-bold italic">Options</h2>
                    <button className="cursor-pointer font-bold " onClick={collapseSidebar}>{"<"}</button>
                    
                </div>
                <Select label="Roll" className="my-3" options={rolls} func={setFilterRoll} />
                <Select label="View" className="my-3" options={viewOptions} func={setFilterMapType} />

                <Select label="Demographic" 
                    className={` my-3 ${filterMapType === "Demographic" ? "flex" : "hidden"}`} 
                    options={allOptions} func={setFilterDemographic} />

               
                <Select label="Political Vote" 
                    className={` my-3 ${filterMapType === "Bivariate Analysis" ? "flex" : "hidden"}`} 
                    options={politicalPartyVoters} func={
                        (value: any)=>setFilterBivariateDemographic((prev: any) => {
                            return {
                                ...prev,demographic1: value 
                        };})} 
                />
                <Select label="Demographic" 
                    className={` my-3 ${filterMapType === "Bivariate Analysis" ? "flex" : "hidden"}`} 
                    options={bivarDemographic2Options} func={
                        (value: any)=>setFilterBivariateDemographic((prev: any) => {
                            return {
                                ...prev,demographic2: value 
                        };})} 
                />
                <Checkbox 
                    label="Show 2023 Results in Tooltip"
                    className=""
                    func={setShowTooltip}
                />


            </div>
        </div>
        <div className={`bg-blue-300 w-[2vw] py-5 flex flex-col text-xl text-gray-900 absolute z-9 inset-y-0 shadow-2xl/50`}>
            <button className={`cursor-pointer font-bold transition-opacity duration-300 delay-300 ${!showSidebar ? 'opacity-100' : 'opacity-0'}`} 
                onClick={collapseSidebar}>
                {">"}
            </button>
        </div>

   
    
    </>) 
});