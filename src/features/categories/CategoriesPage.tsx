import { useState } from 'react';
import { useGetCategoriesQuery } from '../../services/api';
import DataTable from '../../components/common/DataTable';
import { Button, Typography, CircularProgress } from '@mui/material';
import CategoryFormDialog from './CategoryFormDialog';

const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'name', label: 'Category Name', minWidth: 200 },
  { id: 'description', label: 'Description', minWidth: 300 },
];

const CategoriesPage = () => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();
  const [openDialog, setOpenDialog] = useState(false);

  // Error হ্যান্ডলিং
  if (error) {
    console.error("Categories API Error:", error);
    return (
      <div className="p-8 text-center animate-fade-in">
        <Typography variant="h5" color="error" className="mb-2">Oops! Couldn't load categories.</Typography>
        <Typography variant="body1" className="text-gray-600 mb-4">
          Data format issue or API is down.
        </Typography>
        <Button variant="outlined" onClick={() => window.location.reload()}>Refresh Page</Button>
      </div>
    );
  }

  // API যদি Array না পাঠায়, তাহলে ক্র্যাশ ঠেকানোর সেফটি
  const safeCategories = Array.isArray(categories) ? categories : [];

  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <Typography variant="h5" className="font-bold text-slate-800">
            Categories
          </Typography>
          <Typography variant="body2" className="text-slate-500">
            Manage course categories.
          </Typography>
        </div>
        <Button 
          variant="contained" 
          color="primary" 
          className="shadow-md h-10 px-6 font-semibold"
          onClick={() => setOpenDialog(true)}
        >
          + Add Category
        </Button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center p-10"><CircularProgress /></div>
      ) : (
        <DataTable columns={columns} rows={safeCategories} />
      )}
      
      <CategoryFormDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </div>
  );
};

export default CategoriesPage;