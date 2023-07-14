function saveGV(data) {
    try {
       //const { id, fechaCreado, fechaViaje, empresa } = data;
        const sheetGV = obtenerSheet(env_().SH_REGISTRO_GV);
       //sheetGV.appendRow([id, fechaCreado, fechaViaje, empresa]);
        Insert(JSON.parse(data), sheetGV);

        return {
            titulo: "Registro Exitoso",
            descripcion: "Usuarios Ya Almacenado en Base de Datos"
        }
    } catch (error) {
        return {
            titulo: "Ha Ocurrido un Error! " + error,
            descripcion: "Error almacenado para su evaluacion"
        }
    }
}

function listarRequest(id = undefined) {
    return JSON.stringify(_read(obtenerSheet(env_().SH_REGISTRO_GV), id));
  }


function cantRows() {
    return obtenerRows(env_().SH_REGISTRO_GV);
  }

  function email() {
    return perfilUsuario();
  }