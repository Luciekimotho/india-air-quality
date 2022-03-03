import { Grid, Button, makeStyles, Card } from "@material-ui/core";
import React from "react";
import CigaretteIcon from "../assets/ciggrette_icon.png";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "32px 0px",
  },
  ciggContainer: {},
  ciggImage: {
    height: "100px",
  },
  subtitle: {
    textAlign: "center",
  },
  compareTabs: {
    textAlign: "center",
    padding: "16px",
  },
  selectedContainer: {
    display: "grid",
    justifyContent: "center",
  },
  citiesContainer: {
    textAlign: "center",
  },
  citiesBtn: {
    margin: "8px",
    textTransform: "capitalize",
  },
}));

type City = {
  name: string;
  aqi: string;
  cigg: string;
};

type Props = {
  activeCity: City;
  cities: City[];
  data: any;
  cigg: number;
  aqi: string;
  handleCitySelection: (city: City) => void;
};

const CitySelector: React.FC<Props> = ({
  activeCity,
  cities,
  data,
  cigg,
  aqi,
  handleCitySelection,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Card>
        <Grid container spacing={2} className={classes.compareTabs}>
          <Grid item xs={8} className={classes.citiesContainer}>
            <Grid item xs={12}>
              <h2 className={classes.subtitle}>
                {data["compare-tabs_1_title"]}
              </h2>
            </Grid>
            {cities.map((city: City) => (
              <Button
                key={city.name}
                id={city.name}
                color={city === activeCity ? "secondary" : "primary"}
                variant={city === activeCity ? "contained" : "outlined"}
                onClick={() => handleCitySelection(city)}
                className={classes.citiesBtn}
              >
                {city.name}
              </Button>
            ))}
          </Grid>
          <Grid item xs={4}>
            <div className={classes.selectedContainer}>
              <h3> {activeCity && activeCity.name} </h3>
              <p> {activeCity && ` ${cigg} cigarettes | ${aqi}`} </p>
              <div className={classes.ciggContainer}>
                {cigg > 0 &&
                  [...Array(cigg)].map((value: undefined, index: number) => (
                    <img
                      src={CigaretteIcon}
                      alt="cigarette"
                      className={classes.ciggImage}
                    />
                  ))}
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            {data["compare-tabs_1_method"]}
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default CitySelector;
