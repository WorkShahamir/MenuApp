import { useState } from "react";
import { DishForm } from "../../components/dishForm/dishForm";
import { IDish } from "../../types";
import axiosApi from "../../axiosApi";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const DishPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const addDishHandler = async (dishData: Partial<IDish>) => {
        setLoading(true);
        try {
            const dishToSave = {
                name: dishData.name || "",
                price: dishData.price || 0,
                description: dishData.description || "",
            };
            await axiosApi.post("/dishes.json", dishToSave);
            navigate("/");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading && <CircularProgress />}
            <DishForm onSubmit={addDishHandler} />
        </div>
    );
};

export default DishPage;