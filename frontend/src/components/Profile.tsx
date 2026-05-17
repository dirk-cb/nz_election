import { getProfileData, PartyVoteResultsTableFormat, ElectorateVoteResultsTableFormat } from "../services";
import { CustomerBar } from "./CustomBar";
import { CustomPie } from "./CustomPie";
import { Table } from "./Table";
import { memo } from "react";





export const Profile = memo(({clickedElectorate, setClickedElectorate}:{clickedElectorate: any, setClickedElectorate: any}) => {

    const profileData = getProfileData(clickedElectorate);
    const partyVote2023 = PartyVoteResultsTableFormat[clickedElectorate]
    const candidateVote2023 = ElectorateVoteResultsTableFormat[clickedElectorate];

    return <div className="absolute right-0 z-15 bg-gray-300 inset-y-0 shadow-2xl/50 w-[30%] overflow-y-auto">

        <div className="font-bold text-gray-100  bg-gray-700  p-3 flex justify-between text-3xl top-0 sticky">
            <h1 className=" italic ">{clickedElectorate}</h1>
            <button className=" shadow-2xl hover:text-red-300 hover:cursor-pointer" onClick={()=>setClickedElectorate(null)}>🗙</button>
        </div>




        <div className="px-10 pt-5  flex flex-col justify-center mb-5 ">
            <h1 className="text-xl italic mb-2 ">2023 Results</h1>
            <h2 className="text-sm font-bold mx-2 mt-1 -mb-2 ">Party Vote</h2>
            {<Table data={partyVote2023} cols={["Party", "Percent", "Count"]} className="mx-2 shadow-xs/30" />}

            <h2 className="text-sm font-bold mx-2 mt-1 -mb-2 ">Candidate Vote</h2>
            {<Table data={candidateVote2023} cols={["Party", "Percent", "Count"]} className="mx-2 shadow-xs/30" />}

            

            <h1 className="text-xl italic my-2">Demographics</h1>

            <div className=" flex flex-row gap-2">
                <div className="grow-1 basis-1">
                    <h2 className="text-sm font-bold  mt-1 ">Median Age</h2> 
                    <div className="text-2xl py-3 mb-2 bg-white shadow-xs/30 rounded-sm text-center"> {profileData.MedianAge} </div>
                </div>
                <div className="grow-1 basis-1">
                    <h2 className="text-sm font-bold  mt-1 ">Unemployment</h2> 
                    <div className="text-2xl py-3  mb-2 bg-white shadow-xs/30 rounded-sm text-center"> {(profileData?.PctUnemployed ?? 0).toFixed(2)}% </div>
                </div>
                <div className="grow-2 basis-1">
                    <h2 className="text-sm font-bold  mt-1 ">Median Household Income</h2> 
                    <div className="text-2xl py-3  mb-2 bg-white shadow-xs/30 rounded-sm text-center"> ${(profileData?.MedianHouseholdIncome ?? 0).toLocaleString() } </div>
                </div>
            </div>
                {profileData && 
                    <CustomerBar 
                    data={profileData.AgeDist} 
                    title={`Age Distribution for ${clickedElectorate}`} 
                    labelX="Age Group"
                    labelY="Count"
                />}

                { profileData && 
                    <CustomPie 
                    data={profileData.Ethnicity} 
                    title={`Ethnicity for ${clickedElectorate}`} 
                />}
            </div>
        </div>
});