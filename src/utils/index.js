export function formatearCantidad(cantidad){
    const numero = Number(cantidad);
  if (isNaN(numero)) return '$0';
  
  const partes = numero.toString().split('.');
  const decimales = partes[1] ? partes[1].length : 0;
  
  return '$' + numero.toLocaleString('en-US', {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales
  });
}