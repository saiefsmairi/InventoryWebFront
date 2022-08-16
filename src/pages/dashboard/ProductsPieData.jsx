import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios'


// ==============================|| MONTHLY BAR CHART ||============================== //


var nameprod = []
var count = []
export default function ProductsPieData({ zone }) {

  const [prodsCount, setprodsCount] = useState([])
  const [prodsCount2, setprodsCount2] = useState([])
  const [getData, setgetData] = useState(false)


  useEffect(() => {
    setgetData(false)
    axios.get("http://localhost:5000/product/getproductsbyzone/" + zone._id).then((res) => {
      //console.log(res.data)
    }).catch(function (error) {
      console.log(error)
    })

    axios.get("http://localhost:5000/product/CountProductsByZoneStats/" + zone._id).then((res) => {
      console.log(res.data)
      nameprod = []
      count = []
      res.data.forEach(element => {
        nameprod.push(element._id)
        count.push(element.count)

      });

      setgetData(true)
      console.log(nameprod)
      console.log(count)
    }).catch(function (error) {
      console.log(error)
    })
  }, [zone])


  var barChartOptions = {

    labels: nameprod,
    datasets: [
      {
        label: '# of Products',
        data: count,
        backgroundColor: [
          'rgba(255, 206, 86, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };


  return (
    <div>

      {getData && <Pie data={barChartOptions} />}

    </div>

  );
};

