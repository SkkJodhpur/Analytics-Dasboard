import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';
import { ClientData } from '@/hooks/useGoogleSheets';

interface RevenueChartProps {
  data: ClientData[];
}

export const RevenueChart = ({ data }: RevenueChartProps) => {
  // Group data by status for the chart
  const chartData = [
    {
      name: 'Delivered',
      value: data.filter(item => 
        item.status.toLowerCase().includes('delivered') || 
        item.status.includes('✅')
      ).reduce((sum, item) => sum + item.priceValue, 0),
      color: 'hsl(var(--neon-green))'
    },
    {
      name: 'In Progress', 
      value: data.filter(item => 
        item.status.toLowerCase().includes('progress') || 
        item.status.includes('⏳')
      ).reduce((sum, item) => sum + item.priceValue, 0),
      color: 'hsl(var(--electric-blue))'
    }
  ];

  const formatValue = (value: number) => {
    return `₹${(value / 1000).toFixed(1)}K`;
  };

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="hsl(var(--border))"
            opacity={0.3}
          />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            tickFormatter={formatValue}
          />
          <Bar 
            dataKey="value" 
            radius={[4, 4, 0, 0]}
            fill="url(#revenueGradient)"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--neon-cyan))" stopOpacity={0.8} />
              <stop offset="100%" stopColor="hsl(var(--neon-purple))" stopOpacity={0.2} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};