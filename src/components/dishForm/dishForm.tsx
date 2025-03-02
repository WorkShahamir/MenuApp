import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { IDish } from "../../types";

interface DishFormProps {
    initialData?: IDish; // Для редактирования, с id
    onSubmit: (dish: Partial<IDish>) => void; // Поддерживает и создание, и редактирование
}

export const DishForm: React.FC<DishFormProps> = ({ initialData, onSubmit }) => {
    const [dish, setDish] = useState<Partial<IDish>>(
        initialData || { name: "", price: 0, description: "" } // Без id для создания
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDish({ ...dish, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(dish);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField name="name" label="Название" value={dish.name} onChange={handleChange} required />
            <TextField name="price" label="Цена" type="number" value={dish.price} onChange={handleChange} required />
            <TextField name="description" label="Описание" multiline rows={3} value={dish.description} onChange={handleChange} />
            <Button type="submit" variant="contained">
                {initialData ? "Сохранить изменения" : "Добавить блюдо"}
            </Button>
        </Box>
    );
};