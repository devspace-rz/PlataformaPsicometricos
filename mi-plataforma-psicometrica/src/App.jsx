import { useState } from "react";
import PanelRH from "@/components/panel-examenes-psicometricos";
import PortalCandidato from "@/components/portal-candidato";

export default function App() {
  // Estado temporal para alternar entre vistas mientras desarrollas
  const [vista, setVista] = useState("candidato"); // "candidato" o "rh"

  return (
    <div>
      {/* Barra superior flotante de navegación para pruebas de desarrollo */}
      <div style={{ background: "#1B2340", color: "#FFF", padding: "8px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px", fontFamily: "Helvetica, Arial, sans-serif" }}>
        <span>Modo de prueba local (Navegación de vistas)</span>
        <div style={{ display: "flex", gap: "10px" }}>
          <button 
            onClick={() => setVista("candidato")}
            style={{ background: vista === "candidato" ? "#2F6F62" : "transparent", color: "#fff", border: "1px solid #4A5170", padding: "4px 10px", borderRadius: "4px", cursor: "pointer" }}
          >
            Ver Portal Candidato
          </button>
          <button 
            onClick={() => setVista("rh")}
            style={{ background: vista === "rh" ? "#2F6F62" : "transparent", color: "#fff", border: "1px solid #4A5170", padding: "4px 10px", borderRadius: "4px", cursor: "pointer" }}
          >
            Ver Panel RH
          </button>
        </div>
      </div>

      {/* Renderizado condicional de las vistas respetando el diseño exacto */}
      {vista === "candidato" ? <PortalCandidato /> : <PanelRH />}
    </div>
  );
}
