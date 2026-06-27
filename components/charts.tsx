"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"];

interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}

interface LineChartProps {
  data: ChartData[];
  dataKey: string;
  title?: string;
}

export function SimpleLineChart({ data, dataKey, title }: LineChartProps) {
  return (
    <div className="w-full h-80 bg-white rounded-lg shadow-md p-4">
      {title && <h3 className="font-semibold mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey={dataKey} stroke="#3b82f6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

interface BarChartProps {
  data: ChartData[];
  dataKey: string;
  title?: string;
}

export function SimpleBarChart({ data, dataKey, title }: BarChartProps) {
  return (
    <div className="w-full h-80 bg-white rounded-lg shadow-md p-4">
      {title && <h3 className="font-semibold mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey={dataKey} fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

interface SimplePieChartProps {
  data: ChartData[];
  title?: string;
}

export function SimplePieChart({ data, title }: SimplePieChartProps) {
  return (
    <div className="w-full h-80 bg-white rounded-lg shadow-md p-4">
      {title && <h3 className="font-semibold mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
