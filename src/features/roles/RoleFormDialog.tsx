import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAddRoleMutation } from '../../services/api';

export default function RoleFormDialog({ open, onClose }: { open: boolean, onClose: () => void }) {
  const [addRole, { isLoading }] = useAddRoleMutation();
  const formik = useFormik({
    initialValues: { name: '', description: '' },
    validationSchema: Yup.object({ name: Yup.string().required('Required') }),
    onSubmit: async (values, { resetForm }) => {
      try { await addRole(values).unwrap(); resetForm(); onClose(); } 
      catch (error) { console.error(error); }
    },
  });
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className="font-bold border-b pb-2">Add New Role</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent className="flex flex-col gap-4 pt-4">
          <TextField fullWidth name="name" label="Role Name" value={formik.values.name} onChange={formik.handleChange} error={formik.touched.name && Boolean(formik.errors.name)} />
          <TextField fullWidth name="description" label="Description" value={formik.values.description} onChange={formik.handleChange} />
        </DialogContent>
        <DialogActions className="p-4 border-t">
          <Button onClick={onClose} color="inherit">Cancel</Button>
          <Button type="submit" variant="contained" disabled={isLoading}>Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}