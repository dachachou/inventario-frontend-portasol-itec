



import React, { useEffect, useState } from 'react';
import api from '../api';
import {
  Container, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';

function Historial() {
  const [eventos, setEventos] = useState([]);
  const [filtroEntidad, setFiltroEntidad] = useState('');

  useEffect(() => {
    api.get('/historial')
      .then(res => setEventos(res.data))
      .catch(err => console.error('Error al obtener historial:', err));
  }, []);

  // ✅ Filtrar por entidad (case-insensitive)
  const eventosFiltrados = filtroEntidad
    ? eventos.filter(e => e.entidad?.toLowerCase() === filtroEntidad.toLowerCase())
    : eventos;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Historial de Cambios
      </Typography>

      {/* Filtro por entidad */}
      <FormControl sx={{ mb: 2, minWidth: 200 }}>
        <InputLabel>Filtrar por entidad</InputLabel>
        <Select
          value={filtroEntidad}
          label="Filtrar por entidad"
          onChange={(e) => setFiltroEntidad(e.target.value)}
        >
          <MenuItem value="">Todas</MenuItem>
          <MenuItem value="dispositivos">Dispositivos</MenuItem>
          <MenuItem value="licencias">Licencias</MenuItem>
          <MenuItem value="empleados">Empleados</MenuItem>
          <MenuItem value="capacidades">Capacidades</MenuItem>
          <MenuItem value="direcciones_ip">IPs</MenuItem>
        </Select>
      </FormControl>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Entidad</strong></TableCell>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Acción</strong></TableCell>
              <TableCell><strong>Descripción</strong></TableCell>
              <TableCell><strong>Usuario</strong></TableCell>
              <TableCell><strong>Fecha</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {eventosFiltrados.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No hay registros para mostrar.
                </TableCell>
              </TableRow>
            ) : (
              eventosFiltrados.map((e, idx) => (
                <TableRow key={idx}>
                  <TableCell>{e.entidad}</TableCell>
                  <TableCell>{e.entidad_id}</TableCell>
                  <TableCell>{e.accion}</TableCell>
                  <TableCell>{e.descripcion}</TableCell>
                  <TableCell>{e.usuario}</TableCell>
                  <TableCell>{new Date(e.fecha).toLocaleString()}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Historial;


