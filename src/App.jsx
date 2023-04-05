import Home from "./pages/Home";
import BlogPost from "./pages/BlogPost";
import Edit from "./pages/Edit";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/post/:id" element={<BlogPost />}></Route>
      <Route path="/edit/:id" element={<Edit />}></Route>
    </Routes>
  );
}

export default App;
