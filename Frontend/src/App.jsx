
import ToDoPage from "./Pages/ToDoPage";
import { BrowserRouter as  Router, Route,Routes } from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<ToDoPage/>}></Route>
      </Routes>
    </Router>
  )
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <div>Hello world!</div>,
  //   },
  // ]);



 
}

export default App;

2

