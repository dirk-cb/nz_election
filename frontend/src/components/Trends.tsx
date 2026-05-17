
import { useState} from "react";

import { SidebarTrends } from "./SidebarTrends";
import { Scatterplot } from "./Scatterplot"
import { getScatterData } from "../services";

interface BivariateDemographic {
    demographic1: string
    , demographic2: string
}


export const Trends = () => {

    const [demographics, setDemographics] = useState<BivariateDemographic>(
        {
            demographic1: "National"
            , demographic2: "Median Household Income"
        }
    );

    const demographicWithPercent = () => {
        
        if (demographics.demographic2.includes("Mean") || demographics.demographic2.includes("Median")) return demographics.demographic2;

        return "% " + demographics.demographic2;
    };


    
    const data = getScatterData(demographics.demographic1, demographics.demographic2)

    const formatDemographicTitle = () => {


        let returnStr = "% of " + demographics.demographic1 + " voters in the 2023 election vs ";


        returnStr = returnStr + demographicWithPercent() + " for each electorate"

        return returnStr;

        //return  demo ? (demo.includes("Median") || demo.includes("Mean")) : "% of " + demo;
    }


    return (<>
        
        <SidebarTrends setDemographics={setDemographics}  />
        
        <div className="text-3xl flex flex-col w-[100%] justify-center">

            <div className="h-[65vh] flex items-center justify-center"> 
                <Scatterplot 
                    title={formatDemographicTitle()}
                    labelX={"% " + demographics.demographic1 + " voters"}
                    labelY={demographicWithPercent()}
                    data={data}
                />
            </div>
        </div>

    </>)
};