import './App.css';
import {Route, Routes} from "react-router";
import Layout from "../../router/Layout";
import HomePage from "../../pages/HomePage";
import UpdatePage from "../../pages/UpdatePage";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Layout/>}>
        <Route index element={<HomePage/>}/>
        <Route path={"update"} element={<UpdatePage/>}/>
      </Route>
    </Routes>
  );
}

export default App;
