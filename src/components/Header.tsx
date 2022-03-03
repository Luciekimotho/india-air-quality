import { AppBar, Toolbar, TextField, makeStyles } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React from "react";

const useStyles = makeStyles((theme) => ({
  toolBar: {
    justifyContent: "end",
  },

  textfield: {
    "& .MuiInputBase-input.MuiAutocomplete-input": {
      color: "white",
    },
    "& .MuiAutocomplete-popupIndicator": {
      color: "white",
    },
    "& .MuiInput-underline:before": {
      border: "0px",
      transition: "border-bottom-color 200ms cubic-bezier(0, 0, 0, 0) 0ms",
    },
    "& .MuiInput-underline:after  ": {
      border: "0px",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      border: "0px",
    },
  },
}));

type Props = {
  language: string;
  handleLanguageSelection: (event: any, newValue: any) => void;
};

const Header: React.FC<Props> = ({
  language,
  handleLanguageSelection,
}: Props) => {
  const classes = useStyles();
  const languages = ["English", "Hindi"];

  return (
    <AppBar position="static" color="primary">
      <Toolbar className={classes.toolBar}>
        <Autocomplete
          id="languages"
          options={languages}
          value={language}
          disableClearable
          onChange={(event: any, newValue: any) => {
            handleLanguageSelection(event, newValue);
          }}
          getOptionLabel={(option) => option}
          style={{ width: 100 }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              className={classes.textfield}
            />
          )}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
