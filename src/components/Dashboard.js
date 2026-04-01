
//import { Button } from '@mui/material';
//import { AlertTitle } from '@mui/material';

/*

import React, { useEffect, useState } from 'react';
import api from '../api';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';

function Dashboard() {
  const [empleados, setEmpleados] = useState([]);
  const [dispositivos, setDispositivos] = useState([]);
  const [licencias, setLicencias] = useState([]);
  const [ips, setIps] = useState([]);

  useEffect(() => {
    api.get('/empleados').then(res => setEmpleados(res.data));
    api.get('/dispositivos').then(res => setDispositivos(res.data));
    api.get('/licencias').then(res => setLicencias(res.data));
    api.get('/ips').then(res => setIps(res.data));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Dashboard Inventario IT</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Empleados</Typography>
              <Typography variant="h4">{empleados.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Dispositivos</Typography>
              <Typography variant="h4">{dispositivos.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Licencias</Typography>
              <Typography variant="h4">{licencias.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">IPs</Typography>
              <Typography variant="h4">{ips.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;

*/





/*
//import { Alert, AlertTitle, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import api from '../api';
import { Container, Grid, Card, CardContent, Typography, Alert } from '@mui/material';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function Dashboard() {
  const [empleados, setEmpleados] = useState([]);
  const [dispositivos, setDispositivos] = useState([]);
  const [licencias, setLicencias] = useState([]);
  const [ips, setIps] = useState([]);
  const [alertas, setAlertas] = useState([]);
  const [capacidades, setCapacidades] = useState([]);


  useEffect(() => {
    api.get('/empleados').then(res => setEmpleados(res.data));
    api.get('/dispositivos').then(res => setDispositivos(res.data));
    api.get('/licencias').then(res => setLicencias(res.data));
    api.get('/ips').then(res => setIps(res.data));
    api.get('/capacidades').then(res => setCapacidades(res.data)); // ✅ nuevo
  }, []);

  // Agrupar dispositivos por tipo
  const dispositivosPorTipo = dispositivos.reduce((acc, d) => {
    acc[d.tipo] = (acc[d.tipo] || 0) + 1;
    return acc;
  }, {});

  const chartDataDispositivos = {
    labels: Object.keys(dispositivosPorTipo),
    datasets: [
      {
        label: 'Cantidad de dispositivos',
        data: Object.values(dispositivosPorTipo),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      }
    ]
  };

  // Licencias vigentes vs expiradas
  const hoy = new Date();
  const vigentes = licencias.filter(l => new Date(l.fecha_expiracion) > hoy).length;
  const expiradas = licencias.filter(l => new Date(l.fecha_expiracion) <= hoy).length;

  const chartDataLicencias = {
    labels: ['Vigentes', 'Expiradas'],
    datasets: [
      {
        data: [vigentes, expiradas],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      }
    ]
  };

  // Detectar licencias próximas a expirar (menos de 30 días)
  useEffect(() => {
  const hoy = new Date(); // mover aquí
  const proximas = licencias.filter(l => {
    const fecha = new Date(l.fecha_expiracion);
    const diff = (fecha - hoy) / (1000 * 60 * 60 * 24);
    return diff > 0 && diff <= 30;
  });



    if (proximas.length > 0) {
    setAlertas(proximas.map(l => `La licencia ${l.nombre_software} expira el ${l.fecha_expiracion}`));
  }
}, [licencias]); // solo depende de licencias



  return (
    <Container>
      <Typography variant="h4" gutterBottom>Dashboard Inventario IT</Typography>

      {alertas.map((licencia, idx) => (
  <Alert severity="warning" key={idx} style={{ marginBottom: '10px' }}>
    <AlertTitle>Licencia próxima a expirar</AlertTitle>
    {`La licencia ${licencia.nombre_software} expira el ${licencia.fecha_expiracion}`}
    <div style={{ marginTop: '10px' }}>
      <Button 
        variant="contained" 
        color="primary" 
        size="small" 
        onClick={() => console.log("Renovar licencia", licencia)}
      >
        Renovar
      </Button>
      <Button 
        variant="outlined" 
        color="secondary" 
        size="small" 
        style={{ marginLeft: '10px' }}
        onClick={() => console.log("Editar licencia", licencia)}
      >
        Editar
      </Button>
    </div>
  </Alert>
))}

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card><CardContent>
            <Typography variant="h6">Empleados</Typography>
            <Typography variant="h4">{empleados.length}</Typography>
          </CardContent></Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card><CardContent>
            <Typography variant="h6">Dispositivos</Typography>
            <Typography variant="h4">{dispositivos.length}</Typography>
          </CardContent></Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card><CardContent>
            <Typography variant="h6">Licencias</Typography>
            <Typography variant="h4">{licencias.length}</Typography>
          </CardContent></Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card><CardContent>
            <Typography variant="h6">IPs</Typography>
            <Typography variant="h4">{ips.length}</Typography>
          </CardContent></Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card><CardContent>
            <Typography variant="h6">Capacidades</Typography>
            <Typography variant="h4">{capacidades.length}</Typography>
          </CardContent></Card>
        </Grid>



      </Grid>

      <Typography variant="h5" style={{ marginTop: '30px' }}>Distribución de dispositivos por tipo</Typography>
      <Bar data={chartDataDispositivos} />

      <Typography variant="h5" style={{ marginTop: '30px' }}>Licencias vigentes vs expiradas</Typography>
      <Pie data={chartDataLicencias} />
    </Container>
  );
}

export default Dashboard;


*/



