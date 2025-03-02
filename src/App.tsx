import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import DishDetail from "./pages/dishDetail/dishDetail";
import EditDish from "./pages/editDish/editDish";
import DishPage from "./pages/dishPage/dishPage";

console.log("App загружен");

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dishes/:id" element={<DishDetail />} />
                <Route path="/dishes/:id/edit" element={<EditDish />} />
                <Route path="/add-dish" element={<DishPage />} />
            </Routes>
        </Router>
    );
}

export default App;
