import React, { useEffect, useState } from "react";
import MiniSpinner from "../MiniSpinner/MiniSpinner";
import { format } from "date-fns";
import Divider from "@mui/material/Divider";
import { getEventoById } from "../../services/Eventos";
import "./Modal.css";

const InfoRow = ({ label, value }) => (
  <div className="row">
    <div className="col-xs-6" style={{ textAlign: "end" }}>
      <b>{label}: </b>
    </div>
    <div className="col-xs-6">
      {Array.isArray(value) ? (
        value?.map((item, index) => <div key={index}>{item}</div>)
      ) : (
        <span>{value}</span>
      )}
    </div>
  </div>
);

const ModalBodyCalendario = ({ data }) => {
  const [eventoSeleccionado, setEventoSeleccionado] = useState([]);
  // console.log("evento seleccionado: ", data);
  // console.log("evento seleccionado - api: ", eventoSeleccionado);

  useEffect(() => {
    getEventoById(data.Id).then((res) => setEventoSeleccionado(res));
  }, []);

  const convertirFecha = (fechaOriginal) => {
    const fecha = new Date(fechaOriginal);
    let fechaFormateada = format(fecha, "dd/MM/yyyy");
    if (fechaFormateada === "01/01/0001") {
      fechaFormateada = "";
    }
    return fechaFormateada;
  };

  const convertirHora = (fechaOriginal) => {
    const fecha = new Date(fechaOriginal);
    const horaFormateada = format(fecha, "HH:mm:ss");
    return horaFormateada;
  };

  return (
    <>
      <div className="modalSectionTitle">
        <h4>{eventoSeleccionado.title}</h4>
      </div>
      <div className="modalSectionBody">
        {/* <Divider variant="middle" className="divider" /> */}

        <div className="timeSection">
          <h4>{convertirFecha(data.start)}</h4>
          <Divider orientation="vertical" flexItem />
          <h4>
            {convertirHora(data.start)} - {convertirHora(data.end)}
          </h4>
        </div>
        <Divider variant="middle" className="divider" />
        {/* <div className="info-container"></div> */}
        <div className="event-content">
          <InfoRow label="Sala" value={eventoSeleccionado?.Salas?.join(", ") || "Sin sala"} />
          <InfoRow label="Grupo" value={eventoSeleccionado?.Salas?.join(", ") || "Sin sala"} />
          <InfoRow label="Tipo" value={eventoSeleccionado.Tipo} />
          <InfoRow label="Descripción" value={eventoSeleccionado.Descripcion} />
          <InfoRow label="Estado" value={eventoSeleccionado.Estado} />
          {eventoSeleccionado.MotivoCancelacion ? (
            <InfoRow
              label="Motivo Cancelación"
              value={eventoSeleccionado.MotivoCancelacion}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <br />
    </>
  );
};

export default ModalBodyCalendario;
