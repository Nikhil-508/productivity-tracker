// src/components/CombinedChart.jsx
import React, { useState } from 'react';
import { Chart } from 'react-chartjs-2';
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

const CombinedChart = ({ data }) => {
  const [hourlyData, setHourlyData] = useState(data.hourlyData);

  const chartData = {
    labels: [...data.fiveMinuteData.labels, ...data.hourlyData.labels],
    datasets: [
      {
        label: 'Productive',
        data: [...data.fiveMinuteData.productive, ...hourlyData.productive],
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        type: 'bar',
        stack: 'vertical',
        order: 2,
        xAxisID: 'xVertical',
        yAxisID: 'yMinutes',
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      },
      {
        label: 'Unproductive',
        data: [...data.fiveMinuteData.unproductive, ...hourlyData.unproductive],
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        type: 'bar',
        stack: 'vertical',
        order: 2,
        xAxisID: 'xVertical',
        yAxisID: 'yMinutes',
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      },
      {
        label: 'Neutral/Idle',
        data: [...data.fiveMinuteData.neutral, ...hourlyData.idle],
        backgroundColor: 'rgba(255, 206, 86, 0.8)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
        type: 'bar',
        stack: 'vertical',
        order: 2,
        xAxisID: 'xVertical',
        yAxisID: 'yMinutes',
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      },
      {
        label: 'Productive (Hourly)',
        data: [...Array(data.fiveMinuteData.labels.length).fill(null), ...hourlyData.productive],
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        type: 'bar',
        stack: 'horizontal',
        order: 1,
        xAxisID: 'xHorizontal',
        yAxisID: 'yHours',
        indexAxis: 'y',
      },
      {
        label: 'Unproductive (Hourly)',
        data: [...Array(data.fiveMinuteData.labels.length).fill(null), ...hourlyData.unproductive],
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        type: 'bar',
        stack: 'horizontal',
        order: 1,
        xAxisID: 'xHorizontal',
        yAxisID: 'yHours',
        indexAxis: 'y',
      },
      {
        label: 'Idle (Hourly)',
        data: [...Array(data.fiveMinuteData.labels.length).fill(null), ...hourlyData.idle],
        backgroundColor: 'rgba(153, 102, 255, 0.8)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
        type: 'bar',
        stack: 'horizontal',
        order: 1,
        xAxisID: 'xHorizontal',
        yAxisID: 'yHours',
        indexAxis: 'y',
      },
    ],
  };

  const handleIdleClick = (index) => {
    if (index >= data.fiveMinuteData.labels.length) {
      if (window.confirm('Convert idle time to productive?')) {
        const newHourlyData = { ...hourlyData };
        const idleIndex = index - data.fiveMinuteData.labels.length;
        const idleTime = newHourlyData.idle[idleIndex];
        newHourlyData.idle[idleIndex] = 0;
        newHourlyData.productive[idleIndex] += idleTime;
        setHourlyData(newHourlyData);
      }
    }
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
            const index = context.dataIndex;
            if (index < data.fiveMinuteData.labels.length) {
              const time = data.fiveMinuteData.labels[index];
              const apps = data.fiveMinuteData.apps[time][context.dataset.label.toLowerCase().split(' ')[0]];
              return `${context.dataset.label}: ${context.raw} min${apps.length ? ' - ' + apps.join(', ') : ''}`;
            } else {
              return `${context.dataset.label}: ${context.raw} hours`;
            }
          }
        }
      },
      legend: {
        position: 'top',
      }
    },
    scales: {
      xVertical: {
        type: 'category',
        labels: data.fiveMinuteData.labels,
        position: 'bottom',
        stack: true,
        grid: { display: false },
        offset: true,
      },
      xHorizontal: {
        type: 'linear',
        position: 'bottom',
        min: 0,
        max: 1,
        stack: true,
        grid: { display: false },
        display: false, // Hide this axis as it's handled by yHours
      },
      yMinutes: {
        type: 'linear',
        position: 'left',
        stack: true,
        beginAtZero: true,
        max: 5,
        title: {
          display: true,
          text: 'Minutes (5-min intervals)'
        },
        grid: { display: true }
      },
      yHours: {
        type: 'category',
        labels: ['', ...data.hourlyData.labels], // Empty label to align with vertical section
        position: 'right',
        stack: true,
        title: {
          display: true,
          text: 'Hours'
        },
        grid: { display: false }
      }
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const element = elements[0];
        if (element.datasetIndex === 5) { // Idle (Hourly) dataset
          handleIdleClick(element.index);
        }
      }
    }
  };

  return (
    <div className="combined-chart">
      <Chart type="bar" data={chartData} options={options} />
    </div>
  );
};

export default CombinedChart;