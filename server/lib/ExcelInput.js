const date = require("./date");

exports.group_name = () => {
  const group_name = [
    { size: 7, color: "#808080" },
    " 스마트그린 플랫폼",
    { bold: true, size: 8, color: "#000000" },
    "  ㈜아키테코 그룹",
  ];
  return group_name;
};

exports.phonnumber = (writer_info) => {
  const phonnumber = [
    { size: 8, color: "#9BBB59" },
    "M. ",
    { size: 8, color: "#000000" },
    `${writer_info[0].phone}`,
  ];
  return phonnumber;
};

exports.email = (writer_info) => {
  const email = [
    { size: 8, color: "#9BBB59" },
    "E. ",
    { size: 8, color: "#000000" },
    `${writer_info[0].email}`,
  ];
  return email;
};

exports.fax = (writer_info) => {
  const fax = [
    { size: 8, color: "#9BBB59" },
    "F. ",
    { size: 8, color: "#000000" },
    `${writer_info[0].fax}`,
  ];
  return fax;
};

exports.footer_option_text = () => {
  const footer_option_text = [
    { size: 9, bold: true },
    "▣ 견적조건/특이사항",
    { size: 7, bold: false },
    ` (견적일로부터 30일 유효)
        1. 인증 평가 수수료는 발주처에서 인증기관으로 직접 납부하는 조건이며, 인증 규정 및 설계 개요에 따라 변경될 수 있음(참조용)
        2. 에너지절약계획서 작성은 건축분야에 한함(기계, 전기 제외)
        3. 녹색건축물 목표달성을 위해 '건축물전과정수행평가(LCA)'업무가 필요할 경우 당사에서 수행 가능함
        (별도 견적으로 예비인증 500만원. VAT별도)
        4. 인허가 변경,, 설계변경, 기타요인으로 인한 추가용역 발생시 80%의 추가용역비가 발생함(세움터 업로드 1회 이후에는 추가 용역 발생)
        ※ 지불조건: 착수시 20%, 접수시 50%, 완료시 30% /계약시 협의`,
  ];
  return footer_option_text;
};

exports.footer_sign_text = (writer_info) => {
  const footer_sign_text = [
    { size: 11, bold: true },
    "                                          (주)아키테코 그룹",
    { size: 11, bold: false },
    `       대표이사   ${writer_info[0].name}      (인)`,
  ];
  return footer_sign_text;
};

exports.footer_text = () => {
  const footer_text =
    " ArchitecoGroup Co., Ltd. \n S-TRENUE 3002-ho, 37, Gukjegeumyung-ro 2-gil, Yeongdeungpo-gu, Seoul, Republic of Korea  / www.architeco.kr";
  return footer_text;
};

exports.company = (data) => {
  const company = data;
  return company;
};

exports.client_name = (post) => {
  const client_name = `의뢰인 : ${post.client_name} 대표님 (T: ${post.client_phone}  E: ${post.client_email} )`;
  return client_name;
};

exports.getDate = (post) => {
  const getDate = date.changeDate(post.date_info);
  return getDate;
};

exports.dates = (post) => {
  let dates = "";
  if (post.step1Date) {
    if (dates !== "") dates += ", ";
    dates +=
      "인허가 또는 사업승인" + "( " + date.changeDate(post.step1Date) + " )";
  }
  if (post.step2Date) {
    if (dates !== "") dates += ", ";
    dates += "준공" + "( " + date.changeDate(post.step2Date) + " )";
  }
  if (post.step3Date) {
    if (dates !== "") dates += ", ";
    dates += "제출일" + "( " + date.changeDate(post.step3Date) + " )";
  }
  return dates;
};

exports.size = (post) => {
  let size;
  if (post.floorArea) {
    size = `연면적 ${post.floorArea}㎡, 대지면적 ${post.landArea}㎡`;
  } else {
    size = `세대수 ${post.houseHold}, 타입수 ${post.type}`;
  }
  return size;
};

exports.test = () => {
  return;
};
