import { useState, useEffect } from "react";
import { DishForm } from "../../components/dishForm/dishForm";
import { IDish } from "../../types";
import axiosApi from "../../axiosApi";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const EditDish = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [dish, setDish] = useState<IDish | null>(null);

    useEffect(() => {
        const fetchDish = async () => {
            setLoading(true);
            try {
                const response = await axiosApi.get(`/dishes/${id}.json`);
                setDish({ id, ...response.data });
            } finally {
                setLoading(false);
            }
        };
        fetchDish();
    }, [id]);

    const editDishHandler = async (updatedDish: Partial<IDish>) => {
        setLoading(true);
        try {
            if (!id) throw new Error("ID блюда отсутствует");
            const dishToSave = {
                name: updatedDish.name || "",
                price: updatedDish.price || 0,
                description: updatedDish.description || "",
            };
            await axiosApi.put(`/dishes/${id}.json`, dishToSave);
            navigate("/");
        } finally {
            setLoading(false);
        }
    };

    if (!dish && !loading) return <p>Блюдо не найдено</p>;

    return (
        <div>
            {loading && <CircularProgress />}
            {dish && <DishForm initialData={dish} onSubmit={editDishHandler} />}
        </div>
    );
};

export default EditDish;