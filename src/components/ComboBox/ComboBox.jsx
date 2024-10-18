import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import "./ComboBox.css"

const ComboBox = ({ label, options, value, onChange }) => {

  const defprops = {
    options: options?.map((option) => ({ Id: option.Id, Descripcion: option.Descripcion })),
    getOptionLabel: (options) => options.Descripcion,
  };

  return (
    <div>
      <Autocomplete
      {...defprops}
        disablePortal
        onChange={(event, newValue) => onChange(newValue)}
        value={value || null}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </div>
  );
};

export default ComboBox;
