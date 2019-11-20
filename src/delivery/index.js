import React, { useState, useEffect, useRef, useCallback } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import { Button, TextField } from "@material-ui/core";
import { parseNumerToShow } from "../Utils";
import { convertCurrency } from "../domain/convert/actions";
import { network } from "../infra/rest";

const ConvertInput = props => {
  const [result, setResult] = useState(0);
  const [dollar, setDollar] = useState();
  const [ready, setReady] = useState(false);

  const euroValue = useRef(null);
  const dollarValue = useRef(null);

  const handleConvert = () => {
    const euro = euroValue.current.querySelector("input[id='euro']").value;
    setResult(parseNumerToShow(convertCurrency(euro, dollar)));
  };

  useEffect(() => {
    const fetchData = async () => {
      // const url = "http://data.fixer.io/api/latest?access_key=33b23d6e01efe285daf21f65e1124757";
      const rs = await network(url);

      setDollar(rs.rates.USD);
      dollarValue.current.querySelector("input[id='dollar']").value =
        rs.rates.USD;
    };
    fetchData();
  }, []);

  return (
    <Container className={props.classes.cardGrid} maxWidth="md">
      <form className={props.classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              {result}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              type="text"
              fullWidth
              name="euro"
              id="euro"
              label="€ euro"
              ref={euroValue}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              type="text"
              fullWidth
              disabled
              id="dollar"
              name="dollar"
              ref={dollarValue}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={props.classes.submit}
              onClick={handleConvert}
            >
              Convert
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export { ConvertInput };
