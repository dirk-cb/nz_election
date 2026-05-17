
export const Header = ({setPage, page}: {setPage: any, page: string}) => {



  return (
     <div className="bg-blue-600 py-6 flex justify-around font-title italic border-b-2 shadow-2xl">
      <h1 className="text-5xl">    
        <span className="text-green-200 font-bold pr-1">NZ </span>
        <span className="text-green-200 font-medium">Electorate Voting Analysis</span>
      </h1>

      <div className="flex text-2xl text-blue-100">
        <a className={`content-end px-4 hover:cursor-pointer ${page === "Map" && "underline"}`} onClick={()=>setPage("Map")}>Map</a>
        <a className={`content-end px-4 hover:cursor-pointer ${page === "Trends" && "underline"}`} onClick={()=>setPage("Trends")}>Trends</a>
        <a className={`content-end px-4 hover:cursor-pointer ${page === "About" && "underline"}`} >About</a>
      </div>


    </div>
  )
};