import { useGetUsersQuery } from '../../services/api';
import DataTable from '../../components/common/DataTable';
import { Typography } from '@mui/material';

const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'name', label: 'Name', minWidth: 200 },
  { id: 'email', label: 'Email', minWidth: 200 },
  { id: 'isActive', label: 'Status', minWidth: 100, format: (val: boolean) => (val ? 'Active' : 'Inactive') },
];

export default function UsersPage() {
  const { data, isLoading } = useGetUsersQuery();
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="border-b pb-4">
        <Typography variant="h5" className="font-bold text-slate-800">Users List</Typography>
      </div>
      <DataTable columns={columns} rows={data || []} isLoading={isLoading} />
    </div>
  );
}