const date = require('./date')
var xl = require('excel4node');
let db = require('./db');
const fs = require('fs');

exports.action = function(post){
    let item_text = ''
    let item_array = [8]
    //item_array = post.service_array.split(',');
    item_array = post.service_array;
    for(let i=0; i < item_array.length; i++){
        if(i===0){
        item_text += `id=${item_array[i]}`
        }else{
        item_text += ` or id=${item_array[i]}`
        }
    }

    const db_table_name = post.dwelling === "주거" ? 
    post.price === "저가" ? "dwelling_low_price":"dwelling_middle_price" //주거-저가 : 주거-중가
    : post.price === "저가" ? "nondwelling_low_price":"nondwelling_middle_price" //비주거-저가 : 비주거-중가

    const link_name = post.dwelling === "주거" ? "link_dwelling":"link_nondwelling" //주거-저가 : 주거-중가
     
    db.query(`SELECT * FROM writer WHERE ID=${post.writer}`, function (error, writer_info) {
        if (error) {
            throw error;
        }
        db.query(`SELECT * FROM quotation.service where ${item_text} order by category_rank`, function (error, service_info) {
            if (error) {
                throw error;
            }
            db.query(`show columns from ${db_table_name}`, function (error, column_name) {
                if (error) {
                  throw error;
                }
                db.query(`SELECT * FROM ${db_table_name}`, function (error, price_info) {
                    if (error) {
                        throw error;
                    }
                    const percentage = post.price === "중가"? 1 : post.price === "고가" ? 1.2 : 2;
                    //////////////////// 면적,세대수,타입등의 조건에 따른 필드 선택 ///////////////////////////
                    let price_field;
                    if (post.dwelling === "주거"){
                        
                    }else if (post.dwelling === "비주거"){
                        column_name.map((v, index) => {
                            // console.log(v.Field)
                            const non_area = Number(post.floor_area);
                            if(v.Field.includes('_or_less')){             // 3000 이하
                                if(non_area <= Number(v.Field.replace('_or_less',""))){
                                    price_field = v.Field;
                                    console.log(1)
                                }
                            }else if(v.Field.includes('_or_more')){       // 100001 이상
                                if(non_area >= Number(v.Field.replace('_or_more',""))){
                                    price_field = v.Field;
                                    console.log(2)
                                }
                            }else if(v.Field.includes('_to_')){           // 이외 특정값 이상 ~ 특정값 이하
                                const v_array = v.Field.split('_to_');
                                if(v_array[0]<=non_area && non_area<=v_array[1]){
                                    price_field = v.Field;  
                                }
                            }
                        })
                    } 

                    //////////////////// price_field => '3001_to_5000' 등 과 같은 테이블 필드 형식 ///////////
                    ////////////////////////////////////////////////////////////////////////////////////////
                                        
                    // Create a new instance of a Workbook class
                    var wb = new xl.Workbook({
                        jszip: {
                        compression: 'DEFLATE',
                        },
                        defaultFont: {
                        size: 11,
                        name: '맑은 고딕',
                        // name: 'Calibri',
                        color: '000000',
                        },
                        dateFormat: 'm/d/yy hh:mm:ss',
                        workbookView: {
                        activeTab: 0, // Specifies an unsignedInt that contains the index to the active sheet in this book view.
                        autoFilterDateGrouping: true, // Specifies a boolean value that indicates whether to group dates when presenting the user with filtering options in the user interface.
                        firstSheet: 0, // Specifies the index to the first sheet in this book view.
                        minimized: false, // Specifies a boolean value that indicates whether the workbook window is minimized.
                        showHorizontalScroll: true, // Specifies a boolean value that indicates whether to display the horizontal scroll bar in the user interface.
                        showSheetTabs: true, // Specifies a boolean value that indicates whether to display the sheet tabs in the user interface.
                        showVerticalScroll: true, // Specifies a boolean value that indicates whether to display the vertical scroll bar.
                        // tabRatio: 600, // Specifies ratio between the workbook tabs bar and the horizontal scroll bar.
                        visibility: 'visible', // Specifies visible state of the workbook window. ('hidden', 'veryHidden', 'visible') (§18.18.89)
                        // windowHeight: 30000, // Specifies the height of the workbook window. The unit of measurement for this value is twips.
                        // windowWidth: 10000, // Specifies the width of the workbook window. The unit of measurement for this value is twips..
                        // xWindow: 10000, // Specifies the X coordinate for the upper left corner of the workbook window. The unit of measurement for this value is twips.
                        // yWindow: 0, // Specifies the Y coordinate for the upper left corner of the workbook window. The unit of measurement for this value is twips.
                        },
                        logLevel: 0, // 0 - 5. 0 suppresses all logs, 1 shows errors only, 5 is for debugging
                        author: 'architecogroup', // Name for use in features such as comments
                    });

                    var options = {
                        margins: { // Accepts a Double in Inches __ 값이 높게 적용됨..
                        bottom: 0,
                        footer: 0,
                        header: 0,
                        left: 0,
                        right: 0,
                        top: 0
                    },
                        printOptions: {
                        centerHorizontal: true,
                        centerVertical: true
                        },
                        pageSetup: {
                        fitToHeight: 1, 
                        fitToWidth: 1,
                        // paperHeight: '297mm',
                        // paperWidth: '210mm'
                        paperSize: 'A4_PAPER'
                        }
                    };
                        
                    // Add Worksheets to the workbook
                    var ws = wb.addWorksheet('견적서', options);
                    var ws2 = wb.addWorksheet('Sheet 2');

                    ws.setPrintArea(1, 1, 46, 9);
                    ws.addPageBreak('row', 46);
                    ws.addPageBreak('column', 9);

                    // 스타일 정의
                    const sTitle = wb.createStyle({
                        alignment:{
                        horizontal: ['center'],
                        vertical: ['center']
                        },
                        font: {
                        color: '#FFFFFF',
                        size: 20,
                        bold: true
                        },
                        fill: {
                        type: 'pattern',
                        patternType: 'solid',
                        fgColor: '#50B1C8'
                        }
                    }
                    );

                    const sTitleSide = wb.createStyle({
                        alignment:{
                        horizontal: ['right'],
                        vertical: ['center']
                        },
                        font: {
                        color: '#FFFFFF',
                        size: 9
                        },
                        fill: {
                        type: 'pattern',
                        patternType: 'solid',
                        fgColor: '#50B1C8'
                        }
                    }
                    );

                    const sImportant = wb.createStyle({
                        alignment:{
                            horizontal: ['center'],
                            vertical: ['center']
                        },
                        font: {
                            size: 11,
                            bold: true
                        },
                        border:{
                            bottom:{
                                style: 'thin'
                            }
                        }
                        }
                    );


                    const sUnderbar = wb.createStyle({
                        alignment:{
                        horizontal: ['center'],
                        vertical: ['center']
                        },
                        font: {
                        size: 10,
                        bold: true
                        },
                        border:{
                        bottom:{
                            style: 'thin'
                        }
                        }
                    });

                    const sClient_name = wb.createStyle({
                        font: {
                            size: 10,
                            bold: true
                        }
                        }
                    );

                    const sDefault = wb.createStyle({
                        font:{
                        size:10
                        },
                        alignment:{
                        horizontal: ['left'],
                        vertical: ['center']
                        },
                        }
                    );

                    const sbackground = wb.createStyle({
                        fill:{
                        type: 'pattern', // Currently only 'pattern' is implemented. Non-implemented option is 'gradient'
                        patternType: 'solid', //§18.18.55 ST_PatternType (Pattern Type)
                        fgColor: '#FFFFFF'
                        }
                    });

                    for(let i=0; i < 46; i++){
                        for(let j=0; j < 9; j++){
                        ws.cell(i+1,j+1).style(sbackground);
                        }
                    }

                    const sTableheaderSide = wb.createStyle({
                        alignment:{
                        horizontal: ['center'],
                        vertical: ['center']
                        },
                        font:{
                        bold: true,
                        size: 9
                        },
                        border:{
                        top:{
                            style: 'medium'
                        },
                        bottom:{
                            style: 'double'
                        }
                        },
                        fill:{
                        type: 'pattern', // Currently only 'pattern' is implemented. Non-implemented option is 'gradient'
                        patternType: 'solid', //§18.18.55 ST_PatternType (Pattern Type)
                        fgColor: '#DAEEF3'
                        }
                    });

                    const sTableheaderCenter = wb.createStyle({
                        alignment:{
                        horizontal: ['center'],
                        vertical: ['center'],
                        wrapText: true
                        },
                        font:{
                        bold: true,
                        size: 9
                        },
                        border:{
                        top:{
                            style: 'medium'
                        },
                        bottom:{
                            style: 'double'
                        },
                        left:{
                            style: 'thin'
                        },
                        right:{
                            style: 'thin'
                        }
                        },
                        fill:{
                        type: 'pattern', // Currently only 'pattern' is implemented. Non-implemented option is 'gradient'
                        patternType: 'solid', //§18.18.55 ST_PatternType (Pattern Type)
                        fgColor: '#DAEEF3'
                        }
                    });

                    const sTabletitle = wb.createStyle({
                        alignment:{
                        // horizontal: ['center'],
                        vertical: ['center']
                        },
                        font:{
                        bold: true,
                        size: 9
                        },
                        border:{
                        top:{
                            style: 'double'
                        },
                        bottom:{
                            style: 'double'
                        }
                        },
                        fill:{
                        type: 'pattern',
                        patternType: 'solid',
                        fgColor: '#DAEEF3'
                        }
                    });

                    const sTablePrice = wb.createStyle({
                        alignment:{
                        horizontal: ['right'],
                        vertical: ['center']
                        },
                        font:{
                        bold: true,
                        size: 9
                        },
                        border:{
                        top:{
                            style: 'double'
                        },
                        bottom:{
                            style: 'double'
                        },
                        left:{
                            style: 'thin'
                        }
                        },
                        fill:{
                        type: 'pattern',
                        patternType: 'solid',
                        fgColor: '#DAEEF3'
                        },
                        numberFormat: '#,##0_ '
                    });

                    const sTableSub_1 = wb.createStyle({
                        alignment:{
                        horizontal: ['center'],
                        vertical: ['center']
                        },
                        font:{
                        bold: true,
                        size: 9
                        },
                        border:{
                        top:{
                            style: 'hair'
                        },
                        bottom:{
                            style: 'hair'
                        },
                        right:{
                            style: 'thin',
                            color: '#D9D9D9'
                        }
                        }
                    });

                    const sTableSub_2 = wb.createStyle({
                        alignment:{
                        vertical: ['center']
                        },
                        font:{
                        bold: true,
                        size: 9
                        },
                        border:{
                        top:{
                            style: 'hair'
                        },
                        bottom:{
                            style: 'hair'
                        }
                        }
                    });

                    const sTableSub_3 = wb.createStyle({
                        alignment:{
                        vertical: ['center']
                        },
                        font:{
                        size: 9
                        },
                        border:{
                        top:{
                            style: 'hair'
                        },
                        bottom:{
                            style: 'hair'
                        }
                        }
                    });

                    const sTalbedata_1 = wb.createStyle({
                        alignment:{
                        horizontal: ['right'],
                        vertical: ['center']
                        },
                        font:{
                        size: 9
                        },
                        border:{
                        top:{
                            style: 'hair'
                        },
                        bottom:{
                            style: 'hair'
                        },
                        left:{
                            style: 'thin'
                        }
                        },
                        numberFormat: '#,##0_ '
                    });

                    const sTalbedata_2 = wb.createStyle({
                        alignment:{
                        horizontal: ['right'],
                        vertical: ['center']
                        },
                        font:{
                        size: 9
                        },
                        border:{
                        top:{
                            style: 'hair'
                        },
                        bottom:{
                            style: 'hair'
                        },
                        left:{
                            style: 'thin'
                        }
                        },
                        fill:{
                        type: 'pattern',
                        patternType: 'solid',
                        fgColor: '#FAFFCF'
                        },
                        numberFormat: '#,##0_ '
                    });

                    const sTalbefooter_1 = wb.createStyle({
                        alignment:{
                        horizontal: ['center'],
                        vertical: ['center']
                        },
                        font:{
                        size: 10,
                        bold: true
                        },
                        border:{
                        top:{
                            style: 'double'
                        },
                        bottom:{
                            style: 'medium'
                        }
                        },
                        fill:{
                        type: 'pattern',
                        patternType: 'solid',
                        fgColor: '#DAEEF3'
                        },
                    });

                    const sTalbefooter_2 = wb.createStyle({
                        alignment:{
                        horizontal: ['right'],
                        vertical: ['center']
                        },
                        font:{
                        size: 9,
                        bold: true
                        },
                        border:{
                        top:{
                            style: 'double'
                        },
                        bottom:{
                            style: 'medium'
                        },
                        left:{
                            style: 'thin'
                        }
                        },
                        fill:{
                        type: 'pattern',
                        patternType: 'solid',
                        fgColor: '#DAEEF3'
                        },
                        numberFormat: '#,##0_ '
                    });

                    const sFooter_option = wb.createStyle({
                        alignment:{
                        horizontal: ['left'],
                        vertical: ['center'],
                        wrapText: true
                        },
                        border:{
                        top:{
                            style: 'thin'
                        },
                        bottom:{
                            style: 'thin'
                        }
                        }
                    }); 

                    const sFooter_sign = wb.createStyle({
                        alignment:{
                        horizontal: ['center'],
                        vertical: ['center']
                        }
                    }); 

                    const sFooter = wb.createStyle({
                        alignment:{
                        horizontal: ['center'],
                        vertical: ['center'],
                        wrapText: true
                        },
                        font:{
                        size: 7
                        },
                        fill:{
                        type: 'pattern',
                        patternType: 'solid',
                        fgColor: '#D9D9D9'
                        }
                    });      

                    let group_name= [
                        {
                        size: 7,
                        color: '#808080'
                        },
                        ' 스마트그린 플랫폼',
                        {
                        bold: true,
                        size: 8,
                        color: '#000000'
                        },
                        '  ㈜아키테코 그룹'
                    ];

                    let phonnumber= [
                        {
                        size: 8,
                        color: '#9BBB59'
                        },
                        'M. ',
                        {
                        size: 8,
                        color: '#000000'
                        },
                        `${writer_info[0].phone}`
                    ];

                    let email= [
                        {
                        size: 8,
                        color: '#9BBB59'
                        },
                        'E. ',
                        {
                        size: 8,
                        color: '#000000'
                        },
                        `${writer_info[0].email}`
                    ];

                    let fax= [
                        {
                        size: 8,
                        color: '#9BBB59'
                        },
                        'F. ',
                        {
                        size: 8,
                        color: '#000000'
                        },
                        `${writer_info[0].fax}`
                    ];

                    let footer_option_text= [
                        {
                        size: 9,
                        bold: true
                        },
                        '▣ 견적조건/특이사항',
                        {
                        size: 7,
                        bold: false
                        },
                        ` (견적일로부터 30일 유효)
                        1. 인증 평가 수수료는 발주처에서 인증기관으로 직접 납부하는 조건이며, 인증 규정 및 설계 개요에 따라 변경될 수 있음(참조용)
                        2. 에너지절약계획서 작성은 건축분야에 한함(기계, 전기 제외)
                        3. 녹색건축물 목표달성을 위해 '건축물전과정수행평가(LCA)'업무가 필요할 경우 당사에서 수행 가능함
                        (별도 견적으로 예비인증 500만원. VAT별도)
                        4. 인허가 변경,, 설계변경, 기타요인으로 인한 추가용역 발생시 80%의 추가용역비가 발생함(세움터 업로드 1회 이후에는 추가 용역 발생)
                        ※ 지불조건: 착수시 30%, 접수시 50%, 완료시 30% /계약시 협의`
                    ];

                    let footer_sign_text= [
                        {
                        size: 11,
                        bold: true
                        },
                        '                                          (주)아키테코 그룹',
                        {
                        size: 11,
                        bold: false
                        },
                        `       대표이사   ${writer_info[0].name}      (인)`
                    ];

                    const footer_text = ' ArchitecoGroup Co., Ltd. \n S-TRENUE 3002-ho, 37, Gukjegeumyung-ro 2-gil, Yeongdeungpo-gu, Seoul, Republic of Korea  / www.architeco.kr'

                    //
                    //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot','slantDashDot'
                    // 입력값 정리
                    const company = post.client_company;
                    const client_name = `의뢰인 : ${post.client_name} 대표님 (T: ${post.client_phone}  E: ${post.client_email} )`
                    const getDate = date.changeDate(post.date_info);

                    // const d = new Date();
                    // let serial = d.getFullYear() + ((d.getMonth() + 1) > 9 ? (d.getMonth() + 1).toString() : "0" + (d.getMonth() + 1)) + "-" + (d.getDate() > 9 ? d.getDate().toString() : "0" + d.getDate().toString());
                    let serial = date.changeSerial(post.date_info)


                    // 값 입력 & 셀 정리 ( 병합 등.. )
                    ws.cell(1,1, 2, 3, true).style(sTitle);
                    ws.cell(1,4, 2, 7, true).string('견 적 서').style(sTitle);
                    // ws.cell(1,8, 2, 9, true).string(`견적번호 : AG-${writer_info[0].nickname}-${serial}01`).style(sTitleSide);
                    ws.cell(5,1).style(sUnderbar);
                    ws.cell(4,2, 5, 4, true).string(company).style(sUnderbar);
                    ws.cell(4,5, 5, 5, true).string('貴 中').style(sImportant);
                    ws.cell(5,6).style(sUnderbar);

                    ws.cell(6, 8, 6, 9, true).string(group_name).style({alignment:{horizontal: ['right'],vertical: ['center']}});
                    ws.cell(7, 8, 7, 9, true).string(`대표이사 : ${writer_info[0].name}`).style({alignment:{horizontal: ['right'],vertical: ['center']},font:{size:8}});
                    ws.cell(8, 8, 8, 9, true).string(phonnumber).style({alignment:{horizontal: ['right'],vertical: ['center']}});
                    ws.cell(9, 8, 9, 9, true).string(email).style({alignment:{horizontal: ['right'],vertical: ['center']}});
                    ws.cell(10, 8, 10, 9, true).string(fax).style({alignment:{horizontal: ['right'],vertical: ['center']}});

                    ws.cell(7,1, 7, 7, true).string(client_name).style(sClient_name);
                    ws.cell(9,1, 9, 7, true).string('다음과 같이 견적을 제출하오니 검토후 연락 부탁드립니다.').style(sDefault);
                    ws.cell(11,1, 11, 7, true).string(getDate).style(sDefault);
                    ws.cell(13,1, 13, 7, true).string(`▣ 용  역  명 : ${post.mainservice_name}`).style(sDefault);
                    ws.cell(15,1, 15, 2, true).string('▣ 견적금액 :').style(sDefault);

                    ws.cell(15,4).string('원정').style(sDefault);
                    ws.cell(15,7).string('(VAT 및 수수료 별도)').style(sDefault);
                    ws.cell(17,1, 17, 7, true).string(`▣ 용도 및 규모 : ${post.useage}, 연면적 : ${post.floor_area}㎡ (대지면적 ${post.land_area}㎡)`).style(sDefault);
                    ws.cell(19,1, 19, 7, true).string(`▣ 위치 : ${post.position}`).style(sDefault);
                    ws.cell(21,1, 21, 6, true).string('용역세부학목').style(sTableheaderSide);
                    ws.cell(21, 7).string('인증원수수료(원)\n(별도)').style(sTableheaderCenter);
                    ws.cell(21, 8).string('용역비(원)').style(sTableheaderCenter);
                    ws.cell(21, 9).string('합계(원)').style(sTableheaderSide);  


                    let c_selecter = []
                    let c_and_item = []
                    let c_price = []

                    for(let i=0; i<service_info.length; i++){
                        if(c_selecter.includes(service_info[i].category_rank)===false){
                            c_selecter.push(service_info[i].category_rank);                    // 카테고리 식별자 체크
                            const ranks = service_info.filter((data)=>{                        // 카테고리 내 아이템 개수 확인 함수
                                return data.category_rank === service_info[i].category_rank;
                            })
                            c_and_item.push(['category',service_info[i],ranks.length])         // 배열 삽입 _ 카테고리
                            c_and_item.push(['item',service_info[i]])                          // 배열 삽입 _ 아이템
                            const link_number = service_info[i][link_name]
                            const service_price = price_info.filter(v => v.link === link_number)[0][price_field] *10000 * percentage  // 가격테이블에서 link_number로 연결된 행을 찾고, price_field로 해당열을 찾아 값 출력
                            c_price.push(service_price)
                            c_price.push(service_price)
                        }else{
                            c_and_item.push(['item',service_info[i]])                          // 배열 삽입 _ 아이템
                            const link_number = service_info[i][link_name]
                            const service_price = price_info.filter(v => v.link === link_number)[0][price_field] *10000 * percentage  // 가격테이블에서 link_number로 연결된 행을 찾고, price_field로 해당열을 찾아 값 출력
                            c_price.push(service_price)
                        }
                    }

                    let row_init = 22;
                    let row = 22;
                    let a = '=SUM('
                    let b = '=SUM('
                    let c = '=SUM('
                    for(let i=0; i<c_and_item.length; i++){
                        if(c_and_item[i][0]==='category'){ 
                        ws.cell(row, 1, row, 6, true).string(`▼ ${c_and_item[i][1].category}`).style(sTabletitle);
                        ws.cell(row, 7).formula(`=SUM(G${row+1}:G${row+c_and_item[i][2]*2})`).style(sTablePrice);
                        ws.cell(row, 8).formula(`=SUM(H${row+1}:H${row+c_and_item[i][2]*2})`).style(sTablePrice);
                        ws.cell(row, 9).formula(`=SUM(I${row+1}:I${row+c_and_item[i][2]*2})`).style(sTablePrice);
                        ws.row(row).setHeight(20.25);
                        a += `G${row},`;
                        b += `H${row},`;
                        c += `I${row},`;
                        row += 1;
                        }else if(c_and_item[i][0]==='item'){
                        ws.cell(row, 1, row, 2, true).string(`${c_and_item[i][1].period}`).style(sTableSub_1);
                        ws.cell(row+1, 1, row+1, 2, true).style(sTableSub_1);
                        ws.cell(row, 3, row, 6, true).string(` ${c_and_item[i][1].item}`).style(sTableSub_2);
                        ws.cell(row+1, 3, row+1, 6, true).string(` - ${c_and_item[i][1].detail}`).style(sTableSub_3);
                    

                        // console.log(price_info)
                        // console.log(price_field)
                        ws.cell(row, 7, row+1, 7, true).number(0).style(sTalbedata_1);
                        ws.cell(row, 8, row+1, 8, true).number(c_price[i]).style(sTalbedata_2);
                        
                        ws.cell(row, 9, row+1, 9, true).formula(`=SUM(G${row}:H${row})`).style(sTalbedata_1);
                        ws.row(row).setHeight(20.25);
                        ws.row(row+1).setHeight(20.25);
                        row += 2;
                        }
                    }           

                    a = a.slice(0, -1);
                    b = b.slice(0, -1);
                    c = c.slice(0, -1);
                    a += `)`;
                    b += `)`;
                    c += `)`;
                    ws.cell(row, 1, row, 6, true).string(`합 계`).style(sTalbefooter_1);
                    ws.cell(row, 7).formula(`${a}`).style(sTalbefooter_2);
                    ws.cell(row, 8).formula(`${b}`).style(sTalbefooter_2);
                    ws.cell(row, 9).formula(`${c}`).style(sTalbefooter_2);
                    ws.row(row).setHeight(20.25);
                    ws.cell(15,3).formula(`=I${row}`).style(sDefault).style({numberFormat: '[DBNum4]'});
                    ws.cell(15,5, 15,6, true).formula(`=I${row}`).style(sDefault).style({numberFormat: '"(￦ "#,###")"'});
                    row += 1;
                    ws.cell(row, 1, (43-row)+row, 9, true);



                    row = row - row_init;
                    const arr = Array.from({length: row}, () => 20.5); // 20.5로 이루어진 배열
                    // 시트 전체 행&열 사이즈 조절
                    let column_size = [4.25, 6.25, 12.25, 6, 5.75, 9.5, 13.5, 12, 12]
                    for(let i=0; i < column_size.length; i++){
                        ws.column(i+1).setWidth(column_size[i]+0.72); // 열의 경우 설정값의 0.62를 뺀 만큼 적용됨... 
                    }
                    let row_size = [16.5, 15, 25, 13.5, 13.5, 13.5, 13.5, 13.5, 13.5, 13.5, 13.5, 30, 16.5, 4.5, 17.25, 4.5, 18, 4.5, 18, 4.5, 35.25]
                    for(let i=0; i < row_size.length; i++){
                        ws.row(i+1).setHeight(row_size[i]);
                    }
                    // row_size.push(...arr)
                    // console.log(row_size.length);
                    
                    ws.cell(44, 1, 44, 9, true).string(footer_option_text).style(sFooter_option);
                    ws.cell(45, 1, 45, 9, true).string(footer_sign_text).style(sFooter_sign);
                    ws.cell(46, 1, 46, 9, true).string(footer_text).style(sFooter);

                    let last_row_size = [80, 45, 23.5]
                    for(let i=0; i < last_row_size.length; i++){
                        ws.row(i+44).setHeight(last_row_size[i]);
                    }

                    
                    
                    ws.addImage({
                        path: './public/images/logo.png',
                        type: 'picture',
                        position: {
                        type: 'twoCellAnchor',
                        from: {  // 이미지 좌측 상단
                            col: 7,
                            colOff: '2cm',
                            row: 4,
                            rowOff: 0,
                        },
                        to: {  // 이미지 우측 하단
                            col: 10,
                            colOff: 0,
                            row: 5,
                            rowOff: '0.3cm',
                        },
                        },
                    });

                    ws.addImage({
                        path: './public/images/sign_0.png',
                        type: 'picture',
                        position: {
                        type: 'twoCellAnchor',
                        from: {  // 이미지 좌측 상단
                            col: 9,
                            colOff: 0,
                            row: 45,
                            rowOff: 0,
                        },
                        to: {  // 이미지 우측 하단
                            col: 9,
                            colOff: '2cm',
                            row: 46,
                            rowOff: '0.42cm',
                        },
                        },
                    });

                    // 파일 저장 알고리즘
                    let folder_path = `\\\\10.0.0.1/03_sit/quotation/${writer_info[0].nickname}`;
                    let file_name = '';
                    let name = '';
                    let file_name2 = '';
                    
                    !fs.existsSync(folder_path)&&fs.mkdirSync(folder_path)                              // 닉네임 폴더 경로 확인 및 생성
                    fs.readdir(folder_path, (err, files) => {
                        const search = files.map(f =>{                                                  // 파일 중 날짜 정보 추출
                            return f.slice(5,14)
                        })
                        if(search.includes(serial))  {                                                  // 추출 정보에 입력 날짜 파일이 있는 경우
                            let file_data = files[files.length-1].split('.');                           // 파일이름 분리
                            file_data[2] = String(Number(file_data[0].slice(-2)) + 1).padStart(2,'0');  // 파일 이름 중 숫자 1개 증가하여 변환
                            file_data[0] = file_data[0].substring(0, file_data[0].length-2);            // 파일이름 중 숫자 제거
                            file_name = `${file_data[0] + file_data[2] + '.' + file_data[1]}`
                            name = `${file_data[0] + file_data[2]}`   
                            file_name2 = `${file_data[0] + file_data[2]}` 
                            console.log("파일이름 :", file_name2)                                                 
                        }else{                                                                          // 추출 정보에 입력 날짜 파일이 없는 경우
                            file_name = `AG-${writer_info[0].nickname}-${serial}01.xlsx`;
                            name = `${serial}01`
                            file_name2 = `AG-${writer_info[0].nickname}-${serial}01`
                            console.log("파일이름 :", file_name2)   
                        }
                        ws.cell(1,8, 2, 9, true).string(`견적번호 : ${name}`).style(sTitleSide);
                        wb.write(`${folder_path}/${file_name}`)

                        const path = require('path');
                        const fs = require('fs').promises;

                        const libre = require('libreoffice-convert');
                        libre.convertAsync = require('util').promisify(libre.convert);
                        setTimeout(function(){
                            async function main() {
                                const ext = '.pdf'
                                // console.log("파일이름 : ", file_name2)
                                const inputPath = path.join(`${folder_path}`, `${file_name2}.xlsx`);
                                const outputPath = path.join(`${folder_path}`, `${file_name2}${ext}`);
    
                                // Read file
                                const docxBuf = await fs.readFile(inputPath);
    
                                // // Convert it to pdf format with undefined filter (see Libreoffice docs about filter)
                                let pdfBuf = await libre.convertAsync(docxBuf, ext, undefined);
                                
                                // // Here in done you have pdf file which you can save or transfer in another stream
                                await fs.writeFile(outputPath, pdfBuf);
                            }
    
                            main().catch(function (err) {
                                console.log(`Error converting file: ${err}`);
                            });
                        },500)
                        
                    })
                });
            });
        });
    });
}