import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import {
  format,
  getDay,
  parse,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfDay,
  endOfDay,
  addDays,
} from "date-fns";
import { es } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
import Modal from "../Modal/Modal";
import ModalBodyCalendario from "../Modal/ModalBodyCalendario";
import eventos from "../../assets/eventos";
import { getAllEventos, getEventoById } from "../../services/Eventos";

const locales = {
  es: es,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
const messages = {
  allDay: "Todo el día",
  previous: "Anterior",
  next: "Siguiente",
  today: "Hoy",
  month: "Mes",
  week: "Semana",
  day: "Día",
  agenda: "Agenda",
  date: "Fecha",
  time: "Hora",
  event: "Evento",
  noEventsInRange: "No hay eventos en este rango.",
  showMore: (total) => `+ Ver más (${total})`,
};

const MyCalendar = () => {
  const [abrirModal, setAbrirModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentRange, setCurrentRange] = useState({
    start: startOfMonth(new Date()),
    end: endOfMonth(new Date()),
  });
  const [titulo, setTitulo] = useState("");
  const [idSala, setIdSala] = useState("");
  const [idGrupo, setIdGrupo] = useState("");
  const [currentView, setCurrentView] = useState(Views.MONTH);
  const defaultView = Views.MONTH;
  const [events, setEvents] = useState([]);
  const [eventsFinal, setEventsFinal] = useState([]);

  // const getEvento = (id) => {
  //   getEventoById(id).then((res) => setEvents)
  // }

  useEffect(() => {
    const transformedEvents = events?.map((event) => {
      const startDate = typeof event.start === 'string' ? new Date(parseInt(event.start.match(/\d+/)[0], 10)) : null;
      const endDate = typeof event.end === 'string' ? new Date(parseInt(event.end.match(/\d+/)[0], 10)) : null;

      return {
        ...event,
        title: event.title,
        start: startDate,
        end: endDate,
      };
    });

    setEventsFinal(transformedEvents);
  }, [events]);

  useEffect(() => {
    getEventos();
  }, []);

  const getEventos = () => {
    getAllEventos(
      currentRange.start,
      currentRange.end,
      titulo,
      idSala,
      idGrupo
    ).then((res) => setEvents(res.d.ObjectData));
  };

  // console.log("eventos: ", eventsFinal);
  // console.log("rango de fechas: ", currentRange);

  const handleRangeChange = (range, view) => {
    const actualView = view || currentView;
    // debugger;
    if (actualView === "month") {
      setCurrentRange({ start: range.start, end: range.end });
    } else if (actualView === "week") {
      setCurrentRange({ start: range[0], end: range[range.length - 1] });
    } else if (actualView === "day") {
      let today = range[0];
      setCurrentRange({ start: today, end: addDays(today, 1) });
    }
  };

  // console.log("rango actual: ", currentRange);

  const handleViewChange = (newView) => {
    setCurrentView(newView);
  };

  const handleAbrirModal = (event) => {
    setAbrirModal(true);
    setSelectedEvent(event);
  };

  const handleCerrarModal = () => {
    setAbrirModal(false);
    setSelectedEvent(null);
  };

  return (
    <div className="calendar-agenda">
      <Calendar
        culture={"es"}
        messages={messages}
        events={eventsFinal}
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        defaultView={defaultView}
        views={["month", "week", "day", "agenda"]}
        style={{ height: 650, width: "80vw", margin: "30px" }}
        onSelectEvent={handleAbrirModal}
        onRangeChange={(range, view) => handleRangeChange(range, view)}
        onView={(view) => handleViewChange(view)}
      />

      <Modal
        abrirModal={abrirModal}
        setAbrirModal={setAbrirModal}
        children={<ModalBodyCalendario data={selectedEvent} />}
        onClose={handleCerrarModal}
      />
    </div>
  );
};

export default MyCalendar;
