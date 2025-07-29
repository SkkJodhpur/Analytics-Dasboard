import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatusBadge } from './StatusBadge';
import { ClientData } from '@/hooks/useGoogleSheets';
import { Mail, Camera, IndianRupee } from 'lucide-react';

interface ClientsTableProps {
  data: ClientData[];
}

export const ClientsTable = ({ data }: ClientsTableProps) => {
  return (
    <div className="glass neon-border rounded-lg overflow-hidden">
      <div className="p-3 sm:p-4 border-b border-border/50 bg-gradient-cyber/10">
        <h3 className="text-base sm:text-lg font-semibold bg-gradient-electric bg-clip-text text-transparent">
          Client Portfolio
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground font-mono mt-1">
          Real-time project status & analytics
        </p>
      </div>
      
      {/* Mobile Card View */}
      <div className="block md:hidden">
        {data.map((client, index) => (
          <div 
            key={client.id}
            className="p-4 border-b border-border/30 last:border-b-0 hover:bg-gradient-glass transition-all duration-200 group animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-foreground group-hover:text-neon-cyan transition-colors">
                  {client.clients}
                </h4>
                <StatusBadge status={client.status} />
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Camera className="w-3 h-3 text-electric-blue" />
                  <span className="bg-electric-blue/20 text-electric-blue px-2 py-1 rounded text-xs font-mono">
                    {client.headshots}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <IndianRupee className="w-3 h-3 text-neon-purple" />
                  <span className="bg-neon-purple/20 text-neon-purple px-2 py-1 rounded text-xs font-mono">
                    {client.price}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 pt-2 border-t border-border/30">
                <Mail className="w-3 h-3 text-muted-foreground" />
                <a 
                  href={`mailto:${client.email}`}
                  className="text-muted-foreground hover:text-neon-cyan transition-colors text-xs font-mono group-hover:underline truncate"
                >
                  {client.email}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-cyber-gray/20">
              <TableHead className="text-neon-cyan font-mono text-xs uppercase tracking-wider">
                Client
              </TableHead>
              <TableHead className="text-neon-cyan font-mono text-xs uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <Camera className="w-3 h-3" />
                  Headshots
                </div>
              </TableHead>
              <TableHead className="text-neon-cyan font-mono text-xs uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <IndianRupee className="w-3 h-3" />
                  Price
                </div>
              </TableHead>
              <TableHead className="text-neon-cyan font-mono text-xs uppercase tracking-wider">
                Status
              </TableHead>
              <TableHead className="text-neon-cyan font-mono text-xs uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <Mail className="w-3 h-3" />
                  Contact
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((client, index) => (
              <TableRow 
                key={client.id} 
                className="border-border/30 hover:bg-gradient-glass transition-all duration-200 group animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <TableCell className="font-medium text-foreground group-hover:text-neon-cyan transition-colors">
                  {client.clients}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="bg-electric-blue/20 text-electric-blue px-2 py-1 rounded text-sm font-mono">
                      {client.headshots}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="bg-neon-purple/20 text-neon-purple px-2 py-1 rounded text-sm font-mono">
                    {client.price}
                  </span>
                </TableCell>
                <TableCell>
                  <StatusBadge status={client.status} />
                </TableCell>
                <TableCell>
                  <a 
                    href={`mailto:${client.email}`}
                    className="text-muted-foreground hover:text-neon-cyan transition-colors text-sm font-mono group-hover:underline"
                  >
                    {client.email}
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};