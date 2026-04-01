
/*
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/


// OTRO

/*

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Empleados from './components/Empleados';
import Dispositivos from './components/Dispositivos';
import Licencias from './components/Licencias';
import IPs from './components/IPs';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/empleados">Empleados</Link> | 
        <Link to="/dispositivos">Dispositivos</Link> | 
        <Link to="/licencias">Licencias</Link> | 
        <Link to="/ips">IPs</Link>
      </nav>
      <Routes>
        <Route path="/empleados" element={<Empleados />} />
        <Route path="/dispositivos" element={<Dispositivos />} />
        <Route path="/licencias" element={<Licencias />} />
        <Route path="/ips" element={<IPs />} />
      </Routes>
    </Router>
  );
}

export default App;


*/


import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
import Empleados from './components/Empleados';
import Dispositivos from './components/Dispositivos';
import Licencias from './components/Licencias';
import IPs from './components/IPs';
import Dashboard from './components/Dashboard';
import Capacidades from './components/Capacidades';
import Historial from './components/Historial';
import InventarioSoftware from "./components/InventarioSoftware";


function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">Dashboard</Button>
          <Button color="inherit" component={Link} to="/empleados">Empleados</Button>
          <Button color="inherit" component={Link} to="/dispositivos">Dispositivos</Button>
          <Button color="inherit" component={Link} to="/licencias">Licencias</Button>
          <Button color="inherit" component={Link} to="/ips">IPs</Button>
          <Button color="inherit" component={Link} to="/capacidades">Capacidades</Button>
          <Button color="inherit" component={Link} to="/historial">Historial</Button>
          <Button color="inherit" component={Link} to="/software">InventarioSoftware</Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/empleados" element={<Empleados />} />
        <Route path="/dispositivos" element={<Dispositivos />} />
        <Route path="/licencias" element={<Licencias />} />
        <Route path="/licencias/:id" element={<Licencias />} /> {/* ✅ nueva ruta */}
        <Route path="/ips" element={<IPs />} />
        <Route path="/capacidades" element={<Capacidades />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/software" element={<InventarioSoftware />} />

      </Routes>
    </Router>
  );
}

export default App;