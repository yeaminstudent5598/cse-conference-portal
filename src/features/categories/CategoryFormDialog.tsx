import {
  Dialog, DialogTitle, DialogContent,
  DialogActions, Button, TextField, Alert
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useAddCategoryMutation } from '../../services/api';

interface Props {
  open: boolean;
  onClose: () => void;
}

const CategoryFormDialog = ({ open, onClose }: Props) => {
  const [addCategory, { isLoading }] = useAddCategoryMutation();
  const [errorMsg, setErrorMsg] = useState('');

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Category Name is required'),
      description: Yup.string().required('Description is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      setErrorMsg('');
      try {
        await addCategory(values).unwrap();
        resetForm();
        onClose();
      } catch (error: any) {
        // 401 হলে api.ts থেকেই auto redirect হবে
        // অন্য error show করো
        if (error?.status !== 401) {
          const msg =
            error?.data?.message ||
            error?.data ||
            'Category add করতে ব্যর্থ হয়েছে!';
          setErrorMsg(String(msg));
        }
      }
    },
  });

  const handleClose = () => {
    formik.resetForm();
    setErrorMsg('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle className="font-bold text-slate-800 border-b pb-2">
        Add New Category
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent className="flex flex-col gap-4 pt-4">
          {errorMsg && (
            <Alert severity="error">{errorMsg}</Alert>
          )}
          <TextField
            fullWidth
            name="name"
            label="Category Name (e.g. Web Development)"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            fullWidth
            name="description"
            label="Description"
            multiline
            rows={3}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />
        </DialogContent>
        <DialogActions className="p-4 border-t">
          <Button onClick={handleClose} color="inherit" disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Category'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CategoryFormDialog;