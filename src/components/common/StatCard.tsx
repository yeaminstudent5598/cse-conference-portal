import { Paper, Typography } from '@mui/material';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  colorClass?: string;
  loading?: boolean;
}

const StatCard = ({ title, value, icon, colorClass = 'text-blue-600', loading = false }: StatCardProps) => {
  return (
    <Paper elevation={2} className="p-6 rounded-xl flex items-center justify-between bg-white border border-gray-100 hover:shadow-lg transition-shadow">
      <div>
        <Typography variant="body2" className="text-gray-500 font-medium mb-1 uppercase tracking-wider">
          {title}
        </Typography>
        {loading ? (
          <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
        ) : (
          <Typography variant="h4" className={`font-bold ${colorClass}`}>
            {value}
          </Typography>
        )}
      </div>
      {icon && (
        <div className={`p-4 rounded-full bg-opacity-10 ${colorClass.replace('text-', 'bg-')}`}>
          <div className={colorClass}>{icon}</div>
        </div>
      )}
    </Paper>
  );
};

export default StatCard;