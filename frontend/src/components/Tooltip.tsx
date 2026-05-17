import { PartyVoteResultsTableFormat } from "../services";
import { Table } from "./Table";

export const Tooltip = ({x, y, electorate, showTooltip}: {x: number, y: number, electorate:string, showTooltip:boolean}) => {

    const partyVote2023 = PartyVoteResultsTableFormat[electorate];
    // To render above or below the cursor based on the cursor pos
    // If tooltip is hidden then don't recalc
    const offset_direction = (window.innerHeight / 2 > y) || !showTooltip ? 20 : -440;

    return (
        <div 
            className="fixed z-50 bg-gray-200 p-2 shadow-xl px-4"
            style={
                { left: x + 20, top: y + offset_direction }
            }
        >
            <h1 className="text-2xl italic font-semibold" >{ electorate } </h1>
            {showTooltip && <div className="w-70"><Table data={partyVote2023} cols={["Party", "Percent", "Count"]} className="w-70"/></div>}
        </div>
    )
};