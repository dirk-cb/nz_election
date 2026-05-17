import { createContext, useContext, useState, useEffect } from "react";
import { getMapData } from "../services/";

interface AppData {
  census: any[];
  elecorate_vote: any[];
  electorateInfo: any[];
  general: any[];
  maori: any[];
  party_vote: any[];
}

interface DataContextType {
  data: AppData | null;
} 

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider = ({ children }: { children: any }) => {

  const [data, setData] = useState<AppData | null>(null);

  useEffect(() => {
    getMapData()
      .then(setData);
  }, []);

  return (
    <DataContext.Provider value={{ data }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("Error, invalid context");
  return ctx;
};