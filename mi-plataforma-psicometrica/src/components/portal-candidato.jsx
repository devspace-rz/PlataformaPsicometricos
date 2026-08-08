import { useState } from "react";

const INK = "#1B2340";
const INK_SOFT = "#4A5170";
const PAGE_BG = "#F3F4EF";
const PANEL_BG = "#FFFFFF";
const LINE = "#DEDFD6";
const TEAL = "#2F6F62";
const TEAL_SOFT = "#E4EEEB";

const VACANTES = [
  { id: "dev", nombre: "Desarrollador Backend" },
  { id: "ventas", nombre: "Ejecutivo de Ventas" },
  { id: "finanzas", nombre: "Analista Financiero" },
];

const PREGUNTAS = [
  {
    id: "p1",
    tipo: "opcion_multiple",
    dimension: "Orientación a resultados",
    texto: "Tienes dos tareas pendientes y solo tiempo para una antes de una junta. ¿Qué haces?",
    opciones: [
      "Termino la que tiene mayor impacto, aunque quede inconclusa la otra",
      "Avanzo un poco en ambas para no dejar ninguna en cero",
      "Aviso que necesito más tiempo y pospongo la junta",
      "Pido ayuda a alguien más del equipo para cubrir la otra",
    ],
  },
  {
    id: "p2",
    tipo: "likert",
    dimension: "Trabajo en equipo",
    texto: "Prefiero resolver los problemas por mi cuenta antes que pedir ayuda al equipo.",
  },
  {
    id: "p3",
    tipo: "likert",
    dimension: "Estabilidad emocional",
    texto: "Cuando algo sale mal en el trabajo, me cuesta dejarlo de pensar el resto del día.",
  },
  {
    id: "p4",
    tipo: "opcion_multiple",
    dimension: "Liderazgo",
    texto: "Un compañero de tu equipo comete un error frente al cliente. ¿Qué haces primero?",
    opciones: [
      "Corrijo el error en el momento, frente al cliente",
      "Dejo que mi compañero lo resuelva y hablo con él después",
      "Cambio de tema y busco el momento adecuado para señalarlo en privado",
      "Le resto importancia frente al cliente y lo reviso todo al final",
    ],
  },
  {
    id: "p5",
    tipo: "likert",
    dimension: "Adaptabilidad",
    texto: "Me incomoda cuando cambian los planes de un proyecto a mitad de camino.",
  },
];

const LIKERT_OPCIONES = [
  "Totalmente en desacuerdo",
  "En desacuerdo",
  "Neutral",
  "De acuerdo",
  "Totalmente de acuerdo",
];

function Progreso({ paso, total }) {
  return (
    <div style={{ display: "flex", gap: "6px", marginBottom: "28px" }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            flex: 1, height: "3px", borderRadius: "2px",
            background: i < paso ? TEAL : LINE,
          }}
        />
      ))}
    </div>
  );
}

