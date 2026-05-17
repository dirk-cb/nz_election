import { useState } from 'react';
import { Header } from './components/Header';
import { Content } from './components/Content';


const App = () => {

  const [page, setPage] = useState("Map");

  return (
    <div className="flex flex-col h-dvh bg-blue-100">
      <Header setPage={setPage} page={page}/>
      <Content page={page} />
    </div>
  )
};



export default App;
