import React, { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
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
  return (
    <>
      <div className="modalSectionTitle">
        <h4>{data.title}</h4>
      </div>
      <div className="modalSectionBody">
        <div className="timeSection">
          <h4>{data.Fecha}</h4>
          <Divider orientation="vertical" flexItem />
          <h4>
            {data.HoraDesde} - {data.HoraHasta}
          </h4>
        </div>
        <Divider variant="middle" className="divider" />
        <div className="event-content">
          <InfoRow
            label="Sala"
            value={
              data?.Salas?.length
                ? data.Salas.map((sala, index) => (
                    <div key="index">{sala.Descripcion}</div>
                  ))
                : "Sin Sala"
            }
          />
          <InfoRow
            label="Grupo"
            value={
              data?.Grupos?.length
                ? data.Grupos.map((grupo, index) => (
                    <div key="index">{grupo.Descripcion}</div>
                  ))
                : "Sin Grupo"
            }
          />
          <InfoRow label="Tipo" value={data.Tipo} />
          <InfoRow label="Descripción" value={data.Descripcion} />
          <InfoRow label="Estado" value={data.Estado} />
          {data.MotivoCancelacion ? (
            <InfoRow
              label="Motivo Cancelación"
              value={data.MotivoCancelacion}
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
