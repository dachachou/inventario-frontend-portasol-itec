

/*



/*
import React, { useEffect, useState } from 'react';
import api from '../api';

function Empleados() {
  const [empleados, setEmpleados] = useState([]);
  const [nuevo, setNuevo] = useState({ nombre: '', departamento: '', correo: '' });

  useEffect(() => {
    api.get('/empleados').then(res => setEmpleados(res.data));
  }, []);

  const agregarEmpleado = async () => {
    const res = await api.post('/empleados', nuevo);
    setEmpleados([...empleados, res.data]);
    setNuevo({ nombre: '', departamento: '', correo: '' });
  };

  return (
    <div>
      <h2>Empleados</h2>
      <ul>
        {empleados.map(e => (
          <li key={e.empleado_id}>{e.nombre} - {e.departamento} - {e.correo}</li>
        ))}
      </ul>

      <h3>Agregar nuevo</h3>
      <input placeholder="Nombre" value={nuevo.nombre} onChange={e => setNuevo({...nuevo, nombre: e.target.value})}/>
      <input placeholder="Departamento" value={nuevo.departamento} onChange={e => setNuevo({...nuevo, departamento: e.target.value})}/>
      <input placeholder="Correo" value={nuevo.correo} onChange={e => setNuevo({...nuevo, correo: e.target.value})}/>
      <button onClick={agregarEmpleado}>Guardar</button>
    </div>
  );
}

export default Empleados;

*/

/*

import React, { useEffect, useState } from 'react';
import api from '../api';
import {
  Container, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, TextField, Button
} from '@mui/material';

function Empleados() {
  const [empleados, setEmpleados] = useState([]);
  const [nuevo, setNuevo] = useState({ nombre: '', departamento: '', correo: '' });

  useEffect(() => {
    api.get('/empleados').then(res => setEmpleados(res.data));
  }, []);

  const agregarEmpleado = async () => {
    const res = await api.post('/empleados', nuevo);
    setEmpleados([...empleados, res.data]);
    setNuevo({ nombre: '', departamento: '', correo: '' });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Empleados</Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Departamento</TableCell>
              <TableCell>Correo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {empleados.map(e => (
              <TableRow key={e.empleado_id}>
                <TableCell>{e.empleado_id}</TableCell>
                <TableCell>{e.nombre}</TableCell>
                <TableCell>{e.departamento}</TableCell>
                <TableCell>{e.correo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
        Agregar nuevo empleado
      </Typography>
      <TextField label="Nombre" value={nuevo.nombre} onChange={e => setNuevo({...nuevo, nombre: e.target.value})} />
      <TextField label="Departamento" value={nuevo.departamento} onChange={e => setNuevo({...nuevo, departamento: e.target.value})} />
      <TextField label="Correo" value={nuevo.correo} onChange={e => setNuevo({...nuevo, correo: e.target.value})} />
      <Button variant="contained" color="primary" onClick={agregarEmpleado} style={{ marginLeft: '10px' }}>
        Guardar
      </Button>
    </Container>
  );
}

export default Empleados;

*/



