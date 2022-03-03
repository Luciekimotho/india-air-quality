import "./App.css";
import {
  Button,
  makeStyles,
  Container,
  Grid,
  Divider,
  AccordionSummary,
  Accordion,
  Typography,
  AccordionDetails,
} from "@material-ui/core";
import { useEffect, useState } from "react";

import hindiData from "./data/hindi.json";
import englishData from "./data/english.json";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Header from "./components/Header";
import CitySelector from "./components/CitySelector";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "32px",
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
  methodologyTitle: {
    fontWeight: "bold",
  },
  methodologyAccordion: {
    "& .MuiAccordionDetails-root": {
      display: "block",
    },
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
      <Header
        language={activeLanguage}
        handleLanguageSelection={handleSelection}
      />

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

        <CitySelector
          activeCity={activeCity}
          cities={cities}
          data={data}
          cigg={cigg}
          aqi={aqi}
          handleCitySelection={handleCitySelection}
        />

        <Divider />

        <Accordion className={classes.methodologyAccordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel-content"
            id="panel-header"
          >
            <Typography className={classes.methodologyTitle}>
              {data["p_6_value"]}{" "}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <p> {data["p_7_value"]} </p>
            <p> {data["p_8_value"]} </p>
            <p> {data["p_9_value"]} </p>
            <p> {data["p_10_value"]} </p>
          </AccordionDetails>
        </Accordion>
      </Container>
    </div>
  );
};

export default App;
