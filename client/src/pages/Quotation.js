import React, { useState, useEffect } from "react";
import SectionWriter from "../component/SectionWriter";
import SectionClient from "../component/SectionClient";
import SectionProject from "../component/SectionProject";
import SectionService from "../component/SectionService";
import axios from "axios";
import { Container, Grid, Button } from "@mui/material";

const Quotation = () => {
  const [writerList, setWriterList] = useState([]);
  const [writer, setWriter] = useState("");
  const [client, setClient] = useState("");
  const [company, setCompany] = useState("");
  const [number, setNumber] = useState("");
  const [mail, setMail] = useState("");
  const [service, setService] = useState("");
  const [useage, setUseage] = useState("");
  const [municipalityList, setMunicipalityList] = useState([]);
  const [municipality, setMunicipality] = useState("");
  const [position, setPosition] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [step1Date, setStep1Date] = useState("");
  const [step2Date, setStep2Date] = useState("");
  const [step3Date, setStep3Date] = useState("");
  const [price, setPrice] = useState("");
  const [residential, setResidential] = useState(false);
  const [nonResidential, setNonResidential] = useState(false);
  const [complex, setComplex] = useState(false);
  const [apartment, setApartment] = useState(false);
  const [residentialHouseHold, setResidentialHouseHold] = useState();
  const [residentialType, setResidentialType] = useState();
  const [floorArea, setFloorArea] = useState("");
  const [landArea, setLandArea] = useState("");
  const [complexHouseHold, setComplexHouseHold] = useState("");
  const [complexType, setComplexType] = useState("");
  const [apartmentHouseHold, setApartmentHouseHold] = useState("");
  const [apartmentType, setApartmentType] = useState("");
  const [services, setServices] = useState([]);
  const init = async () => {
    try {
      await axios
        .get("http://10.0.10.10:3001/quotation")
        .then(function (response) {
          console.log(response);
          const writer_list = response.data.writer.map((writer) => {
            return writer.name;
          });
          //setWriterList(writer_list);
          setWriterList(response.data.writer);
          const service_list = response.data.service.map((service) => {
            return { id: service.id, item: service.item };
          });
          setMunicipalityList([
            "서울시",
            "인천시",
            "경기도",
            "광주시",
            "부산시",
            "제주도",
            "울산시",
            "대구시",
            "순천시",
            "세종시",
          ]);
        });
    } catch {
      console.log("error");
    }
  };
  const submit = async () => {
    try {
      await axios.post("http://10.0.10.10:3001/quotation", {
        writer: writer,
        client: client,
        c_company: company,
        c_number: number,
        c_email: mail,
        useage: useage,
        m_service: service,

        municipality: municipality,
        position: position,

        currentDate: currentDate,
        step1Date: step1Date,
        step2Date: step2Date,
        step3Date: step3Date,

        price: price,
        dwelling: residential ? "주거" : "비주거",

        houseHold: residentialHouseHold,
        type: residentialType,
        floorArea: floorArea,
        landArea: landArea,

        services: services,
      });
    } catch {
      console.log("submit_error");
    }
  };
  useEffect(() => {
    init();
  }, []);

  const getValue = (name, value) => {
    if (name === "writer") setWriter(value);
    else if (name === "client") setClient(value);
    else if (name === "company") setCompany(value);
    else if (name === "number") setNumber(value);
    else if (name === "mail") setMail(value);
    else if (name === "service") setService(value);
    else if (name === "useage") setUseage(value);
    else if (name === "municipality") setMunicipality(value);
    else if (name === "position") setPosition(value);
    else if (name === "currentDate") setCurrentDate(value);
    else if (name === "step1Date") setStep1Date(value);
    else if (name === "step2Date") setStep2Date(value);
    else if (name === "step3Date") setStep3Date(value);
    else if (name === "price") setPrice(value);
    else if (name === "residential") setResidential(value);
    else if (name === "nonResidential") setNonResidential(value);
    else if (name === "complex") setComplex(value);
    else if (name === "apartment") setApartment(value);
    else if (name === "residentialHouseHold") setResidentialHouseHold(value);
    else if (name === "residentialType") setResidentialType(value);
    else if (name === "floorArea") setFloorArea(value);
    else if (name === "landArea") setLandArea(value);
    else if (name === "complexHouseHold") setComplexHouseHold(value);
    else if (name === "complexType") setComplexType(value);
    else if (name === "apartmentHouseHold") setApartmentHouseHold(value);
    else if (name === "apartmentType") setApartmentType(value);
    else if (name === "services") setServices(value);
    console.log(value);
  };
  const handleSubmit = (event) => {
    submit();
    event.preventDefault();
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Container fixed style={{ marginTop: "1em" }}>
          <SectionWriter get={getValue} list={writerList} />
          <SectionClient get={getValue} />
          <SectionProject get={getValue} list={municipalityList} />
          <SectionService
            get={getValue}
            price_info={price}
            checked_info={[residential, nonResidential, complex, apartment]}
            rHH={residentialHouseHold}
            rT={residentialType}
            fA={floorArea}
            lA={landArea}
            cHH={complexHouseHold}
            cT={complexType}
            aHH={apartmentHouseHold}
            aT={apartmentType}
          />
        </Container>
      </form>
    </>
  );
};

export default Quotation;
