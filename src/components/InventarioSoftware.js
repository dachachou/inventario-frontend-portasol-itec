

/*
//FUNCIONA BIEN AHI

import { useEffect, useState } from "react";

function InventarioSoftware() {
  const [programas, setProgramas] = useState([]);

  useEffect(() => {
  fetch("http://localhost:4000/api/inventario_software") // 👈 ruta completa
    .then(res => res.json())
    .then(data => {
      console.log("📥 Datos recibidos:", data);
      setProgramas(data);
    })
    .catch(err => console.error("❌ Error al obtener datos:", err));
}, []);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Versión</th>
          <th>Fecha Registro</th>
          <th>Dispositivo</th>
        </tr>
      </thead>
      <tbody>
        {programas.map(p => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.nombre}</td>
            <td>{p.version}</td>
            <span style={{ marginRight: "20px" }}>
    {new Date(p.fecha_registro).toLocaleString()}
  </span>
  <span style={{ fontWeight: "bold" }}>
    {p.dispositivo_id}
  </span>

          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default InventarioSoftware;






import { useEffect, useState } from "react";

function InventarioSoftware() {
  const [programas, setProgramas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/inventario_software") // 👈 ruta completa
      .then(res => res.json())
      .then(data => {
        console.log("📥 Datos recibidos:", data);
        setProgramas(data);
      })
      .catch(err => console.error("❌ Error al obtener datos:", err));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Versión</th>
          <th>Fabricante</th>
          <th>Tamaño</th>
          <th>Fecha Instalación</th>
          <th>Fecha Registro</th>
          <th>Dispositivo</th>
        </tr>
      </thead>
      <tbody>
        {programas.map(p => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.nombre}</td>
            <td>{p.version}</td>
            <td>{p.fabricante || "—"}</td>
            <td>{p.tamano || "—"}</td>
            <td>
              {p.fecha_instalacion
                ? new Date(p.fecha_instalacion).toLocaleDateString()
                : "—"}
            </td>
            <td>
              {p.fecha_registro
                ? new Date(p.fecha_registro).toLocaleString()
                : "—"}
            </td>
            <td>{p.dispositivo_id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default InventarioSoftware;
*/

import { useEffect, useState } from "react";

function InventarioSoftware() {
  const [programas, setProgramas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/inventario_software") // 👈 ruta corregida
      .then(res => res.json())
      .then(data => {
        console.log("📥 Datos recibidos:", data);
        setProgramas(data);
      })
      .catch(err => console.error("❌ Error al obtener datos:", err));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Versión</th>
          <th>Fabricante</th>
          <th>Tamaño</th>
          <th>Fecha Instalación</th>
          <th>Fecha Registro</th>
          <th>Dispositivo</th>
        </tr>
      </thead>
      <tbody>
        {programas.map(p => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.nombre}</td>
            <td>{p.version || "—"}</td>
            <td>{p.fabricante || "—"}</td>
            <td>{p.tamano || "—"}</td>
            <td>
              {p.fecha_instalacion
                ? new Date(p.fecha_instalacion).toLocaleDateString()
                : "—"}
            </td>
            <td>
              {p.fecha_registro
                ? new Date(p.fecha_registro).toLocaleString()
                : "—"}
            </td>
            <td>{p.dispositivo_id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default InventarioSoftware;