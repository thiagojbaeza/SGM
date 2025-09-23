import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import loginService from '../../services/login';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import './usuarios.css';

const columns = [
  { field: 'id_usuario', headerName: 'ID', width: 70 },
  { field: 'ds_nome_usuario', headerName: 'Usuário', width: 300 },
  { field: 'ds_senha', headerName: 'Senha', width: 130 },
  {
    field: 'fg_ativo',
    headerName: 'Ativo',
    width: 130,
    renderCell: (params) =>
      params.value === 1 
        ? <span style={{ color: 'green' }}>Ativo</span> 
        : <span style={{ color: 'red' }}>Inativo</span>
  },
  {
    field: '',
    headerName: 'EDITAR',
    width: 130,
    renderCell: (params) => (
      <button
        className="edit-btn"
        onClick={() => alert(params.row.id_usuario)}
      >
        <EditCalendarIcon />
      </button>
    )
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  const [rows, setRows] = useState([]);  // iniciar como array
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const service = new loginService();
        const token = localStorage.getItem('token');
        const data = await service.getUsuarios(token);
        if (data.success) {
          setRows(data.result);
        } else {
          setError('Falha ao carregar usuários');
        }
      } catch (err) {
        setError('Erro de rede');
      }
    })();
  }, []);

  return (
    <Paper sx={{ height: 500, width: '100%', padding: 2 }}>
      {/* Botão acima da tabela, container com flex-end */}
      <div className="adicionar-container">
        <button className="adicionar-btn">
          + Adicionar
        </button>
      </div>

      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableMultipleRowSelection
        getRowId={(row) => row.id_usuario}
        sx={{ border: 0 }}
      />

      {error && <p className="error-msg">{error}</p>}
    </Paper>
  );
}
