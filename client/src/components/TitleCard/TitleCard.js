import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./TitleCard.scss";
import { Link as RoutLink } from "react-router-dom";
import { Button } from "@mui/material";

function TitleCard({ title, text, img }) {
  return (
    <Card className="title_card_item" sx={{ maxWidth: 600 }}>
      <Typography
        style={{ marginTop: 30, marginLeft: 20, marginBottom: 10 }}
        variant="h2"
        component="div"
        data-testid="cardTitle"
        textAlign={"center"}
      >
        {title}
      </Typography>
      <CardMedia component="img" height="100%" image={img} alt="trade image" />
      <CardContent>
        <Typography
          textAlign={"center"}
          variant="h5"
          color="text.primary"
          data-testid="cardText"
        >
          {text}
        </Typography>
        <div className="linksBox">
          <Button
            variant="contained"
            style={{ width: 250, backgroundColor: "blue" }}
          >
            <RoutLink className="linksBox_link reg" to="/registration">
              Registration
            </RoutLink>
          </Button>
          <Button
            variant="contained"
            style={{ width: 250, backgroundColor: "green" }}
          >
            <RoutLink className="linksBox_link log" to="/login">
              Login
            </RoutLink>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default TitleCard;
