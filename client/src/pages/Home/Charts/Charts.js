import React, { useEffect } from "react";
import "./Charts.scss";
import { connect } from "react-redux";
import BarChart from "./BarChart";
import { getCategoryGoodsStart, getChartsDataStart } from "./charts-slice";
import { monthSorter } from "../../../common/helpers/formatDate";
import Preloader from "../../../components/Preloader/Preloader";
import LineChart from "./PieChart";
import PieChart from "./PieChart";

function Charts({
  getChartsData,
  formatedChartsData,
  loading,
  categoryGoods,
  getCategoryGoodsData,
  loadingCategoryGoods,
}) {
  useEffect(() => {
    getCategoryGoodsData();
    getChartsData();
  }, []);

  // let formatedChartsData = chartsData;

  // sort arr by month
  if (formatedChartsData) {
    formatedChartsData.sort(monthSorter);
  } else {
    formatedChartsData = [];
  }

  let userDataBuyedAmount = {
    labels: formatedChartsData.map((data) => data.Month),
    datasets: [
      {
        label: "Users expenses",
        data: formatedChartsData.map((data) => data.AmountOfBuyed),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  let userDataSoldAmount = {
    labels: formatedChartsData.map((data) => data.Month),
    datasets: [
      {
        label: "Users incomes",
        data: formatedChartsData.map((data) => data.AmountOfSelled),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  if (!categoryGoods) {
    categoryGoods = []
  }
  
  let filteredCategoryGoodsBuyed = categoryGoods.filter((data) => {
    if(data.CountOfBuyed != 0) {
      return data
    }
  })

  let filteredCategoryGoodsSold = categoryGoods.filter((data) => {
    if(data.CountOfSelled != 0) {
      return data
    }
  })

  let userCategoryBuyedCount = {
    labels: filteredCategoryGoodsBuyed.map((data) =>  data.Category),
    datasets: [
      {
        data: filteredCategoryGoodsBuyed.map((data) => data.CountOfBuyed),
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "green",
          "yellow"
        ],
        hoverOffset: 4,
        borderWidth: 2,
      },
    ],
  };

  let userCategorySoldCount = {
    labels: filteredCategoryGoodsSold.map((data) => data.Category),
    datasets: [
      {
        data: filteredCategoryGoodsSold.map((data) => data.CountOfSelled),
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "green",
          "yellow"
        ],
        hoverOffset: 4,
        borderWidth: 2,
      },
    ],
  };

  if (loading || loadingCategoryGoods) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <Preloader />
      </div>
    );
  }

  return (
    <div className="charts">
      <h2 className="charts_title">Charts</h2>
      <div className="charts_header"></div>
      <div className="charts_block">
        <div style={{ width: "50%" }}>
          <h4 className="charts_block__name">Expences</h4>


          <BarChart chartData={userDataBuyedAmount} />
        </div>
        <div style={{ width: "auto" }}>
          <h4 className="charts_block__name">Buyed categories of goods</h4>

          <PieChart chartData={userCategoryBuyedCount} />
        </div>
      </div>

      <div className="charts_block">
        <div style={{ width: "50%" }}>
        <h4 className="charts_block__name">Incomes</h4>

          <BarChart chartData={userDataSoldAmount} />
        </div>
        <div style={{ width: "auto" }}>
          <h4 className="charts_block__name">Sold categories of goods</h4>

          <PieChart chartData={userCategorySoldCount} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  formatedChartsData: state.charts.monthData,
  loading: state.charts.loading,

  categoryGoods: state.charts.categoryGoods,
  loadingCategoryGoods: state.charts.loadingCategoryGoods,
});

const mapDispatchToProps = (dispatch) => ({
  getChartsData: () => dispatch(getChartsDataStart()),

  getCategoryGoodsData: () => dispatch(getCategoryGoodsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Charts);
