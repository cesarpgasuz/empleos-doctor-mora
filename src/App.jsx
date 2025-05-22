import { useEffect, useState } from "react";
import { getEmpleos } from "./services/api";
import { formatearCantidad } from "./utils";

function App() {

  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      setCargando(true);
      setDatos([]);

      try {
        const result = await getEmpleos();
        // console.log(result);
        setDatos(result);
        setCargando(false);
      } catch (error) {
        console.log('Error al cargar los datos', error);
      }
    }
    fetchData();
  }, []);

  console.log(datos);

  return (
    <>
      <h1 className='text-center font-bold text-red-500'>Empleos Doctor Mora</h1>
      <a href="https://docs.google.com/forms/d/e/1FAIpQLSeKQw64pDUQ3vBj4zghCqLTNyjn-qt1jLJmpPXI_i4mymzoCg/viewform?usp=header"
        target="_blank"
        rel="noopener noreferrer"
        className="w-fit mx-auto py-2 px-5 bg-amber-300 text-black font-semibold">Escribir una oferta de trabajo</a>

      {cargando ? 'Obteniendo datos...' : (
        <div className="flex flex-col gap-2">
          {datos.map(dato => (
            <div key={dato.id} className="bg-gray-200">
              <h2>{dato.puesto}</h2>
              <p>Edad: {dato.edadMinima} - {dato.edadMaxima}</p>
              <p>Sexo: {dato.sexo}</p>
              <p>Escolaridad: {dato.escolaridad}</p>
              <p>Experiencia: {dato.experiencia}</p>
              <p>Horario: {dato.horarioEntrada.slice(0, -2)} am - {dato.horarioSalida.slice(0, -2)} pm</p>
              <p>Municipio: {dato.municipio}</p>
              <p className="text-lg">Sueldo Mensual: {dato.sueldoMensual === 0 ? 'En entrevista' : formatearCantidad(dato.sueldoMensual)}</p>
            </div>
          ))}
        </div>
      )}

    </>
  )
}

export default App
