

/*

import React, { useEffect, useState } from 'react';
import api from '../api';
import { Container, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';

function Capacidades() {
  const [capacidades, setCapacidades] = useState([]);
  const [nueva, setNueva] = useState({
    memoria: '', disco_duro: '', tarjeta_grafica: '', procesador: '', dispositivo_id: ''
  });

  useEffect(() => {
    api.get('/capacidades').then(res => setCapacidades(res.data));
  }, []);

  const guardar = async () => {
    const res = await api.post('/capacidades', nueva);
    setCapacidades([...capacidades, res.data]);
    setNueva({ memoria: '', disco_duro: '', tarjeta_grafica: '', procesador: '', dispositivo_id: '' });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Capacidades</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Memoria</TableCell>
              <TableCell>Disco Duro</TableCell>
              <TableCell>Tarjeta Gráfica</TableCell>
              <TableCell>Procesador</TableCell>
              <TableCell>Dispositivo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {capacidades.map(c => (
              <TableRow key={c.capacidad_id}>
                <TableCell>{c.capacidad_id}</TableCell>
                <TableCell>{c.memoria}</TableCell>
                <TableCell>{c.disco_duro}</TableCell>
                <TableCell>{c.tarjeta_grafica}</TableCell>
                <TableCell>{c.procesador}</TableCell>
                <TableCell>{c.dispositivo_id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
        Agregar nueva capacidad
      </Typography>
      <TextField label="Memoria" value={nueva.memoria} onChange={e => setNueva({...nueva, memoria: e.target.value})}/>
      <TextField label="Disco Duro" value={nueva.disco_duro} onChange={e => setNueva({...nueva, disco_duro: e.target.value})}/>
      <TextField label="Tarjeta Gráfica" value={nueva.tarjeta_grafica} onChange={e => setNueva({...nueva, tarjeta_grafica: e.target.value})}/>
      <TextField label="Procesador" value={nueva.procesador} onChange={e => setNueva({...nueva, procesador: e.target.value})}/>
      <TextField label="ID Dispositivo" value={nueva.dispositivo_id} onChange={e => setNueva({...nueva, dispositivo_id: e.target.value})}/>
      <Button variant="contained" color="primary" onClick={guardar} style={{ marginLeft: '10px' }}>
        Guardar
      </Button>
    </Container>
  );
}

export default Capacidades;



*/


import React, { useEffect, useState } from 'react';
import api from '../api';
import {
  Container, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, TextField, Button
} from '@mui/material';

function Capacidades() {
  const [capacidades, setCapacidades] = useState([]);
  const [nueva, setNueva] = useState({
    memoria: '', disco_duro: '', tarjeta_grafica: '', procesador: '', dispositivo_id: ''
  });
  const [editando, setEditando] = useState(null);

  // Cargar capacidades
  useEffect(() => {
    api.get('/capacidades')
      .then(res => setCapacidades(res.data))
      .catch(err => console.error('Error al obtener capacidades:', err));
  }, []);

  // Manejar cambios en formulario
  const handleChange = (e) => {
    if (editando) {
      setEditando({ ...editando, [e.target.name]: e.target.value });
    } else {
      setNueva({ ...nueva, [e.target.name]: e.target.value });
    }
  };

  // Guardar (crear o actualizar)
  const handleSubmit = async () => {
    try {
      if (editando) {
        const res = await api.put(`/capacidades/${editando.capacidad_id}`, editando);
        setCapacidades(capacidades.map(c =>
          c.capacidad_id === editando.capacidad_id ? res.data : c
        ));
        setEditando(null);
      } else {
        const res = await api.post('/capacidades', nueva);
        setCapacidades([...capacidades, res.data]);
        setNueva({ memoria: '', disco_duro: '', tarjeta_grafica: '', procesador: '', dispositivo_id: '' });
      }
    } catch (err) {
      console.error('Error al guardar capacidad:', err);
    }
  };

  // Eliminar
  const handleDelete = async (id) => {
    try {
      await api.delete(`/capacidades/${id}`);
      setCapacidades(capacidades.filter(c => c.capacidad_id !== id));
    } catch (err) {
      console.error('Error al eliminar capacidad:', err);
    }
  };

  // Activar edición
  const handleEdit = (c) => {
    setEditando(c);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Capacidades</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Memoria</TableCell>
              <TableCell>Disco Duro</TableCell>
              <TableCell>Tarjeta Gráfica</TableCell>
              <TableCell>Procesador</TableCell>
              <TableCell>Dispositivo ID</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {capacidades.map(c => (
              <TableRow key={c.capacidad_id}>
                <TableCell>{c.capacidad_id}</TableCell>
                <TableCell>{c.memoria}</TableCell>
                <TableCell>{c.disco_duro}</TableCell>
                <TableCell>{c.tarjeta_grafica}</TableCell>
                <TableCell>{c.procesador}</TableCell>
                <TableCell>{c.dispositivo_id}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(c)}>Editar</Button>
                  <Button color="error" onClick={() => handleDelete(c.capacidad_id)}>Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
        {editando ? 'Editar capacidad' : 'Agregar nueva capacidad'}
      </Typography>
      <TextField label="Memoria" name="memoria" value={editando ? editando.memoria : nueva.memoria} onChange={handleChange}/>
      <TextField label="Disco Duro" name="disco_duro" value={editando ? editando.disco_duro : nueva.disco_duro} onChange={handleChange}/>
      <TextField label="Tarjeta Gráfica" name="tarjeta_grafica" value={editando ? editando.tarjeta_grafica : nueva.tarjeta_grafica} onChange={handleChange}/>
      <TextField label="Procesador" name="procesador" value={editando ? editando.procesador : nueva.procesador} onChange={handleChange}/>
      <TextField label="Dispositivo ID" name="dispositivo_id" value={editando ? editando.dispositivo_id : nueva.dispositivo_id} onChange={handleChange}/>
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

export default Capacidades;