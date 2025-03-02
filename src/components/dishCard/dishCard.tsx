import { Card, CardContent, Typography } from "@mui/material";
import { IDish } from "../../types";
import { useNavigate } from "react-router-dom";

interface Props {
    dish: IDish;
}

const DishCard: React.FC<Props> = ({ dish }) => {
    const navigate = useNavigate();

    return (
        <Card
            sx={{ maxWidth: 345, cursor: "pointer", margin: 2 }}
            onClick={() => navigate(`/dishes/${dish.id}`)}
        >
            <CardContent>
                <Typography variant="h5">{dish.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                    Цена: {dish.price} сом
                </Typography>
            </CardContent>
        </Card>
    );
};

export default DishCard;
