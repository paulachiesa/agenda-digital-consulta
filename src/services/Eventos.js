import AxiosInstance from "./Axios";

export const getEventoById = async (id) => {
  try {
    const response = await AxiosInstance.post("./WebMethods.aspx/Obtener", {
      id,
    });
    return Promise.resolve(response ? response.data.d.ObjectData : []);
  } catch (error) {
    //   throw new Error(error.response.data.errors[0].errorMessage);
    setError(error.message);
  }
};

export const getAllEventos = async (
  fechaDesde,
  fechaHasta,
  titulo = "" ,
  idSala = 0,
  idGrupo = 0
) => {
  try {
    const response = await AxiosInstance.post("./WebMethods.aspx/Filtrar", {
      fechaDesde,
      fechaHasta,
      titulo,
      idSala,
      idGrupo,
    });
    return Promise.resolve(response ? response.data : []);
  } catch (error) {
    throw new Error(error);
  }
};
