"use client";

import { Line } from "react-chartjs-2";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const chartVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

export function TrendChart({ data }: { data: any[] }) {
  const chartData = {
    labels: data.map(d => d.date),
    datasets: [
      {
        label: 'Engagement Growth',
        data: data.map(d => d.value),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.05)',
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#020617',
        titleColor: '#e2e8f0',
        bodyColor: '#94a3b8',
        padding: 12,
        intersect: false,
        mode: 'index' as const,
      },
    },
    scales: {
      y: {
        display: false,
        grid: { display: false },
      },
      x: {
        grid: { display: false },
        ticks: { color: '#64748b' },
      },
    },
  };

  return (
    <motion.div
      variants={chartVariants}
      initial="hidden"
      animate="visible"
      className="h-64 bg-gradient-to-br from-card to-muted/5 rounded-xl p-4 border border-border/50"
    >
      <Line data={chartData} options={options} />
    </motion.div>
  );
} 