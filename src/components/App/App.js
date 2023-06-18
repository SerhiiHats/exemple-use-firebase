import './App.css';
import {Route, Routes} from "react-router";
import Layout from "../../router/Layout";
import HomePage from "../../pages/HomePage";
import UpdatePage from "../../pages/UpdatePage";
import CreateRestaurants from "../../pages/CreateRestaurants";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Layout/>}>
        <Route index element={<HomePage/>}/>
        <Route path={"update"} element={<UpdatePage/>}/>
        <Route path={"createRestaurants"} element={<CreateRestaurants/>}/>
      </Route>
    </Routes>
  );
}

export default App;
