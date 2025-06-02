import Forms from "./components/forms";
import Navbar from "./components/navbar";
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";



function App(){
   return (
   <Router>
   <Navbar/>

   
   <Routes>
      <Route path="/" element={<Forms/>}> </Route>
      


   </Routes>

</Router>


   );

}

export default App;