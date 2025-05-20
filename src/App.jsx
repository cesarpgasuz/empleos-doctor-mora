import { useEffect, useState } from "react";
import { getEmpleos } from "./services/api";


function App() {

  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      setCargando(true);
      setDatos([]);

      try{
        const result = await getEmpleos();
        // console.log(result);
        setDatos(result);
        setCargando(false);
      }catch(error){
        console.log('Error al cargar los datos', error);
      }
    }
    fetchData();
  }, []);

  console.log(datos);

  return (
    <>
      <h1 className='text-center font-bold text-red-500'>Empleos Doctor Mora</h1>

      {cargando ? 'Obteniendo datos...' : (
          <div className="flex flex-col gap-2">
              {datos.map( dato => (
                <div key={dato.id} className="bg-gray-200">
                  <h2>{dato.puesto}</h2>
                  <p>Edad: {dato.edadMinima} - {dato.edadMaxima}</p>
                  <p>Sexo: {dato.sexo}</p>
                  <p>Escolaridad: {dato.escolaridad}</p>
                  <p>Experiencia: {dato.experiencia}</p>
                  <p>Horario: {dato.horarioEntrada} - {dato.horarioSalida}</p>
                  <p>Municipio: {dato.municipio}</p>
                  <p>Sueldo Mensual: {dato.sueldoMensual}</p>
                </div>
              ))}
          </div>
      )}

    </>
  )
}

export default App
