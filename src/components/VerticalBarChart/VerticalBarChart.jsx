import React from 'react';
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

const VerticalBarChart = ({ data }) => {
  const chartData = {
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
        label: 'Neutral',
        data: data.neutral,
        backgroundColor: 'rgba(255, 206, 86, 0.8)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    animation: {
      duration: 1000,
      easing: 'easeInOutQuad',
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            const time = data.labels[context.dataIndex];
            const apps = data.apps[time][context.dataset.label.toLowerCase()];
            return `${context.dataset.label}: ${context.raw} min${apps.length ? ' - ' + apps.join(', ') : ''}`;
          }
        }
      }
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
        max: 5,
        title: {
          display: true,
          text: 'Minutes'
        }
      }
    }
  };

  return <Bar data={chartData} options={options} />;
};

export default VerticalBarChart;