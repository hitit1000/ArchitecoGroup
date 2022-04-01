//§18.18.3 ST_BorderStyle (Border Line Styles) 
//['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot','slantDashDot'
        

exports.sTitle = (wb) => {
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
    });
    return sTitle;
}

exports.sTitleSide = (wb) => {
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
    });
    return sTitleSide;
}

exports.sImportant = (wb) => {
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
    });
    return sImportant;
}

exports.sUnderbar = (wb) => {
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
    return sUnderbar;
}

exports.sClient_name = (wb) => {
    const sClient_name = wb.createStyle({
        font: {
            size: 10,
            bold: true
        }
    });
    return sClient_name;
}



exports.sDefault = (wb) => {
    const sDefault = wb.createStyle({
        font:{
            size:10
        },
        alignment:{
            horizontal: ['left'],
            vertical: ['center']
        },
    });
    return sDefault;
}

exports.sbackground = (wb) => {
    const sbackground = wb.createStyle({
        fill:{
        type: 'pattern', // Currently only 'pattern' is implemented. Non-implemented option is 'gradient'
        patternType: 'solid', //§18.18.55 ST_PatternType (Pattern Type)
        fgColor: '#FFFFFF'
        }
    });
    return sbackground;
}

exports.sTableheaderSide = (wb) => {
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
    return sTableheaderSide
}


exports.sTableheaderCenter = (wb) => {
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
    return sTableheaderCenter
}


exports.sTabletitle = (wb) => {
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
    return sTabletitle;
}


exports.sTablePrice = (wb) => {
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
    return sTablePrice;
}

exports.sTableSub_1 = (wb) => {
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
    return sTableSub_1;
}

exports.sTableSub_2 = (wb) => {
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
    return sTableSub_2;
}

exports.sTableSub_3 = (wb) => {
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
    return sTableSub_3;
}

exports.sTalbedata_1 = (wb) => {
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
    return sTalbedata_1;
}

exports.sTalbedata_2 = (wb) => {
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
    return sTalbedata_2;
}


exports.sTalbefooter_1 = (wb) => {
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
    return sTalbefooter_1;
}

exports.sTalbefooter_2 = (wb) => {
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
    return sTalbefooter_2;
}

exports.sFooter_option = (wb) => {
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
    return sFooter_option;
}


exports.sFooter_sign = (wb) => {
    const sFooter_sign = wb.createStyle({
        alignment:{
        horizontal: ['center'],
        vertical: ['center']
        }
    }); 
    return sFooter_sign;
}


exports.sFooter = (wb) => {
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
    return sFooter;
}