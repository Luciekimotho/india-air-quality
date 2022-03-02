import "./App.css";
import {
  AppBar,
  Toolbar,
  Button,
  makeStyles,
  TextField,
  Container,
  Grid,
  Divider,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { Autocomplete } from "@material-ui/lab";
import CigaretteIcon from "./assets/ciggrette_icon.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
  ciggContainer: {},
  ciggImage: {
    height: "100px",
  },
  subtitle: {
    textAlign: "center",
  },
  btn: {
    margin: "8px",
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
}));

type City = {
  name: string;
  aqi: string;
  cigg: string;
};

const App: React.FC<any> = () => {
  const classes = useStyles();
  const datatype: { [key: string]: string } = {};
  const [data, setData] = useState(datatype);
  const [cities, setCities] = useState<City[]>([]);
  const [aqi, setAqi] = useState<string>("");
  const [cigg, setCigg] = useState<number>(0);
  const [activeCity, setActiveCity] = useState<any>();

  const fetchData = async () => {
    const res = await axios.get("english.json");
    setData(res.data);
    const citiesCount = res.data.total_cities_1_value;

    let cities: City[] = [];

    for (let i = 1; i < parseInt(citiesCount) + 1; i++) {
      let nameString = `compare-tabs_1_city_${i}_name`;
      let aqiString = `compare-tabs_1_city_${i}_aqi`;
      let ciggString = `compare-tabs_1_city_${i}_cigg`;

      cities.push({
        name: res.data[nameString],
        aqi: res.data[aqiString],
        cigg: res.data[ciggString],
      });
    }

    setCities(cities);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const handleCitySelection = (e: any, option: any) => {
  //   setAqi(option.aqi);
  //   setCigg(parseInt(option.cigg));
  // };
  const handleCitySelection = (city: City) => {
    setAqi(city.aqi);
    setCigg(parseInt(city.cigg));
    setActiveCity(city);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Button color="inherit">English / Hindi</Button>
        </Toolbar>
      </AppBar>

      <Container>
        <h1 className={classes.title}> {data.hero_1_title} </h1>

        <Grid container spacing={3}>
          <Grid item> {data["article-info_1_byline"]} </Grid>
          <Grid item> {data["article-info_1_date"]} </Grid>
          <Grid item>
            <a href={data["article-info_1_category_url"]} target="_blank">
              {data["article-info_1_category"]}
            </a>
          </Grid>
        </Grid>

        <img className={classes.heroImage} src={data["hero_1_image"]} alt="" />

        <p className={classes.bold}> {data["p_1_value"]} </p>
        <p> {data["p_2_value"]} </p>
        <p> {data["p_3_value"]} </p>
        <p> {data["p_4_value"]} </p>
        <p> {data["p_5_value"]} </p>

        <Divider />

        <Grid container spacing={2} className={classes.compareTabs}>
          <Grid item xs={12}>
            <h2 className={classes.subtitle}>
              {" "}
              {data["compare-tabs_1_title"]}{" "}
            </h2>
          </Grid>
          <Grid item xs={8} className={classes.citiesContainer}>
            {cities.map((city: City) => (
              <Button
                id={city.name}
                color={city == activeCity ? "secondary" : "primary"}
                variant={city == activeCity ? "contained" : "outlined"}
                onClick={() => handleCitySelection(city)}
                className={classes.btn}
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
