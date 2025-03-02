import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosApi from "../../axiosApi";
import { IDish } from "../../types";
import {
    Button,
    Card,
    CardContent,
    CircularProgress,
    Typography,
    Box,
} from "@mui/material";

const DishDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [dish, setDish] = useState<IDish | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchDish = async () => {
            try {
                setLoading(true);
                console.log(`➡ Загружаю блюдо с ID: ${id}`);

                const response = await axiosApi.get(`/dishes/${id}.json`);

                console.log("✅ Ответ от Firebase:", response.data);

                if (!response.data) {
                    console.warn("⚠ Блюдо не найдено!");
                    setDish(null);
                    return;
                }

                setDish({ ...response.data, id });
            } catch (error) {
                console.error("❌ Ошибка при загрузке блюда:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDish();
    }, [id]);

    const handleDelete = async () => {
        if (!id) return;
        if (window.confirm("Вы уверены, что хотите удалить это блюдо?")) {
            setDeleteLoading(true);
            try {
                await axiosApi.delete(`/dishes/${id}.json`);
                console.log("🗑 Блюдо успешно удалено");
                navigate("/");
            } catch (error) {
                console.error("❌ Ошибка при удалении блюда:", error);
            } finally {
                setDeleteLoading(false);
            }
        }
    };

    const handleEdit = () => {
        if (id) {
            navigate(`/dishes/${id}/edit`); // Исправленный маршрут
        }
    };

    if (loading) return <CircularProgress />;
    if (!dish) return <Typography style={{ textAlign: "center" }}>⚠ Блюдо не найдено!</Typography>;

    return (
        <Card sx={{ maxWidth: 500, margin: "auto", padding: 2 }}>
            <CardContent>
                <Typography variant="h4">{dish.name}</Typography>
                <Typography variant="body1">{dish.description}</Typography>
                <Typography variant="h6">Цена: {dish.price} сом</Typography>
                <Box sx={{ marginTop: 2, display: "flex", gap: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleEdit}
                        disabled={deleteLoading}
                    >
                        Изменить
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDelete}
                        disabled={deleteLoading}
                    >
                        {deleteLoading ? <CircularProgress size={24} /> : "Удалить"}
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => navigate("/")}
                        disabled={deleteLoading}
                    >
                        Назад
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default DishDetail;