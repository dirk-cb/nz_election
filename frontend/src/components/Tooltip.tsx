import { PartyVoteResultsTableFormat, getBivarDemographicForTooltip, getDemographicForTooltip } from "../services";
import { Table } from "./Table";
import { useMemo, useState } from "react"; 

export const Tooltip = (
    {
        x
        , y
        , electorate
        , showTooltip
        , uniDemographic
        , bivarDemographic
        , currentView
    }: 
    {
        x: number
        , y: number
        , electorate:string
        , showTooltip:boolean
        , uniDemographic:string
        , bivarDemographic: any
        , currentView: string
    }
    ) => {




    const partyVote2023 = PartyVoteResultsTableFormat[electorate];
    // To render above or below the cursor based on the cursor pos
    // If tooltip is hidden then don't recalc

    const [tooltipText, setTooltipText] = useState<string[]>([""])

    // 
    useMemo(()=>{

        if (currentView == "Demographic") {
            // Get current demo info for the electorate

            setTooltipText(getDemographicForTooltip(electorate, uniDemographic));


        }
        else if (currentView == "Bivariate Analysis") {
            // Get current demo info for the electorate
            setTooltipText(getBivarDemographicForTooltip(electorate, bivarDemographic));



        };

    }, [electorate, uniDemographic, bivarDemographic, currentView])

    
    

    const offset_direction = (window.innerHeight / 2 > y) || !showTooltip ? 20 : -440;

    return (
        <div 
            className="fixed z-50 bg-gray-200 p-2 shadow-xl px-4"
            style={
                { left: x + 20, top: y + offset_direction }
            }
        >
            <h1 className="text-2xl italic font-semibold" >{ electorate } </h1>
            { tooltipText.map((r)=><p key={r}>{r}</p>) }
            {showTooltip && <div className="w-70"><Table data={partyVote2023} cols={["Party", "Percent", "Count"]} className="w-70"/></div>}
        </div>
    )
};