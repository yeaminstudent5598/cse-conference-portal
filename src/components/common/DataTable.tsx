import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography } from '@mui/material';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  format?: (value: any) => string | JSX.Element;
}

interface DataTableProps {
  columns: Column[];
  rows: any[];
  isLoading?: boolean;
}

const DataTable = ({ columns, rows, isLoading }: DataTableProps) => {
  if (isLoading) {
    return <div className="flex justify-center items-center p-10"><CircularProgress /></div>;
  }

  if (!rows || rows.length === 0) {
    return (
      <Paper className="p-10 text-center shadow-sm border border-gray-200">
        <Typography className="text-gray-500 text-lg">No data available to display.</Typography>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper} className="shadow-sm rounded-lg border border-gray-200 bg-white">
      <Table stickyHeader aria-label="data table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                style={{ minWidth: column.minWidth }}
                className="bg-slate-100 font-bold text-slate-700 border-b-2 border-slate-200"
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow hover role="checkbox" tabIndex={-1} key={row.id || index} className="transition-colors hover:bg-slate-50">
              {columns.map((column) => {
                const value = row[column.id];
                return (
                  <TableCell key={column.id} className="text-gray-700">
                    {column.format ? column.format(value) : value}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;