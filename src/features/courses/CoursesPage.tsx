import { useState } from 'react';
import { useGetCoursesQuery } from '../../services/api';
import DataTable from '../../components/common/DataTable';
import { Button, Typography, CircularProgress } from '@mui/material';
import CourseFormDialog from './CourseFormDialog';

const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'title', label: 'Course Title', minWidth: 250 },
  { 
    id: 'price', 
    label: 'Price', 
    minWidth: 100, 
    // val যদি null/undefined হয়, তাহলে ক্র্যাশ ঠেকানোর জন্য Number() ইউজ করা হলো
    format: (val: any) => <span className="font-semibold text-green-600">${Number(val || 0).toFixed(2)}</span> 
  },
  { id: 'durationHours', label: 'Duration (Hrs)', minWidth: 120 },
  { id: 'lectures', label: 'Lectures', minWidth: 100 },
];

const CoursesPage = () => {
  const { data: courses, isLoading, error } = useGetCoursesQuery();
  const [openDialog, setOpenDialog] = useState(false);

  // Error হ্যান্ডলিং সুন্দর করে দিলাম
  if (error) {
    console.error("Courses API Error:", error); // কনসোলে দেখার জন্য
    return (
      <div className="p-8 text-center animate-fade-in">
        <Typography variant="h5" color="error" className="mb-2">Oops! Couldn't load courses.</Typography>
        <Typography variant="body1" className="text-gray-600 mb-4">
          Please check if your token is valid or backend is running.
        </Typography>
        <Button variant="outlined" onClick={() => window.location.reload()}>Refresh Page</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <Typography variant="h5" className="font-bold text-slate-800">
            Course Management
          </Typography>
          <Typography variant="body2" className="text-slate-500">
            View and manage all available courses.
          </Typography>
        </div>
        <Button 
          variant="contained" 
          color="primary" 
          className="shadow-md h-10 px-6 font-semibold"
          onClick={() => setOpenDialog(true)}
        >
          + Add Course
        </Button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center p-10"><CircularProgress /></div>
      ) : (
        <DataTable columns={columns} rows={Array.isArray(courses) ? courses : []} />
      )}

      {/* Course Form Modal */}
      <CourseFormDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </div>
  );
};

export default CoursesPage;