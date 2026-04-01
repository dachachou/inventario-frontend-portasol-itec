
/*


import React, { useEffect, useState } from 'react';
import api from '../api';
import {
  Container, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, TextField, Button
} from '@mui/material';

function Licencias() {
  const [licencias, setLicencias] = useState([]);
  const [nueva, setNueva] = useState({
    nombre_software: '', version: '', clave: '', fecha_expiracion: '', dispositivo_id: ''
  });

  useEffect(() => {
    api.get('/licencias').then(res => setLicencias(res.data));
  }, []);

  const agregarLicencia = async () => {
    const res = await api.post('/licencias', nueva);
    setLicencias([...licencias, res.data]);
    setNueva({ nombre_software: '', version: '', clave: '', fecha_expiracion: '', dispositivo_id: '' });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Licencias</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Software</TableCell>
              <TableCell>Versión</TableCell>
              <TableCell>Clave</TableCell>
              <TableCell>Expiración</TableCell>
              <TableCell>Dispositivo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {licencias.map(l => (
              <TableRow key={l.licencia_id}>
                <TableCell>{l.licencia_id}</TableCell>
                <TableCell>{l.nombre_software}</TableCell>
                <TableCell>{l.version}</TableCell>
                <TableCell>{l.clave}</TableCell>
                <TableCell>{l.fecha_expiracion}</TableCell>
                <TableCell>{l.dispositivo_id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
        Agregar nueva licencia
      </Typography>
      <TextField label="Software" value={nueva.nombre_software} onChange={e => setNueva({...nueva, nombre_software: e.target.value})}/>
      <TextField label="Versión" value={nueva.version} onChange={e => setNueva({...nueva, version: e.target.value})}/>
      <TextField label="Clave" value={nueva.clave} onChange={e => setNueva({...nueva, clave: e.target.value})}/>
      <TextField label="Expiración (YYYY-MM-DD)" value={nueva.fecha_expiracion} onChange={e => setNueva({...nueva, fecha_expiracion: e.target.value})}/>
      <TextField label="Dispositivo ID" value={nueva.dispositivo_id} onChange={e => setNueva({...nueva, dispositivo_id: e.target.value})}/>
      <Button variant="contained" color="primary" onClick={agregarLicencia} style={{ marginLeft: '10px' }}>
        Guardar
      </Button>
    </Container>
  );
}

export default Licencias;

*/

