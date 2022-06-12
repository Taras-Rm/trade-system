import {
  Card,
  CardMedia,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import React from "react";
import "./GoodsItemPreview.scss";
import noImg from "../../../../../static/images/no-image.png";

let startGood = {
  name: "",
  ID: 0,
  price: 0,
}

function GoodsItemPreview({
  img="",
  good = startGood,
  onBuyGoodClick,
  userId
}) {


  return (
    <Card
      className={"goods_item__preview"}
      sx={{ width: 270, borderRadius: 5 }}
    >
      <CardMedia
        component="img"
        alt="main img"
        height="270"
        image={img || noImg}
      />
      <CardContent>
        <div className="goods_item_content">
          <div className="goods_item_contentLeft">
            <Typography
              className="goods_item_contentLeft__name"
              style={{ marginBottom: 5 }}
              variant="h6"
              component="div"
              data-testid="goodName"
            >
              {good.name.length > 13 ? `${good.name.slice(0, 13)}...` : good.name}
            </Typography>
            <Typography
              style={{ textAlign: "left" }}
              variant="body1"
              color="text.secondary"
              data-testid="goodPrice"
            >
              $ {good.price}
            </Typography>
          </div>
          <div className="goods_item_contentRight">
            <Button
              variant="contained"
              style={{ backgroundColor: "green" }}
            >
              Buy
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default GoodsItemPreview;
