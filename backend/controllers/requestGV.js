function saveGV(data) {
  try {
    //const { id, fechaCreado, fechaViaje, empresa } = data;
    const sheetGV = obtenerSheet(env_().SH_REGISTRO_GV);
    //sheetGV.appendRow([id, fechaCreado, fechaViaje, empresa]);
    Insert(JSON.parse(data), sheetGV);

    return {
      titulo: "Registro Exitoso",
      descripcion: "Gerencia de Viaje Cargado y En Proceso",
    };
  } catch (error) {
    return {
      titulo: "Ha Ocurrido un Error! " + error,
      descripcion: "Error almacenado para su evaluacion",
    };
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

function listarAprovador(nivel = undefined) {
  return JSON.stringify(
    _readNivel(obtenerSheet(env_().SH_REGISTRO_APROVADOR), nivel)
  );
}

function resAprovado(id, valor, fechaAprovado) {
  try {
    const sheet = obtenerSheet(env_().SH_REGISTRO_GV);
    const cRows = obtenerRows(env_().SH_REGISTRO_GV);
    var gv = sheet.getDataRange().getValues();
    for (var i = 0; i < cRows; i++) {
      if (gv[i][0] == id) {
        var j = 1 + i;
        sheet.getRange(j, 3).setValue(fechaAprovado);
        sheet.getRange(j, 5).setValue(valor);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

function listarRecursos(id = undefined) {
  return JSON.stringify(_read(obtenerSheet(env_().SH_REGISTRO_RECURSO), id));
}

function emailSend(id, fechaCreado, creadoPor, estado, valor, niveL, emailaprobador, fechaViaje, motivoViaje, horaSalida) {
  const usuario = { id, fechaCreado, creadoPor, estado, valor, niveL, emailaprobador, fechaViaje, motivoViaje, horaSalida}
  var repo = HtmlService.createTemplateFromFile('frontend/report.html')
  repo.usuario = usuario
  var mes = repo.evaluate().getContent()
 
  if(usuario.estado === "Pendiente") {
    GmailApp.sendEmail(
      usuario.emailaprobador,
      "Ticket: " + usuario.id,
       "mes",
       {htmlBody: mes}
  );
  } else if(usuario.estado !== "Pendiente") {
    GmailApp.sendEmail(
      usuario.creadoPor,
      "Ticket: " + usuario.id,
       "mes",
       {htmlBody: mes}
  );
  }
 
}

function closeGV(id, CerradoPor, fechaCierre) {
  try {
    const sheet = obtenerSheet(env_().SH_REGISTRO_GV);
    const cRows = obtenerRows(env_().SH_REGISTRO_GV);
    var gv = sheet.getDataRange().getValues();
    for (var i = 0; i < cRows; i++) {
      if (gv[i][0] == id) {
        var j = 1 + i;
        sheet.getRange(j, 5).setValue("Cerrado");
        sheet.getRange(j, 39).setValue(fechaCierre);
        sheet.getRange(j, 40).setValue(CerradoPor);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

function listarEstado(estado) {
  return JSON.stringify(readEstado(obtenerSheet(env_().SH_REGISTRO_GV), estado))
 
}