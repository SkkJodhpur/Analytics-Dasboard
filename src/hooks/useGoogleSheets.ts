import { useState, useEffect } from 'react';

export interface ClientData {
  id: string;
  clients: string;
  headshots: number;
  price: string;
  status: string;
  email: string;
  priceValue: number; // Numeric price for calculations
}

const SHEETS_URL = 'https://docs.google.com/spreadsheets/d/1gKt_wyMvGiWBWieONucxWQS2iOeFlxLCd-YjxQD8ew4/export?format=csv';

export const useGoogleSheets = () => {
  const [data, setData] = useState<ClientData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(SHEETS_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const csvText = await response.text();
      const lines = csvText.trim().split('\n');
      
      // Skip header row
      const dataLines = lines.slice(1);
      
      const parsedData: ClientData[] = dataLines.map((line, index) => {
        // Parse CSV with potential commas in quoted fields
        const fields = line.split(',').map(field => field.trim());
        
        const clients = fields[0] || '';
        const headshots = parseInt(fields[1]) || 0;
        const price = fields[2] || '0₹';
        const status = fields[3] || '';
        const email = fields[4] || '';
        
        // Extract numeric value from price string
        const priceValue = parseInt(price.replace(/[^\d]/g, '')) || 0;
        
        return {
          id: `client-${index + 1}`,
          clients,
          headshots,
          price,
          status,
          email,
          priceValue
        };
      });
      
      setData(parsedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Calculate analytics from the data
  const analytics = {
    totalClients: data.length,
    totalRevenue: data.reduce((sum, item) => sum + item.priceValue, 0),
    totalHeadshots: data.reduce((sum, item) => sum + item.headshots, 0),
    completedProjects: data.filter(item => 
      item.status.toLowerCase().includes('delivered') || 
      item.status.includes('✅')
    ).length,
    inProgressProjects: data.filter(item => 
      item.status.toLowerCase().includes('progress') || 
      item.status.includes('⏳')
    ).length,
    averagePrice: data.length > 0 ? Math.round(data.reduce((sum, item) => sum + item.priceValue, 0) / data.length) : 0,
    completionRate: data.length > 0 ? 
      Math.round((data.filter(item => 
        item.status.toLowerCase().includes('delivered') || 
        item.status.includes('✅')
      ).length / data.length) * 100) : 0
  };

  return {
    data,
    loading,
    error,
    analytics,
    refetch: fetchData
  };
};