import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import {
  format,
  getDay,
  parse,
  startOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
  endOfWeek,
} from "date-fns";
import { es } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
import Modal from "../Modal/Modal";
import ModalBodyCalendario from "../Modal/ModalBodyCalendario";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { getEventoById } from "../../services/Eventos";


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
  previous: <NavigateBeforeIcon />,
  next: <NavigateNextIcon />,
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

const MyCalendar = ({ events, onRangeChange, selectedDate }) => {
  const [abrirModal, setAbrirModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentView, setCurrentView] = useState(Views.MONTH);
  const defaultView = Views.MONTH;
  const [eventsFinal, setEventsFinal] = useState([]);

  useEffect(() => {
    const transformedEvents = events?.map((event) => {
      const startDate =
        typeof event.start === "string"
          ? new Date(parseInt(event.start.match(/\d+/)[0], 10))
          : null;
      const endDate =
        typeof event.end === "string"
          ? new Date(parseInt(event.end.match(/\d+/)[0], 10))
          : null;

      return {
        ...event,
        title: event.title,
        start: startDate,
        end: endDate,
      };
    });

    setEventsFinal(transformedEvents);
  }, [events]);


  const getEvento = (id) => {
    getEventoById(id).then((res) => {
      setSelectedEvent(res);
      setAbrirModal(true);
    });
  };

  const handleRangeChange = (range, view) => {
    // debugger;

    const actualView = view || currentView;
    if (actualView === "month") {
      onRangeChange({ start: range.start, end: range.end });
    } else if (actualView === "week") {
      onRangeChange({ start: range[0], end: range[range.length - 1] });
    } else if (actualView === "day") {
      let today = range[0];
      onRangeChange({ start: today, end: addDays(today, 1) });
    }
  };

  const handleViewChange = (newView) => {
    setCurrentView(newView);
  };

  const handleAbrirModal = (event) => {
    getEvento(event.Id);
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
        style={{ height: "auto", width: "95vw", margin: "30px" }}
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
