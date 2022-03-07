import {
  Card,
  CardMedia,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import React from "react";
import "./GoodsItem.scss";
import noImg from "../../static/images/no-image.png";
import { useHistory } from "react-router-dom";

function GoodsItem({
  good,
  userID,
  name = "",
  price = "",
  img,
  preview = false,
  onBuyGoodClick,
  authUserID,
  openSnackbar,
}) {
  const onBuyBtnClick = (e) => {
    e.preventDefault();
    onBuyGoodClick({ ...good, customerID: authUserID });
    openSnackbar("You buy this good !");
  };

  const hist = useHistory();

  return (
    <Card
      className={`goods_item ${preview ? "preview" : ""}`}
      sx={{ width: 270, borderRadius: 5 }}
      onClick={() => hist.push(`/home/goods/ad/${good.id}`)}
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
              style={{ marginBottom: 5 }}
              variant="h6"
              component="div"
              data-testid="goodName"
            >
              {name.length > 13 ? `${name.slice(0, 13)}...` : name}
            </Typography>
            <Typography
              style={{ textAlign: "left" }}
              variant="body1"
              color="text.secondary"
              data-testid="goodPrice"
            >
              ${price}
            </Typography>
          </div>
          <div className="goods_item_contentRight">
            <Button
              variant="contained"
              style={{ backgroundColor: "green" }}
              disabled={authUserID === userID}
              onClick={onBuyBtnClick}
            >
              Buy
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default GoodsItem;
