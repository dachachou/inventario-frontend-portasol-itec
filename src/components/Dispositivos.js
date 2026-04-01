/*
// src/components/Dispositivos.js
import React, { useEffect, useState } from 'react';
import api from '../api';
import {
  Container, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, TextField, Button
} from '@mui/material';

function Dispositivos() {
  const [dispositivos, setDispositivos] = useState([]);
  const [nuevo, setNuevo] = useState({ hostname: '', tipo: '', fabricante: '' });

  useEffect(() => {
    api.get('/dispositivos').then(res => setDispositivos(res.data));
  }, []);

  const agregarDispositivo = async () => {
    const res = await api.post('/dispositivos', nuevo);
    setDispositivos([...dispositivos, res.data]);
    setNuevo({ hostname: '', tipo: '', fabricante: '' });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Dispositivos</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Hostname</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Fabricante</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dispositivos.map(d => (
              <TableRow key={d.dispositivo_id}>
                <TableCell>{d.dispositivo_id}</TableCell>
                <TableCell>{d.hostname}</TableCell>
                <TableCell>{d.tipo}</TableCell>
                <TableCell>{d.fabricante}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
        Agregar nuevo dispositivo
      </Typography>
      <TextField label="Hostname" value={nuevo.hostname} onChange={e => setNuevo({...nuevo, hostname: e.target.value})}/>
      <TextField label="Tipo" value={nuevo.tipo} onChange={e => setNuevo({...nuevo, tipo: e.target.value})}/>
      <TextField label="Fabricante" value={nuevo.fabricante} onChange={e => setNuevo({...nuevo, fabricante: e.target.value})}/>
      <Button variant="contained" color="primary" onClick={agregarDispositivo} style={{ marginLeft: '10px' }}>
        Guardar
      </Button>
    </Container>
  );
}

export default Dispositivos;

*/



/*

import React, { useEffect, useState } from 'react';
import api from '../api';
import {
  Container, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, TextField, Button
} from '@mui/material';

function Dispositivos() {
  const [dispositivos, setDispositivos] = useState([]);
  const [nuevo, setNuevo] = useState({ hostname: '', tipo: '', fabricante: '', descripcion: '' });
  const [editando, setEditando] = useState(null);

  // Cargar dispositivos
  useEffect(() => {
    api.get('/dispositivos')
      .then(res => setDispositivos(res.data))
      .catch(err => console.error('Error al obtener dispositivos:', err));
  }, []);

  // Manejar cambios en formulario
  const handleChange = (e) => {
    if (editando) {
      setEditando({ ...editando, [e.target.name]: e.target.value });
    } else {
      setNuevo({ ...nuevo, [e.target.name]: e.target.value });
    }
  };

  // Guardar (crear o actualizar)
  const handleSubmit = async () => {
    try {
      if (editando) {
        const res = await api.put(`/dispositivos/${editando.dispositivo_id}`, editando);
        setDispositivos(dispositivos.map(d =>
          d.dispositivo_id === editando.dispositivo_id ? res.data : d
        ));
        setEditando(null);
      } else {
        const res = await api.post('/dispositivos', nuevo);
        setDispositivos([...dispositivos, res.data]);
        setNuevo({ hostname: '', tipo: '', fabricante: '', descripcion: '' });
      }
    } catch (err) {
      console.error('Error al guardar dispositivo:', err);
    }
  };

  // Eliminar
  const handleDelete = async (id) => {
    try {
      await api.delete(`/dispositivos/${id}`);
      setDispositivos(dispositivos.filter(d => d.dispositivo_id !== id));
    } catch (err) {
      console.error('Error al eliminar dispositivo:', err);
    }
  };

  // Activar edición
  const handleEdit = (d) => {
    setEditando(d);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Dispositivos</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Hostname</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Fabricante</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dispositivos.map(d => (
              <TableRow key={d.dispositivo_id}>
                <TableCell>{d.dispositivo_id}</TableCell>
                <TableCell>{d.hostname}</TableCell>
                <TableCell>{d.tipo}</TableCell>
                <TableCell>{d.fabricante}</TableCell>
                <TableCell>{d.descripcion}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(d)}>Editar</Button>
                  <Button color="error" onClick={() => handleDelete(d.dispositivo_id)}>Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
        {editando ? 'Editar dispositivo' : 'Agregar nuevo dispositivo'}
      </Typography>
      <TextField label="Hostname" name="hostname" value={editando ? editando.hostname : nuevo.hostname} onChange={handleChange}/>
      <TextField label="Tipo" name="tipo" value={editando ? editando.tipo : nuevo.tipo} onChange={handleChange}/>
      <TextField label="Fabricante" name="fabricante" value={editando ? editando.fabricante : nuevo.fabricante} onChange={handleChange}/>
      <TextField label="Descripción" name="descripcion" value={editando ? editando.descripcion : nuevo.descripcion} onChange={handleChange}/>
      <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginLeft: '10px' }}>
        {editando ? 'Actualizar' : 'Guardar'}
      </Button>
      {editando && (
        <Button variant="outlined" onClick={() => setEditando(null)} style={{ marginLeft: '10px' }}>
          Cancelar
        </Button>
      )}
    </Container>
  );
}

export default Dispositivos;


*/


