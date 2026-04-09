import { useState } from 'react';
import { useGetEnrollmentsQuery } from '../../services/api';
import DataTable from '../../components/common/DataTable';
import { Button, Typography } from '@mui/material';
import EnrollmentFormDialog from './EnrollmentFormDialog';

const columns = [
  { id: 'id', label: 'Enrollment ID', minWidth: 100 },
  { id: 'userId', label: 'User ID', minWidth: 100 },
  { id: 'courseId', label: 'Course ID', minWidth: 100 },
  { id: 'paymentStatus', label: 'Payment Status', minWidth: 150 },
];

export default function EnrollmentsPage() {
  const { data, isLoading } = useGetEnrollmentsQuery();
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex justify-between items-center border-b pb-4">
        <Typography variant="h5" className="font-bold text-slate-800">Enrollments</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>+ New Enrollment</Button>
      </div>
      <DataTable columns={columns} rows={data || []} isLoading={isLoading} />
      <EnrollmentFormDialog open={open} onClose={() => setOpen(false)} />
    </div>
  );
}