/*
//FUNCIONA BIEN
import React, { useEffect, useState } from 'react';
import api from '../api';
import {
  Container, Grid, Card, CardContent, Typography,
  Alert, AlertTitle, Button
} from '@mui/material';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement,
  Title, Tooltip, Legend, ArcElement
} from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function Dashboard() {
  const [empleados, setEmpleados] = useState([]);
  const [dispositivos, setDispositivos] = useState([]);
  const [licencias, setLicencias] = useState([]);
  const [ips, setIps] = useState([]);
  const [alertas, setAlertas] = useState([]);
  const [capacidades, setCapacidades] = useState([]);
   //const [inventario_software, setInventarioSoftware] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/empleados').then(res => setEmpleados(res.data));
    api.get('/dispositivos').then(res => setDispositivos(res.data));
    api.get('/licencias').then(res => setLicencias(res.data));
    api.get('/ips').then(res => setIps(res.data));
    api.get('/capacidades').then(res => setCapacidades(res.data));
  }, []);

  // Agrupar dispositivos por tipo
  const dispositivosPorTipo = dispositivos.reduce((acc, d) => {
    acc[d.tipo] = (acc[d.tipo] || 0) + 1;
    return acc;
  }, {});

  const chartDataDispositivos = {
    labels: Object.keys(dispositivosPorTipo),
    datasets: [
      {
        label: 'Cantidad de dispositivos',
        data: Object.values(dispositivosPorTipo),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      }
    ]
  };

  // Licencias vigentes vs expiradas
  const hoy = new Date();
  const vigentes = licencias.filter(l => new Date(l.fecha_expiracion) > hoy).length;
  const expiradas = licencias.filter(l => new Date(l.fecha_expiracion) <= hoy).length;

  const chartDataLicencias = {
    labels: ['Vigentes', 'Expiradas'],
    datasets: [
      {
        data: [vigentes, expiradas],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      }
    ]
  };

  // Detectar licencias próximas a expirar (menos de 30 días)
  useEffect(() => {
    const hoy = new Date();
    const proximas = licencias.filter(l => {
      const fecha = new Date(l.fecha_expiracion);
      const diff = (fecha - hoy) / (1000 * 60 * 60 * 24);
      return diff > 0 && diff <= 30;
    });

    setAlertas(proximas);
  }, [licencias]);

  // Función para renovar licencia (+1 año)
  const renovarLicencia = async (id) => {
    try {
      const nuevaFecha = new Date();
      nuevaFecha.setFullYear(nuevaFecha.getFullYear() + 1);
      const res = await api.put(`/licencias/${id}`, {
        fecha_expiracion: nuevaFecha.toISOString().split('T')[0]
      });
      alert(`Licencia renovada hasta ${res.data.fecha_expiracion}`);
    } catch (err) {
      console.error('Error al renovar licencia:', err);
    }
  };

  // Función para editar licencia
  const editarLicencia = (id) => {
    navigate(`/licencias/${id}`);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Dashboard Inventario IT</Typography>

      {alertas.map((l, idx) => (
        <Alert severity="warning" key={idx} style={{ marginBottom: '10px' }}>
          <AlertTitle>Licencia próxima a expirar</AlertTitle>
          {`La licencia ${l.nombre_software} expira el ${new Date(l.fecha_expiracion).toLocaleDateString()}`}
          <div style={{ marginTop: '10px' }}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => renovarLicencia(l.licencia_id)}
            >
              Renovar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              style={{ marginLeft: '10px' }}
              onClick={() => editarLicencia(l.licencia_id)}
            >
              Editar
            </Button>
          </div>
        </Alert>
      ))}

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card><CardContent>
            <Typography variant="h6">Empleados</Typography>
            <Typography variant="h4">{empleados.length}</Typography>
          </CardContent></Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card><CardContent>
            <Typography variant="h6">Dispositivos</Typography>
            <Typography variant="h4">{dispositivos.length}</Typography>
          </CardContent></Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card><CardContent>
            <Typography variant="h6">Licencias</Typography>
            <Typography variant="h4">{licencias.length}</Typography>
          </CardContent></Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card><CardContent>
            <Typography variant="h6">IPs</Typography>
            <Typography variant="h4">{ips.length}</Typography>
          </CardContent></Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card><CardContent>
            <Typography variant="h6">Capacidades</Typography>
            <Typography variant="h4">{capacidades.length}</Typography>
          </CardContent></Card>
        </Grid>
      </Grid>

      <Typography variant="h5" style={{ marginTop: '30px' }}>Distribución de dispositivos por tipo</Typography>
      <Bar data={chartDataDispositivos} />

      <Typography variant="h5" style={{ marginTop: '30px' }}>Licencias vigentes vs expiradas</Typography>
      <Pie data={chartDataLicencias} />
    </Container>
  );
}

export default Dashboard;
*/