/*

import React, { useEffect, useState } from 'react';
import api from '../api';
import {
  Container, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, TextField, Button
} from '@mui/material';

function Licencias() {
  const [licencias, setLicencias] = useState([]);
  const [nueva, setNueva] = useState({
    nombre: '', tipo: '', proveedor: '', fecha_inicio: '', fecha_expiracion: '', dispositivo_id: '', empleado_id: ''
  });
  const [editando, setEditando] = useState(null);

  // Cargar licencias
  useEffect(() => {
    api.get('/licencias')
      .then(res => setLicencias(res.data))
      .catch(err => console.error('Error al obtener licencias:', err));
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
        const res = await api.put(`/licencias/${editando.licencia_id}`, editando);
        setLicencias(licencias.map(l =>
          l.licencia_id === editando.licencia_id ? res.data : l
        ));
        setEditando(null);
      } else {
        const res = await api.post('/licencias', nueva);
        setLicencias([...licencias, res.data]);
        setNueva({ nombre: '', tipo: '', proveedor: '', fecha_inicio: '', fecha_expiracion: '', dispositivo_id: '', empleado_id: '' });
      }
    } catch (err) {
      console.error('Error al guardar licencia:', err);
    }
  };

  // Eliminar
  const handleDelete = async (id) => {
    try {
      await api.delete(`/licencias/${id}`);
      setLicencias(licencias.filter(l => l.licencia_id !== id));
    } catch (err) {
      console.error('Error al eliminar licencia:', err);
    }
  };

  // Activar edición
  const handleEdit = (l) => {
    setEditando(l);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Licencias</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Proveedor</TableCell>
              <TableCell>Fecha Inicio</TableCell>
              <TableCell>Fecha Expiración</TableCell>
              <TableCell>Dispositivo ID</TableCell>
              <TableCell>Empleado ID</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {licencias.map(l => (
              <TableRow key={l.licencia_id}>
                <TableCell>{l.licencia_id}</TableCell>
                <TableCell>{l.nombre}</TableCell>
                <TableCell>{l.tipo}</TableCell>
                <TableCell>{l.proveedor}</TableCell>
                <TableCell>{l.fecha_inicio}</TableCell>
                <TableCell>{l.fecha_expiracion}</TableCell>
                <TableCell>{l.dispositivo_id}</TableCell>
                <TableCell>{l.empleado_id}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(l)}>Editar</Button>
                  <Button color="error" onClick={() => handleDelete(l.licencia_id)}>Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
        {editando ? 'Editar licencia' : 'Agregar nueva licencia'}
      </Typography>
      <TextField label="Nombre" name="nombre" value={editando ? editando.nombre : nueva.nombre} onChange={handleChange}/>
      <TextField label="Tipo" name="tipo" value={editando ? editando.tipo : nueva.tipo} onChange={handleChange}/>
      <TextField label="Proveedor" name="proveedor" value={editando ? editando.proveedor : nueva.proveedor} onChange={handleChange}/>
      <TextField label="" name="fecha_inicio" type="date" value={editando ? editando.fecha_inicio : nueva.fecha_inicio} onChange={handleChange}/>
      <TextField label="" name="fecha_expiracion" type="date" value={editando ? editando.fecha_expiracion : nueva.fecha_expiracion} onChange={handleChange}/>
      <TextField label="Dispositivo ID" name="dispositivo_id" value={editando ? editando.dispositivo_id : nueva.dispositivo_id} onChange={handleChange}/>
      <TextField label="Empleado ID" name="empleado_id" value={editando ? editando.empleado_id : nueva.empleado_id} onChange={handleChange}/>
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

export default Licencias;








import React, { useEffect, useState } from 'react';
import api from '../api';
import {
  Container, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, TextField, Button
} from '@mui/material';

function Licencias() {
  const [licencias, setLicencias] = useState([]);
  const [nueva, setNueva] = useState({
    nombre_software: '', version: '', clave: '',
    fecha_inicio: '', fecha_expiracion: '',
    dispositivo_id: '', empleado_id: ''
  });
  const [editando, setEditando] = useState(null);

  // Cargar licencias
  useEffect(() => {
    api.get('/licencias')
      .then(res => setLicencias(res.data))
      .catch(err => console.error('Error al obtener licencias:', err));
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
        const res = await api.put(`/licencias/${editando.licencia_id}`, editando);
        setLicencias(licencias.map(l =>
          l.licencia_id === editando.licencia_id ? res.data : l
        ));
        setEditando(null);
      } else {
        const res = await api.post('/licencias', nueva);
        setLicencias([...licencias, res.data]);
        setNueva({
          nombre_software: '', version: '', clave: '',
          fecha_inicio: '', fecha_expiracion: '',
          dispositivo_id: '', empleado_id: ''
        });
      }
    } catch (err) {
      console.error('Error al guardar licencia:', err);
    }
  };

  // Eliminar
  const handleDelete = async (id) => {
    try {
      await api.delete(`/licencias/${id}`);
      setLicencias(licencias.filter(l => l.licencia_id !== id));
    } catch (err) {
      console.error('Error al eliminar licencia:', err);
    }
  };

  // Activar edición
  const handleEdit = (l) => {
    setEditando(l);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Licencias</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Software</TableCell>
              <TableCell>Versión</TableCell>
              <TableCell>Clave</TableCell>
              <TableCell>Fecha Inicio</TableCell>
              <TableCell>Fecha Expiración</TableCell>
              <TableCell>Dispositivo ID</TableCell>
              <TableCell>Empleado ID</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {licencias.map(l => (
              <TableRow key={l.licencia_id}>
                <TableCell>{l.licencia_id}</TableCell>
                <TableCell>{l.nombre_software}</TableCell>
                <TableCell>{l.version}</TableCell>
                <TableCell>{l.clave}</TableCell>
                <TableCell>{l.fecha_inicio}</TableCell>
                <TableCell>{l.fecha_expiracion}</TableCell>
                <TableCell>{l.dispositivo_id}</TableCell>
                <TableCell>{l.empleado_id}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(l)}>Editar</Button>
                  <Button color="error" onClick={() => handleDelete(l.licencia_id)}>Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
        {editando ? 'Editar licencia' : 'Agregar nueva licencia'}
      </Typography>
      <TextField label="Software" name="nombre_software" value={editando ? editando.nombre_software : nueva.nombre_software} onChange={handleChange}/>
      <TextField label="Versión" name="version" value={editando ? editando.version : nueva.version} onChange={handleChange}/>
      <TextField label="Clave" name="clave" value={editando ? editando.clave : nueva.clave} onChange={handleChange}/>
      <TextField label="Fecha Inicio" name="fecha_inicio" type="date" value={editando ? editando.fecha_inicio : nueva.fecha_inicio} onChange={handleChange}/>
      <TextField label="Fecha Expiración" name="fecha_expiracion" type="date" value={editando ? editando.fecha_expiracion : nueva.fecha_expiracion} onChange={handleChange}/>
      <TextField label="Dispositivo ID" name="dispositivo_id" value={editando ? editando.dispositivo_id : nueva.dispositivo_id} onChange={handleChange}/>
      <TextField label="Empleado ID" name="empleado_id" value={editando ? editando.empleado_id : nueva.empleado_id} onChange={handleChange}/>
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

export default Licencias;















import React, { useEffect, useState } from 'react';
import api from '../api';
import {
  Container, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, TextField, Button
} from '@mui/material';

function Licencias() {
  const [licencias, setLicencias] = useState([]);
  const [nueva, setNueva] = useState({
    nombre_software: '', version: '', clave: '',
    fecha_inicio: '', fecha_expiracion: '',
    dispositivo_id: '', empleado_id: ''
  });
  const [editando, setEditando] = useState(null);

  // Cargar licencias
  useEffect(() => {
    api.get('/licencias')
      .then(res => setLicencias(res.data))
      .catch(err => console.error('Error al obtener licencias:', err));
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
        const res = await api.put(`/licencias/${editando.licencia_id}`, editando);
        setLicencias(licencias.map(l =>
          l.licencia_id === editando.licencia_id ? res.data : l
        ));
        setEditando(null);
      } else {
        const res = await api.post('/licencias', nueva);
        setLicencias([...licencias, res.data]);
        setNueva({
          nombre_software: '', version: '', clave: '',
          fecha_inicio: '', fecha_expiracion: '',
          dispositivo_id: '', empleado_id: ''
        });
      }
    } catch (err) {
      console.error('Error al guardar licencia:', err);
    }
  };

  // Eliminar
  const handleDelete = async (id) => {
    try {
      await api.delete(`/licencias/${id}`);
      setLicencias(licencias.filter(l => l.licencia_id !== id));
    } catch (err) {
      console.error('Error al eliminar licencia:', err);
    }
  };

  // Activar edición
  const handleEdit = (l) => {
    setEditando(l);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Licencias</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Software</TableCell>
              <TableCell>Versión</TableCell>
              <TableCell>Clave</TableCell>
              <TableCell>Fecha Inicio</TableCell>
              <TableCell>Fecha Expiración</TableCell>
              <TableCell>Dispositivo ID</TableCell>
              <TableCell>Empleado ID</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {licencias.map(l => (
              <TableRow key={l.licencia_id}>
                <TableCell>{l.licencia_id}</TableCell>
                <TableCell>{l.nombre_software}</TableCell>
                <TableCell>{l.version}</TableCell>
                <TableCell>{l.clave}</TableCell>
                <TableCell>{l.fecha_inicio}</TableCell>
                <TableCell>{l.fecha_expiracion}</TableCell>
                <TableCell>{l.dispositivo_id}</TableCell>
                <TableCell>{l.empleado_id}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(l)}>Editar</Button>
                  <Button color="error" onClick={() => handleDelete(l.licencia_id)}>Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
        {editando ? 'Editar licencia' : 'Agregar nueva licencia'}
      </Typography>
      <TextField label="Software" name="nombre_software" value={editando ? editando.nombre_software : nueva.nombre_software} onChange={handleChange}/>
      <TextField label="Versión" name="version" value={editando ? editando.version : nueva.version} onChange={handleChange}/>
      <TextField label="Clave" name="clave" value={editando ? editando.clave : nueva.clave} onChange={handleChange}/>
      <TextField label="Fecha Inicio" name="fecha_inicio" type="date" value={editando ? editando.fecha_inicio : nueva.fecha_inicio} onChange={handleChange}/>
      <TextField label="Fecha Expiración" name="fecha_expiracion" type="date" value={editando ? editando.fecha_expiracion : nueva.fecha_expiracion} onChange={handleChange}/>
      <TextField label="Dispositivo ID" name="dispositivo_id" value={editando ? editando.dispositivo_id : nueva.dispositivo_id} onChange={handleChange}/>
      <TextField label="Empleado ID" name="empleado_id" value={editando ? editando.empleado_id : nueva.empleado_id} onChange={handleChange}/>
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

export default Licencias;


*/


