import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import loginService from '../../services/login';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import Button from '@mui/material/Button';

const columns = [
  { field: 'id_usuario', headerName: 'ID', width: 70 },
  { field: 'ds_nome_usuario', headerName: 'Usuário', width: 300 },
  { field: 'ds_senha', headerName: 'Senha', width: 130 },
  { field: 'fg_ativo', headerName: 'Ativo', width: 130 ,
    renderCell: (params) => {
      // params.value contains the original value of the 'status' field for the current row
      // params.row contains the entire row object
      if (params.value === 1) {
        return <span style={{ color: 'green' }}>Ativo</span>;
      } else {
        return <span style={{ color: 'red' }}>Inativo</span>;
      }
    },
  },
  { field: '', headerName:'EDITAR' , width: 130,
    renderCell: (params) => {
      return <Button
              onClick={()=>alert(params.row.id_usuario)}
      > <EditCalendarIcon /> </Button> 
    }
   },
];

const paginationModel = { page: 0, pageSize: 9 };

export default function DataTable() {
  const [rows, setRows] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
   const callData = async()=>{
    const data = await handleLogin()
    setRows(data)
   }
   callData()
  },[]);

  return (
    <Paper sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        getRowId={(row) => row.id_usuario}
        disableMultipleRowSelection = {true}
        sx={{ border: 0 }}
      />
    </Paper>
  );

async function handleLogin() {
    const service = new loginService();
    const token = localStorage.getItem('token');
    const data = await service.getUsuarios(token);

    if (data.success) {
      return data.result
      //window.location.reload();
    }
}

}