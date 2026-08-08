import { useState } from "react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ResponsiveContainer,
} from "recharts";

const INK = "#1B2340";
const INK_SOFT = "#4A5170";
const PAGE_BG = "#F3F4EF";
const PANEL_BG = "#FFFFFF";
const LINE = "#DEDFD6";
const TEAL = "#2F6F62";
const TEAL_SOFT = "#E4EEEB";
const AMBER = "#B97A26";
const AMBER_SOFT = "#F5E9D8";
const CORAL = "#B0503C";
const CORAL_SOFT = "#F3E1DC";

const DIMENSIONES = [
  "Liderazgo",
  "Estabilidad emocional",
  "Orientación a resultados",
  "Trabajo en equipo",
  "Adaptabilidad",
  "Integridad",
];

function perfil(dims) {
  const entries = Object.entries(dims);
  entries.sort((a, b) => b[1] - a[1]);
  return entries[0][0];
}

function estadoStyle(estado) {
  if (estado === "Apto") return { bg: TEAL_SOFT, fg: TEAL };
  if (estado === "No apto") return { bg: CORAL_SOFT, fg: CORAL };
  return { bg: AMBER_SOFT, fg: AMBER };
}

const VACANTES = [
  {
    id: "dev",
    nombre: "Desarrollador Backend",
    examen: "Examen técnico-conductual DEV-03",
    candidatos: [
      { id: 1, nombre: "Marcela Torres", fecha: "05 ago 2026", puntaje: 88, estado: "Apto",
        dims: { "Liderazgo": 62, "Estabilidad emocional": 80, "Orientación a resultados": 91, "Trabajo en equipo": 74, "Adaptabilidad": 85, "Integridad": 90 } },
      { id: 2, nombre: "Iván Reséndiz", fecha: "05 ago 2026", puntaje: 61, estado: "Pendiente",
        dims: { "Liderazgo": 55, "Estabilidad emocional": 58, "Orientación a resultados": 66, "Trabajo en equipo": 60, "Adaptabilidad": 63, "Integridad": 70 } },
      { id: 3, nombre: "Paola Cisneros", fecha: "04 ago 2026", puntaje: 44, estado: "No apto",
        dims: { "Liderazgo": 40, "Estabilidad emocional": 38, "Orientación a resultados": 52, "Trabajo en equipo": 45, "Adaptabilidad": 41, "Integridad": 50 } },
    ],
  },
  {
    id: "ventas",
    nombre: "Ejecutivo de Ventas",
    examen: "Perfil comercial V2",
    candidatos: [
      { id: 4, nombre: "Diego Almanza", fecha: "06 ago 2026", puntaje: 79, estado: "Apto",
        dims: { "Liderazgo": 82, "Estabilidad emocional": 70, "Orientación a resultados": 88, "Trabajo en equipo": 75, "Adaptabilidad": 80, "Integridad": 76 } },
      { id: 5, nombre: "Renata Solís", fecha: "06 ago 2026", puntaje: 92, estado: "Apto",
        dims: { "Liderazgo": 88, "Estabilidad emocional": 84, "Orientación a resultados": 95, "Trabajo en equipo": 90, "Adaptabilidad": 91, "Integridad": 89 } },
    ],
  },
  {
    id: "finanzas",
    nombre: "Analista Financiero",
    examen: "Evaluación analítico-numérica",
    candidatos: [
      { id: 6, nombre: "Héctor Villalpando", fecha: "03 ago 2026", puntaje: 70, estado: "Pendiente",
        dims: { "Liderazgo": 50, "Estabilidad emocional": 72, "Orientación a resultados": 78, "Trabajo en equipo": 65, "Adaptabilidad": 68, "Integridad": 84 } },
    ],
  },
];

