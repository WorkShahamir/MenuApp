import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosApi from "../../axiosApi";
import { IDish, IDishesList } from "../../types";
import DishCard from "../../components/dishCard/dishCard";
import { CircularProgress, Grid, Button } from "@mui/material";

const Home: React.FC = () => {
    const [dishes, setDishes] = useState<IDish[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                setLoading(true);
                console.log("➡ Отправляю запрос к Firebase...");

                const response = await axiosApi.get<IDishesList | null>("/dishes.json");

                console.log("✅ Ответ от Firebase:", response.data);

                const dishesData = response.data ?? {};

                if (Object.keys(dishesData).length === 0) {
                    console.warn("⚠ В базе данных пусто!");
                    setDishes([]);
                    return;
                }

                const newDishes: IDish[] = Object.keys(dishesData).map((key) => ({
                    id: key,
                    ...dishesData[key],
                }));

                console.log("📌 Преобразованные данные:", newDishes);
                setDishes(newDishes);
            } catch (error) {
                console.error("❌ Ошибка при загрузке блюд:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDishes();
    }, []);

    return (
        <div>
            <h1>Главная страница</h1>

            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <Button variant="contained" color="primary" onClick={() => navigate("/add-dish")}>
                    ➕ Добавить блюдо
                </Button>
            </div>

            {loading && <CircularProgress />}

            {!loading && dishes.length === 0 && <p style={{ textAlign: "center" }}>⚠ Нет блюд в базе</p>}

            <Grid container spacing={2}>
                {dishes.map((dish, index) => (
                    <Grid item xs={12} sm={6} md={4} key={dish.id || index}>
                        <DishCard dish={dish} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Home;
