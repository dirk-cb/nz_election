
import { Map } from "./Map";
import { Loading } from "./Loading";
import { Trends } from "./Trends";
import { useData } from "../context/DataContext";

export const Content = ({page}: {page: string}) => {

  const { data } = useData(); 
  
  return (
  <>
    <div className={`flex-1 min-h-0 flex relative ${page !== "Map" ? "hidden" : ""}`}>
      {!data && <Loading />}
      {data && <Map mapData={data} />}
    </div>
    <div className={`flex-1 min-h-0 flex relative ${page != "Trends" ? "hidden" : ""}`}>
      <Trends />
    </div>
    </>
    
  )
};