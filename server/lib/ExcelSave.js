const path = require('path');
const fs_ = require('fs').promises;
const fs = require('fs');
const libre = require('libreoffice-convert');
const exStyle = require('./ExcelStyle');
const date = require('./date');

exports.save = (wb, ws, post, writer_info) => {
    const serial = date.changeSerial(post.date_info)
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
        ws.cell(1,8, 1, 9, true).string(`견적번호 : ${file_name2}`).style(exStyle.sTitleSide(wb));
        wb.write(`${folder_path}/${file_name}`)

        libre.convertAsync = require('util').promisify(libre.convert);
        setTimeout(function(){
            async function main() {
                const ext = '.pdf'
                // console.log("파일이름 : ", file_name2)
                const inputPath = path.join(`${folder_path}`, `${file_name2}.xlsx`);
                const outputPath = path.join(`${folder_path}`, `${file_name2}${ext}`);

                // Read file
                const docxBuf = await fs_.readFile(inputPath);

                // // Convert it to pdf format with undefined filter (see Libreoffice docs about filter)
                let pdfBuf = await libre.convertAsync(docxBuf, ext, undefined);
                
                // // Here in done you have pdf file which you can save or transfer in another stream
                await fs_.writeFile(outputPath, pdfBuf);
            }

            main().catch(function (err) {
                console.log(`Error converting file: ${err}`);
            });
        },500)
    });
}