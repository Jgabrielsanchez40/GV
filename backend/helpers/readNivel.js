function _readNivel(sheet, nivel) {
    const data = sheet.getDataRange().getValues();
    const header = data.shift();

    //Buscar tod
    const resultado = data.map((row, indx) => {
        const reduced = header.reduce((accumulator, currentValue, currentIndex) => {
            accumulator[currentValue] = row[currentIndex];
            return accumulator;
        }, {});

        reduced.row = indx + 2;
        return reduced;
    });

    //filtrar si pasa un ID
    if (nivel) {
        return resultado.find((dato) => dato.nivel === nivel)
    }

    return resultado;
}