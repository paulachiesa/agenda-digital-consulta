import React, { useState, useEffect } from "react";
import ComboBox from "../ComboBox/ComboBox";
import {
  Button,
  Box,
  Drawer,
  TextField,
  Divider,
  Typography,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import peliculas from "../../assets/datosCombo";
import { getConfiguracion } from "../../services/Configuracion";

const Filters = ({ filters, setFilters, onBuscar, onLimpiar }) => {
  const [open, setOpen] = React.useState(false);
  const [comboGrupos, setComboGrupos] = useState([]);
  const [comboSalas, setComboSalas] = useState([]);
  const [idSalaSeleccionada, setIdSalaSeleccionada] = useState('')
  const [idGrupoSeleccionado, setIdGrupoSeleccionado] = useState('')
  const mobile = window.matchMedia("(max-width: 430px)").matches;

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // console.log('sala', idSalaSeleccionada)
  // console.log('grupo', idGrupoSeleccionado)

  const handleChange = (field) => (event, newValue) => {
    if (field === 'grupo') {
      setIdGrupoSeleccionado(newValue ? newValue.id : null);
    } else if (field === 'sala') {
      setIdSalaSeleccionada(newValue ? newValue.id : null);
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

  const DrawerContent = (
    <Box sx={{ width: 250, margin: "10px 10px 3px 10px" }}>
      <div className="mb-2">
        <Typography
          variant="h6"
          sx={{
            marginTop: "10px",
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          Filtros de Búsqueda
        </Typography>
        <Divider />
      </div>
      <div className="row" style={{ width: "min-content" }}>
        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              sx={{
                "& .MuiDateCalendar-root": {
                  margin: 0,
                },
              }}
            />
          </LocalizationProvider>
        </Box>
        <Box sx={{ minWidth: "100%", paddingBottom: "20px" }}>
          <ComboBox label="Grupo" options={comboGrupos} onChange={handleChange('grupo')}/>
        </Box>
        <Box sx={{ minWidth: "100%", paddingBottom: "20px" }}>
          <ComboBox label="Sala" options={comboSalas} onChange={handleChange('sala')}/>
        </Box>
        <Box sx={{ minWidth: "100%", paddingBottom: "20px" }}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Título"
            variant="outlined"
          />
        </Box>
      </div>
    </Box>
  );

  return (
    <div>
      <div style={{ textAlign: "start" }}>
        <Button
          onClick={toggleDrawer(true)}
          sx={{
            color: "var(--institutionalGreen)",
            textTransform: "none",
          }}
        >
          {!mobile && "Refinar Búsqueda"} <TuneIcon />
        </Button>
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
      </Drawer>
    </div>
  );
};

export default Filters;
