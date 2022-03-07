import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./BigCard.scss";

function BigCard({ title, text, img }) {
  return (
    <Card className="registration_card_item" sx={{ maxWidth: 500 }}>
      <Typography
        style={{ marginTop: 60, marginLeft: 20, marginBottom: 30 }}
        variant="h4"
        component="div"
        data-testid="cardTitle"
      >
        {title}
      </Typography>
      <CardMedia component="img" height="100%" image={img} alt="trade image" />
      <CardContent>
        <Typography variant="body3" color="text.primary" data-testid="cardText">
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default BigCard;
