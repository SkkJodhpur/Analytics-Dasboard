import { useGoogleSheets } from '@/hooks/useGoogleSheets';
import { MetricCard } from './MetricCard';
import { ChartCard } from './ChartCard';
import { ClientsTable } from './ClientsTable';
import { RevenueChart } from './RevenueChart';
import { ProjectsChart } from './ProjectsChart';
import { HeadshotsChart } from './HeadshotsChart';
import { 
  Users, 
  DollarSign, 
  Camera, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  RefreshCw,
  Zap,
  Target,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Dashboard = () => {
  const { data, loading, error, analytics, refetch } = useGoogleSheets();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="glass rounded-lg p-8 text-center">
          <div className="w-12 h-12 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neon-cyan font-mono">Syncing data from the matrix...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="glass neon-border rounded-lg p-8 text-center max-w-md">
          <Zap className="w-12 h-12 text-destructive mx-auto mb-4 animate-cyber-pulse" />
          <h2 className="text-xl font-bold mb-2 text-destructive">System Error</h2>
          <p className="text-muted-foreground mb-4 font-mono">{error}</p>
          <Button onClick={refetch} variant="outline" className="neon-border">
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry Connection
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-3 sm:p-4 lg:p-6 cyber-grid">
      {/* Header */}
      <div className="mb-6 sm:mb-8 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-cyber bg-clip-text text-transparent mb-2 leading-tight">
              NEURAL COMMAND CENTER
            </h1>
            <p className="text-muted-foreground font-mono text-xs sm:text-sm tracking-wider uppercase truncate">
              Business Intelligence Dashboard • Real-time Analytics
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <div className="glass rounded-lg px-3 py-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-cyber-pulse" />
              <span className="text-xs sm:text-sm font-mono text-neon-green">LIVE</span>
            </div>
            <Button 
              onClick={refetch} 
              variant="outline" 
              size="sm"
              className="neon-border hover:bg-gradient-cyber/20 transition-all duration-300"
            >
              <RefreshCw className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Sync</span>
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <MetricCard
          title="Total Clients"
          value={analytics.totalClients}
          change="+12% vs last month"
          changeType="positive"
          icon={Users}
          className="animate-slide-up"
        />
        <MetricCard
          title="Revenue Generated"
          value={`₹${(analytics.totalRevenue / 1000).toFixed(1)}K`}
          change="+8.2% vs last month"
          changeType="positive"
          icon={DollarSign}
          className="animate-slide-up [animation-delay:100ms]"
        />
        <MetricCard
          title="Total Headshots"
          value={analytics.totalHeadshots}
          change={`Avg: ${analytics.totalHeadshots / analytics.totalClients || 0} per client`}
          changeType="neutral"
          icon={Camera}
          className="animate-slide-up [animation-delay:200ms]"
        />
        <MetricCard
          title="Completion Rate"
          value={`${analytics.completionRate}%`}
          change="Industry leading"
          changeType="positive"
          icon={Target}
          className="animate-slide-up [animation-delay:300ms]"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <ChartCard 
          title="Revenue Analysis"
          subtitle="By project status"
          className="animate-scale-in"
        >
          <RevenueChart data={data} />
        </ChartCard>
        
        <ChartCard 
          title="Project Distribution"
          subtitle="Status breakdown"
          className="animate-scale-in [animation-delay:200ms]"
        >
          <ProjectsChart data={data} />
        </ChartCard>
        
        <ChartCard 
          title="Headshots Cumulative"
          subtitle="Production timeline"
          className="animate-scale-in [animation-delay:400ms]"
        >
          <HeadshotsChart data={data} />
        </ChartCard>
      </div>

      {/* Additional KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <MetricCard
          title="Projects Delivered"
          value={analytics.completedProjects}
          change={`${Math.round((analytics.completedProjects / analytics.totalClients) * 100)}% completion rate`}
          changeType="positive"
          icon={CheckCircle}
          className="animate-fade-in"
        />
        <MetricCard
          title="In Progress"
          value={analytics.inProgressProjects}
          change="Active workload"
          changeType="neutral"
          icon={Clock}
          className="animate-fade-in [animation-delay:100ms]"
        />
        <MetricCard
          title="Average Project Value"
          value={`₹${(analytics.averagePrice / 1000).toFixed(1)}K`}
          change="Per client value"
          changeType="neutral"
          icon={TrendingUp}
          className="animate-fade-in [animation-delay:200ms]"
        />
      </div>

      {/* Data Table */}
      <div className="animate-slide-up [animation-delay:600ms]">
        <ClientsTable data={data} />
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-xs text-muted-foreground font-mono opacity-60">
          Last updated: {new Date().toLocaleString()} • Auto-refresh: 30s
        </p>
      </div>
    </div>
  );
};