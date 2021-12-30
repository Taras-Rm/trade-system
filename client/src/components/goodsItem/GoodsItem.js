import {
  Card,
  CardMedia,
  CardContent,
  Button,
  CardActions,
  Typography,
} from "@mui/material";
import React from "react";
import "./GoodsItem.scss";
import iguana from "../../static/images/iguana.jpg";

function GoodsItem({ name, price }) {
  return (
    <Card className="goods_item" sx={{ maxWidth: 270, borderRadius: 5 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="270"
        image={iguana}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {name}
        </Typography>
        <Typography
          style={{ textAlign: "right" }}
          variant="body1"
          color="text.secondary"
        >
          ${price}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default GoodsItem;
