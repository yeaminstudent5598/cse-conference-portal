import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAddCourseMutation, useGetCategoriesQuery } from '../../services/api';

interface Props {
  open: boolean;
  onClose: () => void;
}

const CourseFormDialog = ({ open, onClose }: Props) => {
  const [addCourse, { isLoading: isAdding }] = useAddCourseMutation();
  // ক্যাটাগরি আনছি
  const { data: categories, isLoading: isCategoriesLoading } = useGetCategoriesQuery();

  // API যদি Array না পাঠায়, তাহলে ক্র্যাশ ঠেকানোর সেফটি!
  const safeCategories = Array.isArray(categories) ? categories : [];

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      categoryId: '',
      price: '',
      durationHours: '',
      lectures: '',
      startAt: new Date().toISOString().slice(0, 16),
      endAt: new Date().toISOString().slice(0, 16),
      thumbnailPath: 'https://via.placeholder.com/150',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Required'),
      categoryId: Yup.number().required('Required'),
      price: Yup.number().required('Required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await addCourse({
          ...values,
          categoryId: Number(values.categoryId),
          price: Number(values.price),
          durationHours: Number(values.durationHours || 0),
          lectures: Number(values.lectures || 0),
          startAt: new Date(values.startAt).toISOString(),
          endAt: new Date(values.endAt).toISOString(),
        }).unwrap();
        
        resetForm();
        onClose();
        alert('Success! Course added.');
      } catch (error) {
        console.error("API Error details:", error);
        alert('Failed to add course. Please check console.');
      }
    },
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle className="font-bold text-slate-800 border-b pb-3">Add New Course</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <TextField
            fullWidth
            name="title"
            label="Course Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            className="md:col-span-2"
          />
          <TextField
            fullWidth
            name="description"
            label="Description"
            multiline
            rows={3}
            value={formik.values.description}
            onChange={formik.handleChange}
            className="md:col-span-2"
          />
          <TextField
            select
            fullWidth
            name="categoryId"
            label="Category"
            value={formik.values.categoryId}
            onChange={formik.handleChange}
            error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}
            disabled={isCategoriesLoading}
          >
            {isCategoriesLoading ? (
               <MenuItem value=""><CircularProgress size={20} /> Loading...</MenuItem>
            ) : safeCategories.length > 0 ? (
              safeCategories.map((cat: any) => (
                <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
              ))
            ) : (
              <MenuItem value="" disabled>No Categories Found</MenuItem>
            )}
          </TextField>
          <TextField
            fullWidth
            type="number"
            name="price"
            label="Price ($)"
            value={formik.values.price}
            onChange={formik.handleChange}
          />
          <TextField
            fullWidth
            type="number"
            name="durationHours"
            label="Duration (Hours)"
            value={formik.values.durationHours}
            onChange={formik.handleChange}
          />
          <TextField
            fullWidth
            type="number"
            name="lectures"
            label="Total Lectures"
            value={formik.values.lectures}
            onChange={formik.handleChange}
          />
          <TextField
            fullWidth
            type="datetime-local"
            name="startAt"
            label="Start Date & Time"
            InputLabelProps={{ shrink: true }}
            value={formik.values.startAt}
            onChange={formik.handleChange}
          />
          <TextField
            fullWidth
            type="datetime-local"
            name="endAt"
            label="End Date & Time"
            InputLabelProps={{ shrink: true }}
            value={formik.values.endAt}
            onChange={formik.handleChange}
          />
        </DialogContent>
        <DialogActions className="p-4 border-t">
          <Button onClick={onClose} color="inherit">Cancel</Button>
          <Button type="submit" variant="contained" color="primary" disabled={isAdding}>
            {isAdding ? 'Saving...' : 'Save Course'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CourseFormDialog;