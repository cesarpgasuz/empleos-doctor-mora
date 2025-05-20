

export async function getEmpleos() {

    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRiWg81ywV7kiC30qs3uj6NpQpgy8zfQZZ83HCoUWhhgt8nHPxlLRAqROH7QWFmkz1jAeuSwTw4XCKr/pub?gid=0&single=true&output=csv';

    try{

        const datos = await fetch(url);
        const data = await datos.text();
        const infos = data.split("\n").slice(1);
        const rows = infos.map((info) => info.split(','));
        return parseCsv(rows);


    }catch(error){
        console.log('Error al cargar los datos', error);
        return [];
    }

}

function parseCsv(data) {
    return data.map(element => ({
        id: element[0],
        escolaridad: element[1],
        puesto: element[2],
        edad: element[3],
        experiencia: element[4],
        sexo: element[5],
        sueldoMensual: Number(element[6]),
        horario: element[7],
        municipio: element[8]
    }))
}