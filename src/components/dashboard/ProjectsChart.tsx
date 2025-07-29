import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ClientData } from '@/hooks/useGoogleSheets';

interface ProjectsChartProps {
  data: ClientData[];
}

export const ProjectsChart = ({ data }: ProjectsChartProps) => {
  const chartData = [
    {
      name: 'Delivered',
      value: data.filter(item => 
        item.status.toLowerCase().includes('delivered') || 
        item.status.includes('✅')
      ).length,
      color: 'hsl(var(--neon-green))',
      glow: '0 0 20px hsl(var(--neon-green) / 0.5)'
    },
    {
      name: 'In Progress',
      value: data.filter(item => 
        item.status.toLowerCase().includes('progress') || 
        item.status.includes('⏳')
      ).length,
      color: 'hsl(var(--electric-blue))',
      glow: '0 0 20px hsl(var(--electric-blue) / 0.5)'
    }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="glass neon-border rounded-lg p-3 backdrop-blur-md">
          <p className="text-sm font-mono text-foreground">
            {data.name}: <span className="text-neon-cyan font-bold">{data.value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.05) return null; // Don't show label for slices smaller than 5%

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-xs font-mono font-bold"
        style={{ filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.8))' }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={80}
            innerRadius={30}
            paddingAngle={2}
            dataKey="value"
            animationBegin={0}
            animationDuration={1500}
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                style={{
                  filter: `drop-shadow(${entry.glow})`,
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};