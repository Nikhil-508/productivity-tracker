import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HorizontalBarChart = ({ data }) => {
  const [chartData, setChartData] = useState({
    labels: data.labels,
    datasets: [
      {
        label: 'Productive',
        data: data.productive,
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Unproductive',
        data: data.unproductive,
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Idle',
        data: data.idle,
        backgroundColor: 'rgba(153, 102, 255, 0.8)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  });

  const handleIdleClick = (index) => {
    if (window.confirm('Convert idle time to productive?')) {
      const newData = { ...chartData };
      const idleTime = newData.datasets[2].data[index];
      newData.datasets[2].data[index] = 0;
      newData.datasets[0].data[index] += idleTime;
      setChartData(newData);
    }
  };

  const options = {
    indexAxis: 'y',
    animation: {
      duration: 1000,
      easing: 'easeInOutQuad',
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw} hours`;
          }
        }
      }
    },
    scales: {
      x: {
        stacked: true,
        max: 1,
        title: {
          display: true,
          text: 'Hours'
        }
      },
      y: {
        stacked: true,
      }
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const element = elements[0];
        if (element.datasetIndex === 2) { // Idle dataset
          handleIdleClick(element.index);
        }
      }
    }
  };

  return <Bar data={chartData} options={options} />;
};

export default HorizontalBarChart;