export default function PortalCandidato() {
  const [etapa, setEtapa] = useState("registro");
  const [datos, setDatos] = useState({ nombre: "", edad: "", vacanteId: "" });
  const [preguntaIdx, setPreguntaIdx] = useState(0);
  const [respuestas, setRespuestas] = useState({});

  const vacante = VACANTES.find((v) => v.id === datos.vacanteId);
  const pregunta = PREGUNTAS[preguntaIdx];
  const respuestaActual = respuestas[pregunta?.id];

  function iniciarExamen(e) {
    e.preventDefault();
    if (!datos.nombre || !datos.edad || !datos.vacanteId) return;
    setEtapa("examen");
  }

  function responder(valor) {
    setRespuestas((r) => ({ ...r, [pregunta.id]: valor }));
  }

  function siguiente() {
    if (preguntaIdx < PREGUNTAS.length - 1) {
      setPreguntaIdx((i) => i + 1);
    } else {
      setEtapa("enviado");
    }
  }

  function anterior() {
    if (preguntaIdx > 0) setPreguntaIdx((i) => i - 1);
  }

  return (
    <div style={{ background: PAGE_BG, minHeight: "600px", fontFamily: "Georgia, 'Iowan Old Style', serif" }} className="w-full">
      <div style={{ borderBottom: `1px solid ${LINE}` }} className="flex items-center justify-between px-8 py-5">
        <div>
          <div style={{ color: INK, fontSize: "20px", letterSpacing: "0.02em" }}>Índice</div>
          <div style={{ color: INK_SOFT, fontFamily: "Helvetica, Arial, sans-serif", fontSize: "12px" }}>
            Evaluación psicométrica de candidatos
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "560px", margin: "0 auto", padding: "48px 24px", fontFamily: "Helvetica, Arial, sans-serif" }}>

        {etapa === "registro" && (
          <div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: "20px", color: INK, marginBottom: "6px" }}>
              Antes de comenzar
            </div>
            <div style={{ fontSize: "13px", color: INK_SOFT, marginBottom: "28px" }}>
              Estos datos nos permiten enviar tus resultados al puesto correcto.
            </div>

            <form onSubmit={iniciarExamen}>
              <label style={{ fontSize: "12px", color: INK_SOFT, display: "block", marginBottom: "6px" }}>Nombre completo</label>
              <input
                value={datos.nombre}
                onChange={(e) => setDatos({ ...datos, nombre: e.target.value })}
                placeholder="Nombre y apellidos"
                style={{ width: "100%", padding: "10px 12px", border: `1px solid ${LINE}`, borderRadius: "6px", marginBottom: "18px", fontSize: "14px", boxSizing: "border-box" }}
              />

              <label style={{ fontSize: "12px", color: INK_SOFT, display: "block", marginBottom: "6px" }}>Edad</label>
              <input
                type="number"
                value={datos.edad}
                onChange={(e) => setDatos({ ...datos, edad: e.target.value })}
                placeholder="27"
                style={{ width: "100%", padding: "10px 12px", border: `1px solid ${LINE}`, borderRadius: "6px", marginBottom: "18px", fontSize: "14px", boxSizing: "border-box" }}
              />

              <label style={{ fontSize: "12px", color: INK_SOFT, display: "block", marginBottom: "6px" }}>Puesto al que aplicas</label>
              <select
                value={datos.vacanteId}
                onChange={(e) => setDatos({ ...datos, vacanteId: e.target.value })}
                style={{ width: "100%", padding: "10px 12px", border: `1px solid ${LINE}`, borderRadius: "6px", marginBottom: "28px", fontSize: "14px", boxSizing: "border-box", background: "white" }}
              >
                <option value="">Selecciona un puesto</option>
                {VACANTES.map((v) => (
                  <option key={v.id} value={v.id}>{v.nombre}</option>
                ))}
              </select>

              <button
                type="submit"
                style={{ width: "100%", padding: "12px", background: INK, color: "#F3F4EF", border: "none", borderRadius: "6px", fontSize: "14px", cursor: "pointer" }}
              >
                Comenzar examen
              </button>
            </form>
          </div>
        )}

        {etapa === "examen" && pregunta && (
          <div>
            <Progreso paso={preguntaIdx + 1} total={PREGUNTAS.length} />
            <div style={{ fontSize: "11px", color: INK_SOFT, marginBottom: "10px" }}>
              Pregunta {preguntaIdx + 1} de {PREGUNTAS.length} · {vacante?.nombre}
            </div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: "18px", color: INK, marginBottom: "24px", lineHeight: 1.4 }}>
              {pregunta.texto}
            </div>

            {pregunta.tipo === "opcion_multiple" && (
              <div>
                {pregunta.opciones.map((op, i) => {
                  const activa = respuestaActual === op;
                  return (
                    <button
                      key={i}
                      onClick={() => responder(op)}
                      style={{
                        display: "block", width: "100%", textAlign: "left", padding: "12px 14px",
                        marginBottom: "8px", borderRadius: "6px", fontSize: "13px", cursor: "pointer",
                        border: `1px solid ${activa ? TEAL : LINE}`,
                        background: activa ? TEAL_SOFT : "white",
                        color: INK,
                      }}
                    >
                      {op}
                    </button>
                  );
                })}
              </div>
            )}

            {pregunta.tipo === "likert" && (
              <div style={{ display: "flex", justifyContent: "space-between", gap: "6px" }}>
                {LIKERT_OPCIONES.map((op, i) => {
                  const activa = respuestaActual === op;
                  return (
                    <button
                      key={i}
                      onClick={() => responder(op)}
                      style={{
                        flex: 1, padding: "10px 4px", borderRadius: "6px", fontSize: "11px",
                        textAlign: "center", cursor: "pointer", lineHeight: 1.3,
                        border: `1px solid ${activa ? TEAL : LINE}`,
                        background: activa ? TEAL_SOFT : "white",
                        color: INK,
                      }}
                    >
                      {op}
                    </button>
                  );
                })}
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "32px" }}>
              <button
                onClick={anterior}
                disabled={preguntaIdx === 0}
                style={{
                  padding: "10px 16px", borderRadius: "6px", fontSize: "13px", cursor: preguntaIdx === 0 ? "default" : "pointer",
                  border: `1px solid ${LINE}`, background: "white", color: preguntaIdx === 0 ? "#B7B8AE" : INK,
                }}
              >
                Anterior
              </button>
              <button
                onClick={siguiente}
                disabled={!respuestaActual}
                style={{
                  padding: "10px 20px", borderRadius: "6px", fontSize: "13px",
                  cursor: respuestaActual ? "pointer" : "default",
                  border: "none", background: respuestaActual ? INK : LINE,
                  color: respuestaActual ? "#F3F4EF" : "#8C8D82",
                }}
              >
                {preguntaIdx === PREGUNTAS.length - 1 ? "Finalizar" : "Siguiente"}
              </button>
            </div>
          </div>
        )}

        {etapa === "enviado" && (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: TEAL_SOFT, color: TEAL, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: "20px" }}>
              ✓
            </div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: "19px", color: INK, marginBottom: "8px" }}>
              Examen enviado
            </div>
            <div style={{ fontSize: "13px", color: INK_SOFT, maxWidth: "360px", margin: "0 auto" }}>
              Gracias, {datos.nombre.split(" ")[0] || "candidato"}. Tus respuestas para {vacante?.nombre} ya están registradas.
              El equipo de RH revisará tu resultado y se pondrá en contacto contigo.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