import React, { useEffect, useState } from 'react';
import api from '../api';
import {
  Container, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, TextField, Button
} from '@mui/material';

function Licencias() {
  const [licencias, setLicencias] = useState([]);
  const [nueva, setNueva] = useState({
    nombre_software: '', version: '', clave: '',
    fecha_inicio: '', fecha_expiracion: '',
    dispositivo_id: '', empleado_id: ''
  });
  const [editando, setEditando] = useState(null);

  // Cargar licencias
  useEffect(() => {
    api.get('/licencias')
      .then(res => setLicencias(res.data))
      .catch(err => console.error('Error al obtener licencias:', err));
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
        const res = await api.put(`/licencias/${editando.licencia_id}`, editando);
        setLicencias(licencias.map(l =>
          l.licencia_id === editando.licencia_id ? res.data : l
        ));
        setEditando(null);
      } else {
        const res = await api.post('/licencias', nueva);
        setLicencias([...licencias, res.data]);
        setNueva({
          nombre_software: '', version: '', clave: '',
          fecha_inicio: '', fecha_expiracion: '',
          dispositivo_id: '', empleado_id: ''
        });
      }
    } catch (err) {
      console.error('Error al guardar licencia:', err);
    }
  };

  // Eliminar
  const handleDelete = async (id) => {
    try {
      await api.delete(`/licencias/${id}`);
      setLicencias(licencias.filter(l => l.licencia_id !== id));
    } catch (err) {
      console.error('Error al eliminar licencia:', err);
    }
  };

  // Activar edición
  const handleEdit = (l) => {
    setEditando(l);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Licencias</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Software</TableCell>
              <TableCell>Versión</TableCell>
              <TableCell>Clave/Cuenta</TableCell>
              <TableCell>Fecha Inicio</TableCell>
              <TableCell>Fecha Expiración</TableCell>
              <TableCell>Dispositivo ID</TableCell>
              <TableCell>Empleado ID</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {licencias.map(l => (
              <TableRow key={l.licencia_id}>
                <TableCell>{l.licencia_id}</TableCell>
                <TableCell>{l.nombre_software}</TableCell>
                <TableCell>{l.version}</TableCell>
                <TableCell>{l.clave}</TableCell>
                <TableCell>{l.fecha_inicio}</TableCell>
                <TableCell>{l.fecha_expiracion}</TableCell>
                <TableCell>{l.dispositivo_id}</TableCell>
                <TableCell>{l.empleado_id}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(l)}>Editar</Button>
                  <Button color="error" onClick={() => handleDelete(l.licencia_id)}>Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
        {editando ? 'Editar licencia' : 'Agregar nueva licencia'}
      </Typography>
      <TextField label="Software" name="nombre_software" value={editando ? editando.nombre_software : nueva.nombre_software} onChange={handleChange}/>
      <TextField label="Versión" name="version" value={editando ? editando.version : nueva.version} onChange={handleChange}/>
      <TextField label="Clave" name="clave" value={editando ? editando.clave : nueva.clave} onChange={handleChange}/>
      <TextField label="Fecha Inicio" name="fecha_inicio" type="date" value={editando ? editando.fecha_inicio : nueva.fecha_inicio} onChange={handleChange}/>
      <TextField label="Fecha Expiración" name="fecha_expiracion" type="date" value={editando ? editando.fecha_expiracion : nueva.fecha_expiracion} onChange={handleChange}/>
      <TextField label="Dispositivo ID" name="dispositivo_id" value={editando ? editando.dispositivo_id : nueva.dispositivo_id} onChange={handleChange}/>
      <TextField label="Empleado ID" name="empleado_id" value={editando ? editando.empleado_id : nueva.empleado_id} onChange={handleChange}/>
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

export default Licencias;