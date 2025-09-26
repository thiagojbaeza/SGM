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
import tipousuarioService from '../../services/tipousuario';

import './usuarios.css';

export default function UsuariosPage() {
  const [rows, setRows] = useState([]);
  const [mode, setMode] = useState('view');
  const [currentUser, setCurrentUser] = useState({
    id_usuario: null,
    ds_nome_usuario: '',
    ds_senha: '',
    id_tipo_usuario: null,
    fg_ativo: 1,
  });
  const [error, setError] = useState(null);
  const [tipoUsuario, setTipoUsuario] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const service = new loginService();
        const token = localStorage.getItem('token');
        const serviceTipoUsuario = new tipousuarioService();
        const dataTipoUsuario = await serviceTipoUsuario.getTipoUsuario(token);

        if (dataTipoUsuario.success) {
          setTipoUsuario(dataTipoUsuario.result);
        }

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
      id_tipo_usuario: null,
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
    setError(null);

    try {
      const service = new loginService();
      const token = localStorage.getItem('token');
      const idUser = 1;

      const payload = {
        ds_nome_usuario: currentUser.ds_nome_usuario,
        ds_senha: currentUser.ds_senha,
        fg_ativo: currentUser.fg_ativo,
        id_tipo_usuario: currentUser.id_tipo_usuario,
        id_usuario_criacao: idUser,
        id_usuario_ultima_alteracao: idUser
      };

      if (currentUser.id_usuario) {
        await service.updateUsuario(payload, token, currentUser.id_usuario);
      } else {
        await service.createUsuario(payload, token);
      }

      const data = await service.getUsuarios(token);
      if (data.success) {
        setRows(data.result);
      }
      setMode('view');
    } catch (err) {
      console.error('Erro ao salvar usuário:', err);
      setError('Erro ao salvar usuário');
    }
  }

  const columns = [
    { field: 'id_usuario', headerName: 'ID', width: 70 },
    { field: 'ds_nome_usuario', headerName: 'Usuário', width: 300 },
    { field: 'ds_senha', headerName: 'Senha', width: 130 },
    {
      field: 'ds_tipo_usuario',
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
                value={currentUser.id_tipo_usuario}
                label="Tipo de Usuário"
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, id_tipo_usuario: e.target.value })
                }
                required
              >
                {tipoUsuario?.map((item) => (
                  <MenuItem key={item.id_tipo_usuario} value={item.id_tipo_usuario}>
                    {item.ds_tipo_usuario}
                  </MenuItem>
                ))}
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
