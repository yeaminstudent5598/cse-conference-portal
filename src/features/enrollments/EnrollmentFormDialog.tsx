import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useAddEnrollmentMutation } from '../../services/api';

export default function EnrollmentFormDialog({ open, onClose }: { open: boolean, onClose: () => void }) {
  const [addEnrollment, { isLoading }] = useAddEnrollmentMutation();
  const formik = useFormik({
    initialValues: { userId: '', courseId: '' },
    onSubmit: async (values, { resetForm }) => {
      try { 
        await addEnrollment({ userId: Number(values.userId), courseId: Number(values.courseId) }).unwrap(); 
        resetForm(); onClose(); 
      } catch (error) { console.error(error); }
    },
  });
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className="font-bold border-b pb-2">New Enrollment</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent className="flex flex-col gap-4 pt-4">
          <TextField fullWidth name="userId" label="User ID" type="number" value={formik.values.userId} onChange={formik.handleChange} />
          <TextField fullWidth name="courseId" label="Course ID" type="number" value={formik.values.courseId} onChange={formik.handleChange} />
        </DialogContent>
        <DialogActions className="p-4 border-t">
          <Button onClick={onClose} color="inherit">Cancel</Button>
          <Button type="submit" variant="contained" disabled={isLoading}>Enroll</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}