import React, { useEffect, useState } from 'react';
import api from '../api';
import {
  Container, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, TextField, Button
} from '@mui/material';

function Dispositivos() {
  const [dispositivos, setDispositivos] = useState([]);
  const [nuevo, setNuevo] = useState({
    hostname: '', tipo: '', fabricante: '', descripcion: '',
    modelo: '', numero_serie: '', estado: '', empleado_id: '', fecha_asignacion: ''
  });
  const [editando, setEditando] = useState(null);

  // Cargar dispositivos
  useEffect(() => {
    api.get('/dispositivos')
      .then(res => setDispositivos(res.data))
      .catch(err => console.error('Error al obtener dispositivos:', err));
  }, []);

  // Manejar cambios en formulario
  const handleChange = (e) => {
    if (editando) {
      setEditando({ ...editando, [e.target.name]: e.target.value });
    } else {
      setNuevo({ ...nuevo, [e.target.name]: e.target.value });
    }
  };

  // Guardar (crear o actualizar)
  const handleSubmit = async () => {
    try {
      if (editando) {
        const res = await api.put(`/dispositivos/${editando.dispositivo_id}`, editando);
        setDispositivos(dispositivos.map(d =>
          d.dispositivo_id === editando.dispositivo_id ? res.data : d
        ));
        setEditando(null);
      } else {
        const res = await api.post('/dispositivos', nuevo);
        setDispositivos([...dispositivos, res.data]);
        setNuevo({
          hostname: '', tipo: '', fabricante: '', descripcion: '',
          modelo: '', numero_serie: '', estado: '', empleado_id: '', fecha_asignacion: ''
        });
      }
    } catch (err) {
      console.error('Error al guardar dispositivo:', err);
    }
  };

  // Eliminar
  const handleDelete = async (id) => {
    try {
      await api.delete(`/dispositivos/${id}`);
      setDispositivos(dispositivos.filter(d => d.dispositivo_id !== id));
    } catch (err) {
      console.error('Error al eliminar dispositivo:', err);
    }
  };

  // Activar edición
  const handleEdit = (d) => {
    setEditando(d);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Dispositivos</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Hostname</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Fabricante</TableCell>
              <TableCell>Modelo</TableCell>
              <TableCell>Número de Serie</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Empleado ID</TableCell>
              <TableCell>Fecha Asignación</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dispositivos.map(d => (
              <TableRow key={d.dispositivo_id}>
                <TableCell>{d.dispositivo_id}</TableCell>
                <TableCell>{d.hostname}</TableCell>
                <TableCell>{d.tipo}</TableCell>
                <TableCell>{d.fabricante}</TableCell>
                <TableCell>{d.modelo}</TableCell>
                <TableCell>{d.numero_serie}</TableCell>
                <TableCell>{d.estado}</TableCell>
                <TableCell>{d.empleado_id}</TableCell>
                <TableCell>{d.fecha_asignacion}</TableCell>
                <TableCell>{d.descripcion}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(d)}>Editar</Button>
                  <Button color="error" onClick={() => handleDelete(d.dispositivo_id)}>Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
        {editando ? 'Editar dispositivo' : 'Agregar nuevo dispositivo'}
      </Typography>
      <TextField label="Hostname" name="hostname" value={editando ? editando.hostname : nuevo.hostname} onChange={handleChange}/>
<TextField label="Tipo" name="tipo" value={editando ? editando.tipo : nuevo.tipo} onChange={handleChange}/>
<TextField label="Fabricante" name="fabricante" value={editando ? editando.fabricante : nuevo.fabricante} onChange={handleChange}/>
<TextField label="Modelo" name="modelo" value={editando ? editando.modelo : nuevo.modelo} onChange={handleChange}/>
<TextField label="Número de Serie" name="numero_serie" value={editando ? editando.numero_serie : nuevo.numero_serie} onChange={handleChange}/>
<TextField label="Estado" name="estado" value={editando ? editando.estado : nuevo.estado} onChange={handleChange}/>
<TextField label="Empleado ID" name="empleado_id" value={editando ? editando.empleado_id : nuevo.empleado_id} onChange={handleChange}/>
<TextField label="" name="fecha_asignacion" type="date" value={editando ? editando.fecha_asignacion : nuevo.fecha_asignacion} onChange={handleChange}/>
<TextField label="Descripción" name="descripcion" value={editando ? editando.descripcion : nuevo.descripcion} onChange={handleChange}/>
      <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginLeft: '10px' }}>
        {editando ? 'Actualizar' : 'Guardar'}
      </Button>
      {editando && (
        <Button variant="outlined" onClick={() => setEditando(null)} style={{ marginLeft: '10px' }}>
          Cancelar
        </Button>
      )}
    </Container>
  );
}

export default Dispositivos;