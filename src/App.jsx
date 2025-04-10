import { useState } from 'react'

import './App.css'
import VerticalBarChart from './components/VerticalBarChart/VerticalBarChart';
import HorizontalBarChart from './components/HorizontalBarChart/HorizontalBarChart';

function App() {
const [chartData] = useState({
    vertical: {
      labels: ['0:00', '0:05', '0:10', '0:15', '0:20', '0:25'],
      productive: [4, 3, 2, 4, 3, 2],
      unproductive: [1, 1, 2, 0, 1, 2],
      neutral: [0, 1, 1, 1, 1, 1],
      apps: {
        '0:00': { productive: ['VSCode'], unproductive: [], neutral: [] },
        '0:05': { productive: ['VSCode'], unproductive: ['Social Media'], neutral: ['Email'] },
        '0:10': { productive: ['Terminal'], unproductive: ['YouTube'], neutral: ['Docs'] },
        '0:15': { productive: ['VSCode'], unproductive: [], neutral: ['Slack'] },
        '0:20': { productive: ['Figma'], unproductive: ['Twitter'], neutral: ['Email'] },
        '0:25': { productive: ['Terminal'], unproductive: ['YouTube'], neutral: ['Docs'] },
      }
    },
    horizontal: {
      labels: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6'],
      productive: [0.8, 0.7, 0.6, 0.9, 0.5, 0.8],
      unproductive: [0.1, 0.2, 0.3, 0.05, 0.4, 0.1],
      idle: [0.1, 0.1, 0.1, 0.05, 0.1, 0.1]
    }
  });

  return (
    <div className="App">
      <h1>Productivity Tracker</h1>
      <div className="charts-container">
        <div className="chart">
          <h2>Graph A - 5 Minute Intervals</h2>
          <VerticalBarChart data={chartData.vertical} />
        </div>
        <div className="chart">
          <h2>Graph B - Hourly Breakdown</h2>
          <HorizontalBarChart data={chartData.horizontal} />
        </div>
      </div>
    </div>
  );
}

export default App
