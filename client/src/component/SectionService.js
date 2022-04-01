import { useState, useEffect } from "react";
import { Grid, InputLabel, TextField, Checkbox, Button } from "@mui/material";
import { Download } from "@mui/icons-material";
import axios from "axios";

const SectionService = ({
  get,
  price_info,
  checked_info,
  rHH,
  rT,
  fA,
  lA,
  cHH,
  cT,
  aHH,
  aT,
}) => {
  const [showBtn, setShowBtn] = useState(false);
  const [table, setTable] = useState([]);
  const [factorVisiable, setFactorVisiable] = useState(false);
  useEffect(() => {
    let bool1 = true,
      bool2 = true,
      bool3 = true,
      bool4 = true;
    if (checked_info[0]) {
      bool1 = false;
      if (rHH !== "" && rT !== "") bool1 = true;
    }
    if (checked_info[1]) {
      bool2 = false;
      if (fA !== "" && lA !== "") bool2 = true;
    }
    if (checked_info[2]) {
      bool3 = false;
      if (cHH !== "" && cT !== "") bool3 = true;
    }
    if (checked_info[3]) {
      bool4 = false;
      if (aHH !== "" && aT !== "") bool4 = true;
    }
    if (!checked_info.includes(true)) bool1 = false;
    setShowBtn(bool1 && bool2 && bool3 && bool4);
  }, [checked_info, rHH, rT, fA, lA, cHH, cT, aHH, aT]);
  const readTable = async () => {
    try {
      await axios
        .get("http://10.0.10.10:3001/quotation/readTable", {
          params: {
            price_info: price_info,
            checked_info: checked_info,
            rHH: rHH,
            rT: rT,
            fA: fA,
            lA: lA,
            cHH: cHH,
            cT: cT,
            aHH: aHH,
            aT: aT,
          },
        })
        .then(function (response) {
          setTable(response.data);
        });
    } catch {
      console.log("error");
    }
  };

  const handleButton = () => {
    setFactorVisiable(price_info !== "특별");
    readTable();
  };
  const handleCheck = (event) => {
    let pretable = [...table];
    pretable[event.target.name].check = event.target.checked;
    setTable(pretable);
    // console.log(pretable.filter(t=> t.check === true))
    get(
      "services",
      pretable.filter((t) => t.check === true)
    );
  };

  const handleChange = (event) => {
    let pretable = [...table];
    pretable[event.target.name].factor = Number(event.target.value);
    pretable[event.target.name].total =
      pretable[event.target.name].price * pretable[event.target.name].factor;
    setTable(pretable);
    get(
      "services",
      pretable.filter((t) => t.check === true)
    );
  };
  const showTable = table.map((t, index) => (
    <div key={index}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        rowSpacing={1}
        columns={100}
      >
        <Grid item xs={1} sm={1} md={1} lg={1}></Grid>
        <Grid item xs={10} sm={7} md={5} lg={4}>
          <Checkbox inputProps={{ name: index }} onChange={handleCheck} />
        </Grid>
        <Grid item xs={89} sm={39} md={40} lg={40}>
          <TextField
            value={t.item}
            variant="outlined"
            fullWidth
            size="small"
            disabled
          />
        </Grid>
        <Grid item xs={31} sm={1} md={2} lg={3}></Grid>
        <Grid item xs={25} sm={20} md={20} lg={15}>
          <TextField
            value={t.price}
            variant="outlined"
            fullWidth
            size="small"
            disabled
          />
        </Grid>
        <Grid item xs={3} sm={1} md={2} lg={3}></Grid>
        <Grid item xs={10} sm={7} md={5} lg={5}>
          <TextField
            value={t.factor}
            variant="standard"
            onChange={handleChange}
            inputProps={{
              name: index,
              type: "number",
              step: 0.01,
              min: 0.01,
              max: 2,
            }}
            disabled={factorVisiable}
          />
        </Grid>
        <Grid item xs={5} sm={3} md={4} lg={5}></Grid>
        <Grid item xs={25} sm={20} md={20} lg={15}>
          <TextField
            value={t.total}
            variant="outlined"
            fullWidth
            size="small"
            disabled
          />
        </Grid>
        <Grid item xs={2} sm={1} md={1} lg={9}></Grid>
      </Grid>
    </div>
  ));

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        columns={100}
      >
        <Grid item xs={75} sm={80} md={85} lg={90}>
          <h2>4. 세부항목</h2>
        </Grid>
        <Grid item xs={25} sm={20} md={15} lg={10}>
          <Button
            variant="contained"
            startIcon={<Download />}
            onClick={handleButton}
            disabled={!showBtn}
          >
            산출{" "}
          </Button>
        </Grid>
      </Grid>
      <Grid
        style={{
          padding: "1rem",
          borderTop: "2px solid #eaedf0",
          borderBottom: "2px solid #eaedf0",
          backgroundColor: "#f6f9fc",
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          rowSpacing={1}
          columns={100}
        >
          <Grid item xs={1} sm={1} md={1} lg={1}></Grid>
          <Grid item xs={30} sm={7} md={5} lg={4}>
            <InputLabel id="demo-simple-select-label"></InputLabel>
          </Grid>
          <Grid item xs={20} sm={39} md={40} lg={40}>
            <InputLabel id="demo-simple-select-label">세부용역</InputLabel>
          </Grid>
          <Grid item xs={50} sm={1} md={2} lg={3}></Grid>
          <Grid item xs={15} sm={19} md={20} lg={15}>
            <InputLabel id="demo-simple-select-label">용역비</InputLabel>
          </Grid>
          <Grid item xs={1} sm={1} md={1} lg={3}></Grid>
          <Grid
            item
            xs={15}
            sm={10}
            md={7}
            lg={5}
            style={{ textAlign: "center" }}
          >
            <InputLabel id="demo-simple-select-label">가중치</InputLabel>
          </Grid>
          <Grid item xs={1} sm={1} md={3} lg={5}></Grid>
          <Grid item xs={10} sm={20} md={20} lg={15}>
            <InputLabel id="demo-simple-select-label">합계</InputLabel>
          </Grid>
          <Grid item xs={1} sm={1} md={1} lg={9}></Grid>
        </Grid>
        <br />
        {showTable}
      </Grid>
      <br />
      <Grid container direction="row" columns={100}>
        <Grid item xs={45} sm={45} md={45} lg={45}></Grid>
        <Grid item xs={10} sm={10} md={10} lg={10}>
          <Button type="submit" variant="contained">
            submit
          </Button>
        </Grid>
        <Grid item xs={45} sm={45} md={45} lg={45}></Grid>
      </Grid>
      <br />
    </>
  );
};

export default SectionService;
