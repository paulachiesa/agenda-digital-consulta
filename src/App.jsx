import { useState } from "react";
import Header from "./components/Header/Header";
import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Calendar from "./components/Calendar/Calendar";
import Filters from "./components/Filters/Filters";

function App() {
  const [filters, setFilters] = useState({
    idSala: "",
    idGrupo: "",
    titulo: "",
  });

  const limpiarBusqueda = () => {
    setFilters({
      idSala: "",
      idGrupo: "",
      titulo: "",
    });
    // buscarTodosExpedientes();
  };

  const handleEventoEncontrado = (idSala, idGrupo) => {
    console.log("evento encontrado");
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
        />
      </div>
      <Calendar />
    </div>
  );
}

export default App;
