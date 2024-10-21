import React, { useState, useEffect } from "react";
import "./Filters.css"
import ComboBox from "../ComboBox/ComboBox";
import {
  Button as ButtonMui,
  Box,
  Drawer,
  TextField,
  Divider,
  Typography,
} from "@mui/material";
import Button from "../Button/Button";
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { getConfiguracion } from "../../services/Configuracion";
import MiniSpinner from "../MiniSpinner/MiniSpinner"
import esLocale from 'date-fns/locale/es';


const Filters = ({ filters, setFilters, onBuscar, onLimpiar, loading }) => {
  const [open, setOpen] = React.useState(false);
  const [comboGrupos, setComboGrupos] = useState([]);
  const [comboSalas, setComboSalas] = useState([]);
  const mobile = window.matchMedia("(max-width: 430px)").matches;


  const { fechaFiltrar, idSala, idGrupo, titulo } = filters;

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange = (field) => (newValue) => {
    if (field === "grupo") {
      setFilters((prevFilter) => ({
        ...prevFilter,
        idGrupo: newValue ? newValue.Id : null,
      }));
    } else if (field === "sala") {
      setFilters((prevFilter) => ({
        ...prevFilter,
        idSala: newValue ? newValue.Id : null,
      }));
    } else if (field === "titulo") {
      setFilters((prevFilter) => ({
        ...prevFilter,
        titulo: newValue ? newValue.target.value : null,
      }));
    } else if (field === "fecha") {
      setSelectedDate(newValue);
      setFilters((prevFilter) => ({
        ...prevFilter,
        // fechaFiltrar: newValue ? new Date(newValue) : null,
        fechaFiltrar: newValue ? newValue : null,
      }));
    }
  };

  useEffect(() => {
    fillCombos();
  }, []);

  const fillCombos = () => {
    getConfiguracion().then((res) => {
      setComboSalas(res.d.ObjectData.Salas);
      setComboGrupos(res.d.ObjectData.Grupos);
    });
  };

  const limpiarBusqueda = () => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      idSala: null,
      idGrupo: null,
      titulo: "",
    }));
    onLimpiar();
  };

  const buscar = () => {
    onBuscar(fechaFiltrar, idSala, idGrupo, titulo);
  };


  const DrawerContent = (
    <Box sx={{ margin: "10px 10px 3px 10px" }}>
      <div>
        <Typography
          variant="h6"
          sx={{
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          Filtros de Búsqueda
        </Typography>
        <Divider />
      </div>
      <div className="row" style={{ width: "min-content" }}>
        <Box sx={{}}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
            <DateCalendar
              value={selectedDate}
              onChange={handleChange("fecha")}
              format="MM/dd/yyyy"
              sx={{
                height: "310px",
                "& .MuiDateCalendar-root": {
                  margin: 0,
                },
              }}
            />
          </LocalizationProvider>
        </Box>
        <Box sx={{ minWidth: "100%", paddingBottom: "20px" }}>
          <ComboBox
            label="Grupo"
            options={comboGrupos}
            onChange={handleChange("grupo")}
            value={comboGrupos.find((grupo) => grupo.Id === idGrupo) || null}
          />
        </Box>
        <Box sx={{ minWidth: "100%", paddingBottom: "20px" }}>
          <ComboBox
            label="Sala"
            options={comboSalas}
            onChange={handleChange("sala")}
            value={comboSalas.find((sala) => sala.Id === idSala) || null}
          />
        </Box>
        <Box sx={{ minWidth: "100%", paddingBottom: "20px" }}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Título"
            variant="outlined"
            onChange={handleChange("titulo")}
            value={titulo}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                buscar();
              }
            }}
          />
        </Box>
      </div>
    </Box>
  );

  return (
    <div>
      <div style={{ textAlign: "start", marginLeft: "26px" }}>
        <ButtonMui
          onClick={toggleDrawer(true)}
          sx={{
            color: "var(--institutionalGreen)",
            textTransform: "none",
          }}
        >
          {!mobile && "Refinar Búsqueda"} <TuneIcon />
        </ButtonMui>
      </div>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            overflowY: "auto",
            overflowX: "hidden",
            width: "22em",
          },
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <IconButton onClick={toggleDrawer(false)} sx={{ paddingBottom: 0 }}>
            <CloseIcon />
          </IconButton>
        </div>
        {DrawerContent}
        <div className="d-flex col justify-content-center btn-container mb-3">
          <Button
            textoBoton={loading ? <MiniSpinner spinnerRow={true} /> : "Buscar"}
            onClickFunction={buscar}
            backgroundColor="#009189"
            height="fit-content"
          />
          <Button
            textoBoton="Limpiar Búsqueda"
            onClickFunction={limpiarBusqueda}
            backgroundColor="#E6E6E6"
            colorText={"black"}
            margin="0 0 0 5px"
            height="fit-content"
          />
        </div>
      </Drawer>
    </div>
  );
};

export default Filters;
