import Sidebar from "./Components/Sidebar/Sidebar";
import Main from "./Components/Main/Main";
import { Routes, Route } from "react-router";
import Result from "./Components/Main/Result";


const App = () => {

  return (
    <div className="min-h-screen flex root">
      <div className="hidden sm:block">

      <Sidebar />
      </div>
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/:prompt" element={<Result />} />
      </Routes>
    </div>
  );
};

export default App;
