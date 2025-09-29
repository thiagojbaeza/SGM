import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import tipousuarioService from '../../services/tipousuario';


import './TipoUsuario.css';

export default function TipoUsuarioPage() {
  const [rows, setRows] = useState([]);
  const [mode, setMode] = useState('view');
  const [currentData, setCurrentData] = useState({
    id_tipo_usuario: null,
    ds_tipo_usuario: '',
    fg_ativo: 1 ,
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const service = new tipousuarioService();
        const token = localStorage.getItem('token');
        const data = await service.getTipoUsuario(token);

        if (data.success) {
          setRows(data.result);
        } else {
          setError('Falha ao carregar os Tipos de usuarios!');
        }
      } catch {
        setError('Erro de rede');
      }
    })();
  }, []);

  function handleAddClick() {
    setCurrentData({
        id_tipo_usuario: null,
        ds_tipo_usuario: '',
        fg_ativo: 1 ,
    });
    setMode('form');
  }

  function handleEditClick(row) {
    setCurrentData({ ...row });
    setMode('form');
  }

  function handleBackClick() {
    setMode('view');
  }

  async function handleSaveClick(e) {
    e.preventDefault();
    setError(null);

    try {
      const service = new tipousuarioService();
      const token = localStorage.getItem('token');
      const idUser = localStorage.getItem('idUser');

      const payload = {
        ds_tipo_usuario: currentData.ds_tipo_usuario,
        fg_ativo: currentData.fg_ativo,
        id_usuario_criacao: idUser,
        id_usuario_ultima_alteracao: idUser
      };

      if (currentData.id_tipo_usuario) {
        await service.updateTipoUsuario(payload, token, currentData.id_tipo_usuario);
        setSuccessMessage('Registro alterado com sucesso!');
      } else {
        await service.createStatusMaquina(payload, token);
        setSuccessMessage('Registro incluído com sucesso!');
      }

      const data = await service.getTipoUsuario(token);
      if (data.success) {
        setRows(data.result);
      }

      setOpenSnackbar(true);
      setMode('view');
    } catch (err) {
      console.error('Erro ao salvar o Tipo de Usuario:', err);
      setError('Erro ao salvar o Tipo de Usuario');
    }
  }

  const columns = [
    { field: 'id_tipo_usuario', headerName: 'ID', width: 70 },
    { field: 'ds_tipo_usuario', headerName: 'Tipo de Usuário', width: 400 },
    {
      field: 'fg_ativo',
      headerName: 'Ativo',
      width: 90,
      renderCell: (params) =>
        params.value === 1 ? (
          <span style={{ color: 'green' }}>Ativo</span>
        ) : (
          <span style={{ color: 'red' }}>Inativo</span>
        ),
    },
    {
      field: 'editar',
      headerName: 'Ações',
      width: 130,
      renderCell: (params) => (
        <Button onClick={() => handleEditClick(params.row)}>
          <EditCalendarIcon />
        </Button>
      ),
    },
  ];

  return (
    <Paper sx={{ height: 500, width: '100%', p: 2, position: 'relative' }}>
      {mode === 'view' && (
        <>
          <div className="adicionar-container">
            <button className="adicionar-btn" onClick={handleAddClick}>
              + Adicionar
            </button>
          </div>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            disableMultipleRowSelection
            getRowId={(row) => row.id_tipo_usuario}
            sx={{ border: 0 }}
          />
        </>
      )}

      {mode === 'form' && (
        <div className="form-container">
          <div className="back-btn-container">
            <Button startIcon={<ArrowBackIcon />} onClick={handleBackClick}>
              Voltar
            </Button>
          </div>
          <form className="user-form" onSubmit={handleSaveClick}>
            <TextField
              label="Tipo de Usuário"
              value={currentData.ds_tipo_usuario}
              onChange={(e) =>
                setCurrentData({ ...currentData, ds_tipo_usuario: e.target.value })
              }
              required
            />
            <FormControlLabel
              control={
                <Switch
                  checked={currentData.fg_ativo === 1}
                  onChange={(e) =>
                    setCurrentData({
                      ...currentData,
                      fg_ativo: e.target.checked ? 1 : 0,
                    })
                  }
                />
              }
              label="Ativo"
            />

            <div className="form-buttons">
              <Button type="submit" variant="contained">
                Salvar
              </Button>
            </div>
          </form>
        </div>
      )}

      {error && <p className="error-msg">{error}</p>}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{
            width: '100%',
            background: 'linear-gradient(to right, #4caf50, #81c784)',
            color: '#fff',
            fontWeight: 'bold',
            boxShadow: '0 3px 6px rgba(0,0,0,0.2)',
          }}
          elevation={6}
          variant="filled"
        >
          {successMessage}
        </MuiAlert>
      </Snackbar>
    </Paper>
  );
}
