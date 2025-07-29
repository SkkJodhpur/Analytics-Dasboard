import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { ClientData } from '@/hooks/useGoogleSheets';

interface HeadshotsChartProps {
  data: ClientData[];
}

export const HeadshotsChart = ({ data }: HeadshotsChartProps) => {
  // Create timeline data for headshots
  const chartData = data.map((client, index) => ({
    name: client.clients.split(' ')[0], // First name only for cleaner labels
    headshots: client.headshots,
    cumulative: data.slice(0, index + 1).reduce((sum, item) => sum + item.headshots, 0)
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <defs>
            <linearGradient id="headshotsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--neon-cyan))" stopOpacity={0.8} />
              <stop offset="50%" stopColor="hsl(var(--electric-blue))" stopOpacity={0.4} />
              <stop offset="100%" stopColor="hsl(var(--neon-purple))" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="headshotsStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(var(--neon-cyan))" />
              <stop offset="100%" stopColor="hsl(var(--neon-purple))" />
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="hsl(var(--border))"
            opacity={0.2}
          />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
            interval={0}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
          />
          <Area
            type="monotone"
            dataKey="cumulative"
            stroke="url(#headshotsStroke)"
            strokeWidth={2}
            fill="url(#headshotsGradient)"
            animationDuration={2000}
            dot={{ fill: 'hsl(var(--neon-cyan))', strokeWidth: 0, r: 4 }}
            activeDot={{ 
              r: 6, 
              fill: 'hsl(var(--neon-cyan))', 
              strokeWidth: 2, 
              stroke: 'hsl(var(--background))',
              style: { filter: 'drop-shadow(0 0 8px hsl(var(--neon-cyan)))' }
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};