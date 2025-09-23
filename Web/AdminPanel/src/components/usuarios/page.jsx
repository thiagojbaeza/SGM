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
import loginService from '../../services/login';
import './usuarios.css';

export default function UsuariosPage() {
  const [rows, setRows] = useState([]);
  const [mode, setMode] = useState('view');
  const [currentUser, setCurrentUser] = useState({
    id_usuario: null,
    ds_nome_usuario: '',
    ds_senha: '',
    id_tipo_usuario: '',
    fg_ativo: 1,
  });
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
      } catch {
        setError('Erro de rede');
      }
    })();
  }, []);

  function handleAddClick() {
    setCurrentUser({
      id_usuario: null,
      ds_nome_usuario: '',
      ds_senha: '',
      id_tipo_usuario: '',
      fg_ativo: 1,
    });
    setMode('form');
  }

  function handleEditClick(row) {
    setCurrentUser({ ...row });
    setMode('form');
  }

  function handleBackClick() {
    setMode('view');
  }

  async function handleSaveClick(e) {
    e.preventDefault();
    try {
      const service = new loginService();
      const token = localStorage.getItem('token');

      if (currentUser.id_usuario) {
        await service.updateUsuario(token, currentUser);
      } else {
        await service.createUsuario(token, currentUser);
      }

      const data = await service.getUsuarios(token);
      if (data.success) {
        setRows(data.result);
      }
      setMode('view');
    } catch {
      setError('Erro ao salvar usuário');
    }
  }

  async function handleDeleteClick() {
    if (!currentUser.id_usuario) return;
    try {
      const service = new loginService();
      const token = localStorage.getItem('token');
      await service.deleteUsuario(token, currentUser.id_usuario);

      const data = await service.getUsuarios(token);
      if (data.success) {
        setRows(data.result);
      }
      setMode('view');
    } catch {
      setError('Erro ao deletar usuário');
    }
  }

  const columns = [
    { field: 'id_usuario', headerName: 'ID', width: 70 },
    { field: 'ds_nome_usuario', headerName: 'Usuário', width: 300 },
    { field: 'ds_senha', headerName: 'Senha', width: 130 },
    {
      field: 'id_tipo_usuario',
      headerName: 'Tipo Usuário',
      width: 150,
    },
    {
      field: 'fg_ativo',
      headerName: 'Ativo',
      width: 130,
      renderCell: (params) =>
        params.value === 1 ? (
          <span style={{ color: 'green' }}>Ativo</span>
        ) : (
          <span style={{ color: 'red' }}>Inativo</span>
        ),
    },
    {
      field: 'editar',
      headerName: 'EDITAR',
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
            getRowId={(row) => row.id_usuario}
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
              label="Usuário"
              value={currentUser.ds_nome_usuario}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, ds_nome_usuario: e.target.value })
              }
              required
            />
            <TextField
              label="Senha"
              type="password"
              value={currentUser.ds_senha}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, ds_senha: e.target.value })
              }
              required
            />

            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="tipo-usuario-label">Tipo de Usuário</InputLabel>
              <Select
                labelId="tipo-usuario-label"
                value={currentUser.id_tipo_usuario}
                label="Tipo de Usuário"
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, id_tipo_usuario: e.target.value })
                }
                required
              >
                <MenuItem value={1}>Administrador</MenuItem>
                <MenuItem value={2}>Comum</MenuItem>
              </Select>
            </FormControl>

            <FormControlLabel
              control={
                <Switch
                  checked={currentUser.fg_ativo === 1}
                  onChange={(e) =>
                    setCurrentUser({
                      ...currentUser,
                      fg_ativo: e.target.checked ? 1 : 0,
                    })
                  }
                />
              }
              label="Ativo"
            />

            <div className="form-buttons">
              {currentUser.id_usuario && (
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#FFA500',
                    '&:hover': { backgroundColor: '#FF8C00' },
                  }}
                  onClick={handleSaveClick}
                >
                  Alterar
                </Button>
              )}
              {currentUser.id_usuario && (
                <Button variant="contained" color="error" onClick={handleDeleteClick}>
                  Deletar
                </Button>
              )}
              <Button type="submit" variant="contained">
                Salvar
              </Button>
            </div>
          </form>
        </div>
      )}

      {error && <p className="error-msg">{error}</p>}
    </Paper>
  );
}
