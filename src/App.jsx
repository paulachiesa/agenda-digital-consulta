import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Calendar from "./components/Calendar/Calendar";
import Filters from "./components/Filters/Filters";
import { startOfMonth, endOfMonth } from "date-fns";
import { getAllEventos } from "./services/Eventos";

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    fechaFiltrar: null,
    idSala: null,
    idGrupo: null,
    titulo: "",
  });
  const [currentRange, setCurrentRange] = useState({
    start: startOfMonth(new Date()),
    end: endOfMonth(new Date()),
  });

  useEffect(() => {
    getEventos();
  }, [currentRange]);

  const getEventos = () => {
    const { fechaFiltrar, idSala, idGrupo, titulo } = filters;
    getAllEventos(
      currentRange.start,
      currentRange.end,
      titulo,
      idSala,
      idGrupo
    ).then((res) => {
      setEvents(res.d.ObjectData);
    });
  };

  const handleRangeChange = (range) => {
    setCurrentRange(range);
  };

  const limpiarBusqueda = () => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      idSala: null,
      idGrupo: null,
      titulo: "",
    }));
  };

  useEffect(() => {
    if (!filters.idSala && !filters.idGrupo && !filters.titulo) {
      getEventos();
    }
  }, [filters]);


  const handleEventoEncontrado = (fechaFiltrar, idSala, idGrupo, titulo) => {
    setLoading(true)
    setFilters((prevFilters) => ({
      ...prevFilters,
      fechaFiltrar,
      idSala,
      idGrupo,
      titulo,
    }));
    getAllEventos(
      currentRange.start,
      currentRange.end,
      titulo,
      idSala,
      idGrupo
    ).then((res) => {
      setEvents(res.d.ObjectData);
    })
    .finally(() => {
      setLoading(false)
    });
  };

  return (
    <div className="justify-content-center mt-1">
      <Header />
      <h2 style={{ fontSize: "2.5em", marginTop: "0.5em" }}>Agenda Digital</h2>
      <div>
        <Filters
          filters={filters}
          setFilters={setFilters}
          onBuscar={handleEventoEncontrado}
          onLimpiar={limpiarBusqueda}
          loading={loading}
        />
      </div>
      <Calendar
        events={events}
        onRangeChange={handleRangeChange}
        selectedDate={filters.fechaFiltrar}
      />
    </div>
  );
}

export default App;
