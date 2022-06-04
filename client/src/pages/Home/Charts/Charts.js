import React, { useEffect } from "react";
import "./Charts.scss";
import { connect } from "react-redux";
import BarChart from "./BarChart";
import { getChartsDataStart } from "./charts-slice";
import { monthSorter } from "../../../common/helpers/formatDate";
import Preloader from "../../../components/Preloader/Preloader";

function Charts({ getChartsData, formatedChartsData, loading }) {
  useEffect(() => {
    getChartsData();
  }, []);


 // let formatedChartsData = chartsData;

  // sort arr by month
  if (formatedChartsData) {
    formatedChartsData.sort(monthSorter);
  } else {
    formatedChartsData = []
  }

  let userDataBuyedAmount = {
    labels: formatedChartsData.map((data) => data.Month),
    datasets: [
      {
        label: "Users expenses",
        data: formatedChartsData.map((data) => data.AmountOfBuyed),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  }

  let userDataSoldAmount = {
    labels: formatedChartsData.map((data) => data.Month),
    datasets: [
      {
        label: "Users incomes",
        data: formatedChartsData.map((data) => data.AmountOfSelled),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  }
    
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <Preloader />
      </div>
    );
  }

  return (
    <div className="charts">
      <h2 className="charts_title">Charts</h2>
      <div style={{ width: "50%" }}>
        <BarChart chartData={userDataBuyedAmount} />
      </div>
      <div style={{ width: "50%" }}>
        <BarChart chartData={userDataSoldAmount} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  formatedChartsData: state.charts.monthData,
  loading: state.charts.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getChartsData: () => dispatch(getChartsDataStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Charts);
