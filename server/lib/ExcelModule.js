var xl = require('excel4node');
const exStyle = require('./ExcelStyle');

exports.CreatWb = () => {
    const wb = new xl.Workbook({
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
    return wb;
}

exports.Option1 = () => {
    const options = {
        margins: { // Accepts a Double in Inches __ 값이 높게 적용됨..
            bottom: 0.4,
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
        },
    };
    return options;
}


exports.default = (wb, ws) => {
    for(let i=0; i < 46; i++){
        for(let j=0; j < 9; j++){
        ws.cell(i+1,j+1).style(exStyle.sbackground(wb));
        }
    }
    return ;
}



exports.insertImage = (ws, post, writer_info, name) => {  
    if(name == 'logo'){        
        ws.addImage({
            path: './public/images/logo.png',
            type: 'picture',
            position: {
            type: 'twoCellAnchor',
            from: {  // 이미지 좌측 상단
                col: 7,
                colOff: '2cm',
                row: 3,
                rowOff: 0,
            },
            to: {  // 이미지 우측 하단
                col: 10,
                colOff: 0,
                row: 4,
                rowOff: 0,
            },
            },
        });
    }else if(name == 'sign'){
        const nick = writer_info[0].nickname
        ws.addImage({
            path: `./public/images/sign_${nick}.png`,
            type: 'picture',
            position: {
            type: 'twoCellAnchor',
            from: {  // 이미지 좌측 상단
                col: 9,
                colOff: 0,
                row: 40,
                rowOff: 0,
            },
            to: {  // 이미지 우측 하단
                col: 9,
                colOff: '2cm',
                row: 41,
                rowOff: '0.42cm',
            },
            },
        });
    }
}

