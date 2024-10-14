import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import "./ComboBox.css"

const ComboBox = ({ label, options }) => {

  const defprops = {
    options: options?.map((option) => ({ Id: option.Id, Descripcion: option.Descripcion })),
    getOptionLabel: (options) => options.Descripcion,
  };

  return (
    <div>
      <Autocomplete
      {...defprops}
        disablePortal
        // options={options}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </div>
  );
};

export default ComboBox;
