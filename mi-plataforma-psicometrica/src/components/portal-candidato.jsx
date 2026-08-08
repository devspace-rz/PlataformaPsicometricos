import { useState } from "react";
import { supabase } from '../supabase'; // <--- Tu archivo de conexión

// ... (tus constantes y preguntas se quedan igual) ...

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

  // FUNCIÓN MODIFICADA PARA GUARDAR EN SUPABASE AL FINALIZAR
  async function siguiente() {
    if (preguntaIdx < PREGUNTAS.length - 1) {
      setPreguntaIdx((i) => i + 1);
    } else {
      // Aquí calculas un puntaje simulado o real basado en sus respuestas
      const puntajeFinal = Math.floor(Math.random() * 30) + 65; // Ejemplo aleatorio entre 65 y 95

      const resultadoParaGuardar = {
        nombre: datos.nombre,
        edad: parseInt(datos.edad),
        vacante_id: datos.vacanteId,
        puntaje: puntajeFinal,
        estado: "Pendiente",
        fecha: new Date().toLocaleDateString("es-MX", { day: "2-digit", month: "short", year: "numeric" }),
        // Valores de ejemplo para la gráfica de radar basados en las dimensiones
        liderazgo: Math.floor(Math.random() * 40) + 50,
        estabilidad_emocional: Math.floor(Math.random() * 40) + 50,
        orientacion_a_resultados: Math.floor(Math.random() * 40) + 50,
        trabajo_en_equipo: Math.floor(Math.random() * 40) + 50,
        adaptabilidad: Math.floor(Math.random() * 40) + 50,
        integridad: Math.floor(Math.random() * 40) + 50,
      };

      const { error } = await supabase
        .from('resultados_candidatos')
        .insert([resultadoParaGuardar]);
     

      if (error) {
        console.error("Error al guardar:", error);
      } else {
        setEtapa("enviado");
      }
    }
  }

  function anterior() {
    if (preguntaIdx > 0) setPreguntaIdx((i) => i - 1);
  }

  // ... (el resto del render del portal se mantiene intacto con tu diseño original)
