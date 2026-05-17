
import { Select } from "./Select";
import { BivarDemographic2Options, PoliticalPartyList } from "../services"



export const SidebarTrends = ({setDemographics}: {setDemographics: any}) => {



    const politicalPartyVoters = PoliticalPartyList.map((v)=>{
        return {value:v, label:"% " + v + " (2023)", isPct: true}
    });

    return (<>
            
        <div className={`bg-blue-300 w-[20vw] p-5 flex flex-col text-xl text-gray-900 shadow-2xl/50`}>
            <div>
                <div className="flex justify-between mb-5" >
                    <h2 className=" font-bold italic">Options</h2>
                    
                </div>

                <Select 
                    label="Political Vote" 
                    className="my-3" 
                    options={politicalPartyVoters} 
                    func={(val: string) => setDemographics((prev: any)=>{
                        return {...prev, demographic1: val}
                    })} 
                />
                <Select 
                    label="Demographic" 
                    className="my-3" 
                    options={BivarDemographic2Options} 
                    func={(val: string) => setDemographics((prev: any)=>{
                        return {...prev, demographic2: val}
                    })} 
                
                />

            </div>
        </div>
       

   
    
    </>) 
};