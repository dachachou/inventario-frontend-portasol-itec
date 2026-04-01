


import React, { useEffect, useState } from 'react';
import api from '../api';
import {
  Container, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, TextField, Button
} from '@mui/material';

function IPs() {
  const [ips, setIps] = useState([]);
  const [nueva, setNueva] = useState({
    ip_address: '', mac_address: '', fecha_asignacion: '', dispositivo_id: ''
  });

  useEffect(() => {
    api.get('/ips').then(res => setIps(res.data));
  }, []);

  const agregarIP = async () => {
    const res = await api.post('/ips', nueva);
    setIps([...ips, res.data]);
    setNueva({ ip_address: '', mac_address: '', fecha_asignacion: '', dispositivo_id: '' });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Direcciones IP</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>IP</TableCell>
              <TableCell>MAC</TableCell>
              <TableCell>Fecha Asignación</TableCell>
              <TableCell>Dispositivo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ips.map(ip => (
              <TableRow key={ip.ip_id}>
                <TableCell>{ip.ip_id}</TableCell>
                <TableCell>{ip.ip_address}</TableCell>
                <TableCell>{ip.mac_address}</TableCell>
                <TableCell>{ip.fecha_asignacion}</TableCell>
                <TableCell>{ip.dispositivo_id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
        Agregar nueva IP
      </Typography>
      <TextField label="IP" value={nueva.ip_address} onChange={e => setNueva({...nueva, ip_address: e.target.value})}/>
      <TextField label="MAC" value={nueva.mac_address} onChange={e => setNueva({...nueva, mac_address: e.target.value})}/>
      <TextField label="Fecha (YYYY-MM-DD)" value={nueva.fecha_asignacion} onChange={e => setNueva({...nueva, fecha_asignacion: e.target.value})}/>
      <TextField label="Dispositivo ID" value={nueva.dispositivo_id} onChange={e => setNueva({...nueva, dispositivo_id: e.target.value})}/>
      <Button variant="contained" color="primary" onClick={agregarIP} style={{ marginLeft: '10px' }}>
        Guardar
      </Button>
    </Container>
  );
}

export default IPs;