import React, { useEffect, useState } from 'react';
import api from '../api';
import {
  Container, Grid, Card, CardContent, Typography,
  Alert, AlertTitle, Button, Table, TableHead, TableRow, TableCell, TableBody
} from '@mui/material';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement,
  Title, Tooltip, Legend, ArcElement
} from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function Dashboard() {
  const [empleados, setEmpleados] = useState([]);
  const [dispositivos, setDispositivos] = useState([]);
  const [licencias, setLicencias] = useState([]);
  const [direcciones_ip, setIps] = useState([]);
  const [alertas, setAlertas] = useState([]);
  const [capacidades, setCapacidades] = useState([]);
  const [inventarioSoftware, setInventarioSoftware] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/empleados').then(res => setEmpleados(res.data));
    api.get('/dispositivos').then(res => setDispositivos(res.data));
    api.get('/licencias').then(res => setLicencias(res.data));
    api.get('/direcciones_ip').then(res => setIps(res.data));
    api.get('/capacidades').then(res => setCapacidades(res.data));
    api.get('/inventariosoftware').then(res => setInventarioSoftware(res.data));
  }, []);

  // Agrupar dispositivos por tipo
  const dispositivosPorTipo = dispositivos.reduce((acc, d) => {
    acc[d.tipo] = (acc[d.tipo] || 0) + 1;
    return acc;
  }, {});

  const chartDataDispositivos = {
    labels: Object.keys(dispositivosPorTipo),
    datasets: [
      {
        label: 'Cantidad de dispositivos',
        data: Object.values(dispositivosPorTipo),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      }
    ]
  };

  // Licencias vigentes vs expiradas
  const hoy = new Date();
  const vigentes = licencias.filter(l => new Date(l.fecha_expiracion) > hoy).length;
  const expiradas = licencias.filter(l => new Date(l.fecha_expiracion) <= hoy).length;

  const chartDataLicencias = {
    labels: ['Vigentes', 'Expiradas'],
    datasets: [
      {
        data: [vigentes, expiradas],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      }
    ]
  };

  // Detectar licencias próximas a expirar (menos de 30 días)
  useEffect(() => {
    const hoy = new Date();
    const proximas = licencias.filter(l => {
      const fecha = new Date(l.fecha_expiracion);
      const diff = (fecha - hoy) / (1000 * 60 * 60 * 24);
      return diff > 0 && diff <= 30;
    });

    setAlertas(proximas);
  }, [licencias]);

  // Función para renovar licencia (+1 año)
  const renovarLicencia = async (id) => {
    try {
      const nuevaFecha = new Date();
      nuevaFecha.setFullYear(nuevaFecha.getFullYear() + 1);
      const res = await api.put(`/licencias/${id}`, {
        fecha_expiracion: nuevaFecha.toISOString().split('T')[0]
      });
      alert(`Licencia renovada hasta ${res.data.fecha_expiracion}`);
    } catch (err) {
      console.error('Error al renovar licencia:', err);
    }
  };

  // Función para editar licencia
  const editarLicencia = (id) => {
    navigate(`/licencias/${id}`);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Dashboard Inventario IT</Typography>

      {alertas.map((l, idx) => (
        <Alert severity="warning" key={idx} style={{ marginBottom: '10px' }}>
          <AlertTitle>Licencia próxima a expirar</AlertTitle>
          {`La licencia ${l.nombre_software} expira el ${new Date(l.fecha_expiracion).toLocaleDateString()}`}
          <div style={{ marginTop: '10px' }}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => renovarLicencia(l.licencia_id)}
            >
              Renovar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              style={{ marginLeft: '10px' }}
              onClick={() => editarLicencia(l.licencia_id)}
            >
              Editar
            </Button>
          </div>
        </Alert>
      ))}

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card><CardContent>
            <Typography variant="h6">Empleados</Typography>
            <Typography variant="h4">{empleados.length}</Typography>
          </CardContent></Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card><CardContent>
            <Typography variant="h6">Dispositivos</Typography>
            <Typography variant="h4">{dispositivos.length}</Typography>
          </CardContent></Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card><CardContent>
            <Typography variant="h6">Licencias</Typography>
            <Typography variant="h4">{licencias.length}</Typography>
          </CardContent></Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card><CardContent>
            <Typography variant="h6">IPs</Typography>
            <Typography variant="h4">{direcciones_ip.length}</Typography>
          </CardContent></Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card><CardContent>
            <Typography variant="h6">Capacidades</Typography>
            <Typography variant="h4">{capacidades.length}</Typography>
          </CardContent></Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card><CardContent>
            <Typography variant="h6">Inventario Software</Typography>
            <Typography variant="h4">{inventarioSoftware.length}</Typography>
          </CardContent></Card>
        </Grid>
      </Grid>

      <Typography variant="h5" style={{ marginTop: '30px' }}>Distribución de dispositivos por tipo</Typography>
      <Bar data={chartDataDispositivos} />

      <Typography variant="h5" style={{ marginTop: '30px' }}>Licencias vigentes vs expiradas</Typography>
      <Pie data={chartDataLicencias} />

      <Typography variant="h5" style={{ marginTop: '30px' }}>Inventario de Software</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Versión</TableCell>
            <TableCell>Fabricante</TableCell>
            <TableCell>Fecha Instalación</TableCell>
            <TableCell>Tamaño</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inventarioSoftware.map((p, idx) => (
            <TableRow key={idx}>
              <TableCell>{p.nombre}</TableCell>
              <TableCell>{p.version}</TableCell>
              <TableCell>{p.fabricante}</TableCell>
              <TableCell>{p.fecha_instalacion}</TableCell>
              <TableCell>{p.tamano}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default Dashboard;