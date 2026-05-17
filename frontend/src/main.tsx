import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  ArcElement,
  LinearScale,
  LineElement,
  LineController,
  BarController,
  PieController,
  DoughnutController,
  Tooltip,
  PointElement,
  Legend,
  Title
} from 'chart.js';

import { DataProvider } from './context/DataContext.tsx';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  LineElement,
  LineController,
  BarController,
  PieController,
  DoughnutController,
  PointElement,
  Tooltip,
  Legend,
  Title
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <DataProvider>
        <App />
    </DataProvider>
  </StrictMode>,
)
