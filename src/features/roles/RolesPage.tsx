import { useState } from 'react';
import { useGetRolesQuery } from '../../services/api';
import DataTable from '../../components/common/DataTable';
import { Button, Typography } from '@mui/material';
import RoleFormDialog from './RoleFormDialog';

const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'name', label: 'Role Name', minWidth: 150 },
  { id: 'description', label: 'Description', minWidth: 250 },
];

export default function RolesPage() {
  const { data, isLoading } = useGetRolesQuery();
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex justify-between items-center border-b pb-4">
        <Typography variant="h5" className="font-bold text-slate-800">Roles</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>+ Add Role</Button>
      </div>
      <DataTable columns={columns} rows={data || []} isLoading={isLoading} />
      <RoleFormDialog open={open} onClose={() => setOpen(false)} />
    </div>
  );
}