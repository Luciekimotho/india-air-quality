import "./App.css";
import {
  AppBar,
  Toolbar,
  Button,
  makeStyles,
  Container,
  Grid,
  Divider,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import CigaretteIcon from "./assets/ciggrette_icon.png";
import { Autocomplete } from "@material-ui/lab";
import hindiData from "./data/hindi.json";
import englishData from "./data/english.json";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

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

  container: {
    padding: "16px",
  },
  title: {
    // textAlign: "center",
  },
  heroImage: {
    paddingTop: "16px",
  },
  bold: {
    fontWeight: "bold",
  },
  articleInfo: {
    padding: "0px 8px",
  },
  articleInfoLink: {
    padding: "0px 8px",
    textDecoration: "none",
    color: theme.palette.primary.main,
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

const App: React.FC<any> = () => {
  const classes = useStyles();

  const [data, setData] = useState<any>(englishData);
  const [cities, setCities] = useState<City[]>([]);
  const [aqi, setAqi] = useState<string>("");
  const [cigg, setCigg] = useState<number>(0);
  const [activeCity, setActiveCity] = useState<any>();
  const [activeLanguage, setActiveLanguage] = useState<string>("English");

  const languages = ["English", "Hindi"];

  const handleSelection = (e: any, option: any) => {
    setActiveLanguage(option);
  };

  const parseCities = (data: any) => {
    const citiesCount = data.total_cities_1_value;

    let cities: City[] = [];

    for (let i = 1; i < parseInt(citiesCount) + 1; i++) {
      let nameString = `compare-tabs_1_city_${i}_name`;
      let aqiString = `compare-tabs_1_city_${i}_aqi`;
      let ciggString = `compare-tabs_1_city_${i}_cigg`;

      cities.push({
        name: data[nameString],
        aqi: data[aqiString],
        cigg: data[ciggString],
      });
    }

    setCities(cities);
  };

  useEffect(() => {
    if (activeLanguage === "Hindi") {
      setData(hindiData);
      parseCities(hindiData);
    } else {
      setData(englishData);
      parseCities(englishData);
    }
  }, [activeLanguage]);

  const handleCitySelection = (city: City) => {
    setAqi(city.aqi);
    setCigg(parseInt(city.cigg));
    setActiveCity(city);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar className={classes.toolBar}>
          <Autocomplete
            id="languages"
            options={languages}
            value={activeLanguage}
            disableClearable
            onChange={(event: any, newValue: any) => {
              handleSelection(event, newValue);
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

      <Container>
        <h1 className={classes.title}> {data.hero_1_title} </h1>
        <div>
          <span className={classes.articleInfo}>
            {data["article-info_1_byline"]}{" "}
          </span>
          <span>|</span>
          <span className={classes.articleInfo}>
            {data["article-info_1_date"]}
          </span>
          <span>|</span>
          <span>
            <a
              href={data["article-info_1_category_url"]}
              target="_blank"
              className={classes.articleInfoLink}
            >
              {data["article-info_1_category"]}
            </a>
          </span>
        </div>

        <img className={classes.heroImage} src={data["hero_1_image"]} alt="" />

        <p className={classes.bold}> {data["p_1_value"]} </p>
        <p> {data["p_2_value"]} </p>
        <p> {data["p_3_value"]} </p>
        <p> {data["p_4_value"]} </p>
        <p> {data["p_5_value"]} </p>

        <Divider />

        <Grid container spacing={2} className={classes.compareTabs}>
          <Grid item xs={12}>
            <h2 className={classes.subtitle}>{data["compare-tabs_1_title"]}</h2>
          </Grid>
          <Grid item xs={8} className={classes.citiesContainer}>
            {cities.map((city: City) => (
              <Button
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

        <Divider />

        <p className={classes.bold}> {data["p_6_value"]} </p>
        <p> {data["p_7_value"]} </p>
        <p> {data["p_8_value"]} </p>
        <p> {data["p_9_value"]} </p>
        <p> {data["p_10_value"]} </p>
      </Container>
    </div>
  );
};

export default App;