export default function PanelRH() {
  const [vacanteId, setVacanteId] = useState(VACANTES[0].id);
  const [seleccionado, setSeleccionado] = useState(null);

  const vacante = VACANTES.find((v) => v.id === vacanteId);

  const radarData = seleccionado
    ? DIMENSIONES.map((d) => ({ dimension: d, valor: seleccionado.dims[d] }))
    : [];

  return (
    <div style={{ background: PAGE_BG, minHeight: "600px", fontFamily: "Georgia, 'Iowan Old Style', serif" }} className="w-full">
      <div style={{ borderBottom: `1px solid ${LINE}` }} className="flex items-center justify-between px-8 py-5">
        <div>
          <div style={{ color: INK, fontSize: "20px", letterSpacing: "0.02em" }}>Índice</div>
          <div style={{ color: INK_SOFT, fontFamily: "Helvetica, Arial, sans-serif", fontSize: "12px" }}>
            Evaluación psicométrica de candidatos
          </div>
        </div>
        <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontSize: "12px", color: INK_SOFT }}>
          RH · Cuenta única
        </div>
      </div>

      <div className="flex" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
        <div style={{ width: "220px", borderRight: `1px solid ${LINE}` }} className="py-6 px-4">
          <div style={{ fontSize: "11px", color: INK_SOFT, letterSpacing: "0.06em" }} className="uppercase px-2 mb-3">
            Vacantes
          </div>
          {VACANTES.map((v) => {
            const activa = v.id === vacanteId;
            return (
              <button
                key={v.id}
                onClick={() => { setVacanteId(v.id); setSeleccionado(null); }}
                style={{
                  width: "100%", textAlign: "left", padding: "10px 12px", marginBottom: "4px",
                  borderRadius: "6px", border: "none", cursor: "pointer",
                  background: activa ? INK : "transparent",
                  color: activa ? "#F3F4EF" : INK,
                }}
              >
                <div style={{ fontSize: "13px" }}>{v.nombre}</div>
                <div style={{ fontSize: "11px", opacity: 0.7 }}>{v.candidatos.length} candidatos</div>
              </button>
            );
          })}
        </div>

        <div className="flex-1 px-8 py-6">
          <div className="mb-5">
            <div style={{ color: INK, fontSize: "17px", fontFamily: "Georgia, serif" }}>{vacante.nombre}</div>
            <div style={{ color: INK_SOFT, fontSize: "12px" }}>{vacante.examen}</div>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${LINE}` }}>
                {["Candidato", "Fecha", "Puntaje global", "Perfil dominante", "Estado", ""].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "8px 10px", fontSize: "11px", color: INK_SOFT, fontWeight: "normal" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {vacante.candidatos.map((c) => {
                const est = estadoStyle(c.estado);
                return (
                  <tr key={c.id} style={{ borderBottom: `1px solid ${LINE}` }}>
                    <td style={{ padding: "10px", fontSize: "13px", color: INK }}>{c.nombre}</td>
                    <td style={{ padding: "10px", fontSize: "12px", color: INK_SOFT }}>{c.fecha}</td>
                    <td style={{ padding: "10px", fontSize: "13px", color: INK, fontVariantNumeric: "tabular-nums" }}>{c.puntaje} / 100</td>
                    <td style={{ padding: "10px", fontSize: "12px", color: INK_SOFT }}>{perfil(c.dims)}</td>
                    <td style={{ padding: "10px" }}>
                      <span style={{ background: est.bg, color: est.fg, fontSize: "11px", padding: "3px 9px", borderRadius: "999px" }}>
                        {c.estado}
                      </span>
                    </td>
                    <td style={{ padding: "10px" }}>
                      <button
                        onClick={() => setSeleccionado(c)}
                        style={{ fontSize: "12px", color: INK, background: "none", border: `1px solid ${LINE}`, borderRadius: "6px", padding: "5px 10px", cursor: "pointer" }}
                      >
                        Ver resultado
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {seleccionado && (
        <div
          onClick={() => setSeleccionado(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(27,35,64,0.35)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ background: PANEL_BG, borderRadius: "10px", width: "560px", maxWidth: "90vw", padding: "28px", fontFamily: "Helvetica, Arial, sans-serif" }}
          >
            <div className="flex items-start justify-between mb-1">
              <div>
                <div style={{ fontFamily: "Georgia, serif", fontSize: "18px", color: INK }}>{seleccionado.nombre}</div>
                <div style={{ fontSize: "12px", color: INK_SOFT }}>{vacante.nombre} · {seleccionado.fecha}</div>
              </div>
              <button onClick={() => setSeleccionado(null)} style={{ background: "none", border: "none", cursor: "pointer", color: INK_SOFT, fontSize: "14px" }}>Cerrar</button>
            </div>

            <div className="flex items-center gap-6 my-4">
              <div>
                <div style={{ fontFamily: "Georgia, serif", fontSize: "34px", color: INK, fontVariantNumeric: "tabular-nums" }}>{seleccionado.puntaje}</div>
                <div style={{ fontSize: "11px", color: INK_SOFT }}>puntaje global / 100</div>
              </div>
              <div style={{ borderLeft: `1px solid ${LINE}`, paddingLeft: "24px" }}>
                <div style={{ fontSize: "13px", color: INK }}>{perfil(seleccionado.dims)}</div>
                <div style={{ fontSize: "11px", color: INK_SOFT }}>perfil dominante</div>
              </div>
              <div style={{ borderLeft: `1px solid ${LINE}`, paddingLeft: "24px" }}>
                {(() => {
                  const est = estadoStyle(seleccionado.estado);
                  return (
                    <span style={{ background: est.bg, color: est.fg, fontSize: "12px", padding: "4px 10px", borderRadius: "999px" }}>
                      {seleccionado.estado}
                    </span>
                  );
                })()}
              </div>
            </div>

            <div style={{ height: "260px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} outerRadius="72%">
                  <PolarGrid stroke={LINE} />
                  <PolarAngleAxis dataKey="dimension" tick={{ fill: INK_SOFT, fontSize: 11 }} />
                  <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar dataKey="valor" stroke={TEAL} fill={TEAL} fillOpacity={0.28} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
