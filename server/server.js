const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./lib/db");
const quotation = require("./lib/Quotation");
const ReadTable = require("./lib/ReadTable");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

app.get("/quotation", (req, res) => {
  // quotation 경로로 들어온 경우 {작성자, 서비스} 데이터 전달
  db.query(`SELECT * FROM writer`, function (error, writer_info) {
    if (error) {
      throw error;
    }
    db.query(`SELECT id,item FROM service`, function (error, service_info) {
      if (error) throw error;
      console.log("접속");
      res.send({
        writer: writer_info,
        service: service_info,
      });
    });
  });
});

app.get("/quotation/readTable", (req, res) => {
  const post = {
    dwelling: req.query.checked_info[0] === "true" ? "주거" : "비주거", // 주거 or 비주거
    price: req.query.price_info, // 저가 or 중가 or 고가 or 특별
    residential: req.query.checked_info[0],
    nonResidentia: req.query.checked_info[1],
    complex: req.query.checked_info[2],
    apartment: req.query.checked_info[3],
    residentialHouseHold: req.query.rHH,
    residentialType: req.query.rT,
    floor_area: req.query.fA,
    land_area: req.query.lA,
    complexHouseHold: req.query.cHH,
    complexType: req.query.cT,
    apartmentHouseHold: req.query.aHH,
    apartmentType: req.query.aT,
  };
  ReadTable.action(post, res);
});

app.post("/quotation", (req, res) => {
  console.log("접속2");
  const f_area = req.body.f_area;
  const l_area = req.body.l_area;

  const post = {
    writer: req.body.writer,
    client_name: req.body.client,
    client_company: req.body.c_company,
    client_phone: req.body.c_number,
    client_email: req.body.c_email,
    mainservice_name: req.body.m_service,
    useage: req.body.useage,
    position: req.body.position,
    floorArea: req.body.floorArea,
    landArea: req.body.landArea,
    houseHold: req.body.houseHold,
    type: req.body.type,
    date_info: req.body.currentDate,
    step1Date: req.body.step1Date,
    step2Date: req.body.step2Date,
    step3Date: req.body.step3Date,
    dwelling: req.body.dwelling,
    price: req.body.price,
    service_array: req.body.services,
  };
  // console.log(post)
  quotation.action(post);
  res.send("quotation");
});

// app.post('/quotation', (req, res) => {
//   console.log("접속2")
//   const writer = req.body.writer;
//   const client = req.body.client;
//   const c_company = req.body.c_company;
//   const c_number = req.body.c_number;
//   const c_email = req.body.c_email;
//   const m_service = req.body.m_service;
//   const useage = req.body.useage;
//   const position = req.body.position;
//   const service = req.body.service;
//   const f_area = req.body.f_area;
//   const l_area = req.body.l_area;
//   const type = req.body.type;
//   const house = req.body.house;
//   const price = req.body.price;
//   const date = req.body.date;
//   const dwelling = req.body.dwelling;

//   const post = {
//     writer: writer,
//     service_array: service,
//     client_company: c_company,
//     client_name: client,
//     client_phone: c_number,
//     client_email: c_email,
//     mainservice_name: m_service,
//     useage: useage,
//     position: position,
//     floor_area: f_area,
//     land_area:l_area,
//     date_info:date,
//     dwelling:dwelling,
//     price:price,
//   }
//   quotation.action(post);
//   res.send("quotation");
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