/*



import React, { useEffect, useState } from 'react';
import api from '../api'; // cliente Axios configurado con baseURL http://localhost:4000/api

function Empleados() {
  const [empleados, setEmpleados] = useState([]);
  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    nombre: '',
    departamento: '',
    correo: ''
  });

  // Cargar empleados al montar el componente
  useEffect(() => {
    api.get('/empleados')
      .then(res => setEmpleados(res.data))
      .catch(err => console.error('Error al obtener empleados:', err));
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setNuevoEmpleado({
      ...nuevoEmpleado,
      [e.target.name]: e.target.value
    });
  };

  // Guardar nuevo empleado
  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/empleados', nuevoEmpleado)
      .then(res => {
        setEmpleados([...empleados, res.data]); // actualizar lista
        setNuevoEmpleado({ nombre: '', departamento: '', correo: '' }); // limpiar formulario
      })
      .catch(err => console.error('Error al registrar empleado:', err));
  };

  return (
    <div>
      <h2>Empleados</h2>
*/
     
      /*
      <table border="1" style={{ width: '100%', marginBottom: '20px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Departamento</th>
            <th>Correo</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map(emp => (
            <tr key={emp.empleado_id}>
              <td>{emp.empleado_id}</td>
              <td>{emp.nombre}</td>
              <td>{emp.departamento}</td>
              <td>{emp.correo}</td>
            </tr>
          ))}
        </tbody>
      </table>
*/
     
      /*
      <h3>Agregar nuevo empleado</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={nuevoEmpleado.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="departamento"
          placeholder="Departamento"
          value={nuevoEmpleado.departamento}
          onChange={handleChange}
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={nuevoEmpleado.correo}
          onChange={handleChange}
          required
        />
        <button type="submit">GUARDAR</button>
      </form>
    </div>
  );
}

export default Empleados;



*/






import React, { useEffect, useState } from 'react';
import api from '../api';

function Empleados() {
  const [empleados, setEmpleados] = useState([]);
  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    nombre: '',
    departamento: '',
    correo: ''
  });
  const [editando, setEditando] = useState(null);

  // Cargar empleados
  useEffect(() => {
    api.get('/empleados')
      .then(res => setEmpleados(res.data))
      .catch(err => console.error('Error al obtener empleados:', err));
  }, []);

  // Manejar cambios en formulario
  const handleChange = (e) => {
    if (editando) {
      setEditando({ ...editando, [e.target.name]: e.target.value });
    } else {
      setNuevoEmpleado({ ...nuevoEmpleado, [e.target.name]: e.target.value });
    }
  };

  // Crear empleado
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editando) {
      api.put(`/empleados/${editando.empleado_id}`, editando)
        .then(res => {
          setEmpleados(empleados.map(emp =>
            emp.empleado_id === editando.empleado_id ? res.data : emp
          ));
          setEditando(null);
        })
        .catch(err => console.error('Error al actualizar empleado:', err));
    } else {
      api.post('/empleados', nuevoEmpleado)
        .then(res => {
          setEmpleados([...empleados, res.data]);
          setNuevoEmpleado({ nombre: '', departamento: '', correo: '' });
        })
        .catch(err => console.error('Error al registrar empleado:', err));
    }
  };

  // Eliminar empleado
  const handleDelete = (id) => {
    api.delete(`/empleados/${id}`)
      .then(() => {
        setEmpleados(empleados.filter(emp => emp.empleado_id !== id));
      })
      .catch(err => console.error('Error al eliminar empleado:', err));
  };

  // Activar edición
  const handleEdit = (emp) => {
    setEditando(emp);
  };

  return (
    <div>
      <h2>Empleados</h2>

      <table border="1" style={{ width: '100%', marginBottom: '20px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Departamento</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map(emp => (
            <tr key={emp.empleado_id}>
              <td>{emp.empleado_id}</td>
              <td>{emp.nombre}</td>
              <td>{emp.departamento}</td>
              <td>{emp.correo}</td>
              <td>
                <button onClick={() => handleEdit(emp)}>Editar</button>
                <button onClick={() => handleDelete(emp.empleado_id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>{editando ? 'Editar empleado' : 'Agregar nuevo empleado'}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={editando ? editando.nombre : nuevoEmpleado.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="departamento"
          placeholder="Departamento"
          value={editando ? editando.departamento : nuevoEmpleado.departamento}
          onChange={handleChange}
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={editando ? editando.correo : nuevoEmpleado.correo}
          onChange={handleChange}
          required
        />
        <button type="submit">{editando ? 'ACTUALIZAR' : 'GUARDAR'}</button>
        {editando && (
          <button type="button" onClick={() => setEditando(null)}>Cancelar</button>
        )}
      </form>
    </div>
  );
}

export default Empleados;