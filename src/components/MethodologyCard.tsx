import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: "32px 0px",
  },
  methodologyTitle: {
    fontWeight: "bold",
  },
  methodologyAccordion: {
    "& .MuiAccordionDetails-root": {
      display: "block",
    },
  },
}));

type Props = {
  data: any;
};

const MethodologyCard: React.FC<Props> = ({ data }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography className={classes.methodologyTitle}>
        {data["p_6_value"]}
      </Typography>

      <p> {data["p_7_value"]} </p>
      <p> {data["p_8_value"]} </p>
      <p> {data["p_9_value"]} </p>
      <p> {data["p_10_value"]} </p>
    </div>
  );
};

export default MethodologyCard;
