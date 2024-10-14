import AxiosInstance from "./Axios";

export const getConfiguracion = async () => {
  try {
    const response = await AxiosInstance.post(
      "./WebMethods.aspx/ObtenerConfiguracion",
      {}
    );
    return Promise.resolve(response ? response.data : []);
  } catch (error) {
    throw new Error(error);
  }
};
