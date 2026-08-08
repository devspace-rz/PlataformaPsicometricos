import React, { useState } from 'react';
import PanelRH from "./components/panel-examenes-psicometricos";
import PortalCandidato from "./components/portal-candidato";

export default function App() {
  const [vista, setVista] = useState('inicio'); // 'inicio', 'candidato', 'rh'
  const [autenticadoRH, setAutenticadoRH] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [errorPassword, setErrorPassword] = useState(false);

  // Contraseña fija para RH (puedes cambiarla por la que gustes)
  const PASSWORD_SECRETA = "admin123";

  const handleLoginRH = (e) => {
    e.preventDefault();
    if (passwordInput === PASSWORD_SECRETA) {
      setAutenticadoRH(true);
      setErrorPassword(false);
    } else {
      setErrorPassword(true);
    }
  };

  if (vista === 'candidato') {
    return <PortalCandidato volver={() => setVista('inicio')} />;
  }

  if (vista === 'rh') {
    if (!autenticadoRH) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f3f4f6' }}>
          <form onSubmit={handleLoginRH} style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '300px', textAlign: 'center' }}>
            <h2>Acceso Restringido - RH</h2>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>Ingresa la contraseña de administrador</p>
            <input 
              type="password" 
              placeholder="Contraseña" 
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            {errorPassword && <p style={{ color: 'red', fontSize: '12px', marginBottom: '10px' }}>Contraseña incorrecta</p>}
            <button type="submit" style={{ width: '100%', padding: '10px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Entrar</button>
            <br />
            <button type="button" onClick={() => setVista('inicio')} style={{ background: 'none', border: 'none', color: '#666', marginTop: '15px', cursor: 'pointer' }}>Volver al inicio</button>
          </form>
        </div>
      );
    }
    return <PanelRH volver={() => { setVista('inicio'); setAutenticadoRH(false); }} />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '20px' }}>
      <h1>Plataforma Psicométrica</h1>
      <button onClick={() => setVista('candidato')} style={{ padding: '12px 24px', fontSize: '16px', cursor: 'pointer' }}>Soy Candidato</button>
      <button onClick={() => setVista('rh')} style={{ padding: '12px 24px', fontSize: '16px', cursor: 'pointer', background: '#1e293b', color: 'white' }}>Panel de Recursos Humanos (🔒)</button>
    </div>
  );
}
