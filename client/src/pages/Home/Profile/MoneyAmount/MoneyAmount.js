import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import MyModal from "../../../../components/MyModal/MyModal";
import TopUpAmountForm from "../../../../components/TopUpAmountForm/TopUpAmountForm";
import "./MoneyAmount.scss";
import { validationSchema } from "./utils/validationSchema";

function MoneyAmount({ moneyAmount = 500, topUpAmount }) {
  // modal window for top up amount
  const [modal, setModal] = useState(false);

    // data for buy good
    const formAmount = useFormik({
      initialValues: {
        amount: "",
      },
      validationSchema: validationSchema,
      onSubmit: ({ resetForm }) => {
        topUpAmountHandler();
        resetForm();
      },
    });

      // on top up amount confirm button click //
  const topUpAmountHandler = () => {
    let data = formAmount.values;
    debugger
    topUpAmount({ ...data });

    setModal(false);

    // setTimeout(() => {
    //   NotificationManager.success("You have buyed good", "Buy good");
    // }, 1000);
    // hist.goBack();
  };

  // on top up amount button click
  const onTopUpAmountClick = () => {
    setModal(true);
  };

  return (
    <div className="moneyAmount">
      {/* modal for top up amount */}
      <MyModal visible={modal} setVisible={setModal}>
        <h3 className="moneyAmount_formHeader">Plese enter amount</h3>
        <TopUpAmountForm
         handler={formAmount.handleSubmit}
         formData={formAmount}
        />
      </MyModal>
      <Table sx={{ maxWidth: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ color: "white", fontSize: 20 }} align="center">
              My money amount
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            key={4}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell style={{ color: "white", fontSize: 20 }} align="center">
              {`${moneyAmount} $`}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Button
        onClick={() => onTopUpAmountClick()}
        variant="contained"
        size="large"
        style={{
          backgroundColor: "orange",
          width: "50%",
          margin: "auto auto",
          height: "50%",
        }}
      >
        Top up account
      </Button>
    </div>
  );
}

export default MoneyAmount;
