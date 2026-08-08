import { useState, useEffect } from "react";
import { supabase } from '../supabase'; 
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ResponsiveContainer,
} from "recharts";


const VACANTES_CONFIG = [
  { id: "dev", nombre: "Desarrollador Backend", examen: "Examen técnico-conductual DEV-03" },
  { id: "ventas", nombre: "Ejecutivo de Ventas", examen: "Perfil comercial V2" },
  { id: "finanzas", nombre: "Analista Financiero", examen: "Evaluación analítico-numérica" },
];

export default function PanelRH() {
  const [vacanteId, setVacanteId] = useState(VACANTES_CONFIG[0].id);
  const [candidatosDB, setCandidatosDB] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);


  useEffect(() => {
    async function cargarCandidatos() {
      const { data, error } = await supabase
        .from('resultados_candidatos')
        .select('*');

      if (!error && data) {
        
        const formateados = data.map(item => ({
          id: item.id,
          nombre: item.nombre,
          fecha: item.fecha,
          puntaje: item.puntaje,
          estado: item.estado,
          vacanteId: item.vacante_id,
          dims: {
            "Liderazgo": item.liderazgo,
            "Estabilidad emocional": item.estabilidad_emocional,
            "Orientación a resultados": item.orientacion_a_resultados,
            "Trabajo en equipo": item.trabajo_en_equipo,
            "Adaptabilidad": item.adaptabilidad,
            "Integridad": item.integridad,
          }
        }));
        setCandidatosDB(formateados);
      }
    }

    cargarCandidatos();
  }, []);

  const vacanteInfo = VACANTES_CONFIG.find((v) => v.id === vacanteId);
  
  const candidatosFiltrados = candidatosDB.filter(c => c.vacanteId === vacanteId);

  const vacante = {
    ...vacanteInfo,
    candidatos: candidatosFiltrados
  };

  const radarData = seleccionado
    ? DIMENSIONES.map((d) => ({ dimension: d, valor: seleccionado.dims[d] }))
    : [];

  return (
    
  );
}
