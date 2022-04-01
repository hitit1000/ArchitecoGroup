const ex = require("./ExcelModule");
const exStyle = require("./ExcelStyle");
const exInput = require("./ExcelInput");
const exSave = require("./ExcelSave");
var xl = require("excel4node");
let db = require("./db");
const fs = require("fs");

exports.action = function (post) {
  db.query(
    `SELECT * FROM writer WHERE ID=${post.writer}`,
    function (error, writer_info) {
      if (error) {
        throw error;
      }
      const link_name =
        post.dwelling === "주거" ? "link_dwelling" : "link_nondwelling"; //주거-저가 : 주거-중가
      let item_text = "";
      item_array = post.service_array;
      if (item_array.length !== 0) {
        for (let i = 0; i < item_array.length; i++) {
          if (i === 0) {
            item_text += `${link_name}=${item_array[i].link}`;
          } else {
            item_text += ` or ${link_name}=${item_array[i].link}`;
          }
        }
      } else {
        item_text = 0;
      }
      db.query(
        `SELECT * FROM service WHERE ${item_text}`,
        function (error, service_info) {
          if (error) {
            throw error;
          }
          // console.log(service_info)
          let c_selecter = [];
          let c_and_item = [];
          let c_price = [];
          for (let i = 0; i < service_info.length; i++) {
            if (c_selecter.includes(service_info[i].category_rank) === false) {
              c_selecter.push(service_info[i].category_rank); // 카테고리 식별자 체크
              const ranks = service_info.filter((data) => {
                // 카테고리 내 아이템 개수 확인 함수
                return data.category_rank === service_info[i].category_rank;
              });
              c_and_item.push(["category", service_info[i], ranks.length]); // 배열 삽입 _ 카테고리
              c_and_item.push(["item", service_info[i]]); // 배열 삽입 _ 아이템
              c_price.push(
                Number(
                  post.service_array.filter((v) => {
                    return v.link === service_info[i][link_name];
                  })[0].total
                )
              ); // 용역비 삽입
              c_price.push(
                Number(
                  post.service_array.filter((v) => {
                    return v.link === service_info[i][link_name];
                  })[0].total
                )
              ); // 용역비 삽입
            } else {
              c_and_item.push(["item", service_info[i]]); // 배열 삽입 _ 아이템
              c_price.push(
                Number(
                  post.service_array.filter((v) => {
                    return v.link === service_info[i][link_name];
                  })[0].total
                )
              ); // 용역비 삽입
            }
          }

          console.log(post);
          // Create a new instance of a Workbook class
          let wb = ex.CreatWb();
          // Add Worksheets to the workbook

          var ws = wb.addWorksheet("견적서", ex.Option1());
          var ws2 = wb.addWorksheet("Sheet 2");

          ws.setPrintArea(1, 1, 41, 9);
          ws.addPageBreak("row", 41);
          ws.addPageBreak("column", 9);
          ex.default(wb, ws);

          // 값 입력 & 셀 정리 ( 병합 등.. )
          ws.cell(1, 1, 1, 3, true).style(exStyle.sTitle(wb));
          ws.cell(1, 4, 1, 7, true)
            .string("견 적 서")
            .style(exStyle.sTitle(wb));
          ws.cell(3, 1).style(exStyle.sUnderbar(wb));
          ws.cell(3, 2, 3, 4, true)
            .string(exInput.company(post.client_company))
            .style(exStyle.sUnderbar(wb));
          ws.cell(3, 5).string("貴 中").style(exStyle.sImportant(wb));
          ws.cell(3, 6).style(exStyle.sUnderbar(wb));

          ws.cell(4, 8, 4, 9, true)
            .string(exInput.group_name())
            .style({
              alignment: { horizontal: ["right"], vertical: ["center"] },
            });
          ws.cell(5, 8, 5, 9, true)
            .string(`대표이사 : ${writer_info[0].name}`)
            .style({
              alignment: { horizontal: ["right"], vertical: ["center"] },
              font: { size: 8 },
            });
          ws.cell(6, 8, 6, 9, true)
            .string(exInput.phonnumber(writer_info))
            .style({
              alignment: { horizontal: ["right"], vertical: ["center"] },
            });
          ws.cell(7, 8, 7, 9, true)
            .string(exInput.email(writer_info))
            .style({
              alignment: { horizontal: ["right"], vertical: ["center"] },
            });
          ws.cell(8, 8, 8, 9, true)
            .string(exInput.fax(writer_info))
            .style({
              alignment: { horizontal: ["right"], vertical: ["center"] },
            });

          ws.cell(5, 1, 5, 7, true)
            .string(exInput.client_name(post))
            .style(exStyle.sClient_name(wb));
          ws.cell(7, 1, 7, 7, true)
            .string("다음과 같이 견적을 제출하오니 검토후 연락 부탁드립니다.")
            .style(exStyle.sDefault(wb));
          ws.cell(9, 1, 9, 7, true)
            .string(exInput.getDate(post))
            .style(exStyle.sDefault(wb));
          ws.cell(11, 1, 11, 9, true)
            .string(`▣ 용  역  명 : ${post.mainservice_name}`)
            .style(exStyle.sDefault(wb));
          ws.cell(12, 1, 12, 2, true)
            .string("▣ 견적금액 :")
            .style(exStyle.sDefault(wb));

          ws.cell(12, 4).string("원정").style(exStyle.sDefault(wb));
          ws.cell(12, 7)
            .string("(VAT 및 수수료 별도)")
            .style(exStyle.sDefault(wb));
          ws.cell(13, 1, 13, 9, true)
            .string(`▣ 용도 : ${post.useage}`)
            .style(exStyle.sDefault(wb));
          ws.cell(14, 1, 14, 9, true)
            .string(`▣ 규모 : ${exInput.size(post)}`)
            .style(exStyle.sDefault(wb)); //`▣ 규모 : 연면적 : ${post.floor_area}㎡ (대지면적 ${post.land_area}㎡)`
          ws.cell(15, 1, 15, 9, true)
            .string(`▣ 위치 : ${post.position}`)
            .style(exStyle.sDefault(wb));
          ws.cell(16, 1, 16, 9, true)
            .string(`▣ 일정 : ${exInput.dates(post)}`)
            .style(exStyle.sDefault(wb));

          ws.cell(17, 1, 17, 6, true)
            .string("용역세부학목")
            .style(exStyle.sTableheaderSide(wb));
          ws.cell(17, 7)
            .string("인증원수수료(원)\n(별도)")
            .style(exStyle.sTableheaderCenter(wb));
          ws.cell(17, 8)
            .string("용역비(원)")
            .style(exStyle.sTableheaderCenter(wb));
          ws.cell(17, 9).string("합계(원)").style(exStyle.sTableheaderSide(wb));

          let row_init = 17;
          let row = 18;
          let a = "=SUM(";
          let b = "=SUM(";
          let c = "=SUM(";
          for (let i = 0; i < c_and_item.length; i++) {
            if (c_and_item[i][0] === "category") {
              ws.cell(row, 1, row, 6, true)
                .string(`▼ ${c_and_item[i][1].category}`)
                .style(exStyle.sTabletitle(wb));
              ws.cell(row, 7)
                .formula(`=SUM(G${row + 1}:G${row + c_and_item[i][2] * 2})`)
                .style(exStyle.sTablePrice(wb));
              ws.cell(row, 8)
                .formula(`=SUM(H${row + 1}:H${row + c_and_item[i][2] * 2})`)
                .style(exStyle.sTablePrice(wb));
              ws.cell(row, 9)
                .formula(`=SUM(I${row + 1}:I${row + c_and_item[i][2] * 2})`)
                .style(exStyle.sTablePrice(wb));

              a += `G${row},`;
              b += `H${row},`;
              c += `I${row},`;
              row += 1;
            } else if (c_and_item[i][0] === "item") {
              ws.cell(row, 1, row, 2, true)
                .string(`${c_and_item[i][1].period}`)
                .style(exStyle.sTableSub_1(wb));
              ws.cell(row + 1, 1, row + 1, 2, true).style(
                exStyle.sTableSub_1(wb)
              );
              ws.cell(row, 3, row, 6, true)
                .string(` ${c_and_item[i][1].item}`)
                .style(exStyle.sTableSub_2(wb));
              ws.cell(row + 1, 3, row + 1, 6, true)
                .string(` - ${c_and_item[i][1].detail}`)
                .style(exStyle.sTableSub_3(wb));

              ws.cell(row, 7, row + 1, 7, true)
                .number(0)
                .style(exStyle.sTalbedata_1(wb));
              ws.cell(row, 8, row + 1, 8, true)
                .number(c_price[i])
                .style(exStyle.sTalbedata_2(wb));
              ws.cell(row, 9, row + 1, 9, true)
                .formula(`=SUM(G${row}:H${row})`)
                .style(exStyle.sTalbedata_1(wb));
              row += 2;
            }
          }

          a = a.slice(0, -1);
          b = b.slice(0, -1);
          c = c.slice(0, -1);
          a += `)`;
          b += `)`;
          c += `)`;
          ws.cell(row, 1, row, 6, true)
            .string(`합 계`)
            .style(exStyle.sTalbefooter_1(wb));
          ws.cell(row, 7).formula(`${a}`).style(exStyle.sTalbefooter_2(wb));
          ws.cell(row, 8).formula(`${b}`).style(exStyle.sTalbefooter_2(wb));
          ws.cell(row, 9).formula(`${c}`).style(exStyle.sTalbefooter_2(wb));
          ws.cell(12, 3)
            .formula(`=I${row}`)
            .style(exStyle.sDefault(wb))
            .style({ numberFormat: "[DBNum4]" });
          ws.cell(12, 5, 12, 6, true)
            .formula(`=I${row}`)
            .style(exStyle.sDefault(wb))
            .style({ numberFormat: '"(￦ "#,###")"' });
          row += 1;
          ws.cell(row, 1, 38 - row + row, 9, true);

          // row = row - row_init;

          // 시트 전체 행&열 사이즈 조절
          let column_size = [4.25, 6.25, 12.25, 6, 5.75, 9.5, 13.5, 12, 12];
          for (let i = 0; i < column_size.length; i++) {
            ws.column(i + 1).setWidth(column_size[i] + 0.72); // 열의 경우 설정값의 0.62를 뺀 만큼 적용됨...
          }
          let row_size = [
            30, 15, 25, 13.5, 13.5, 13.5, 13.5, 13.5, 13.5, 13.5, 18, 18, 18,
            18, 18, 18, 35, 20.5, 20.5, 20.5, 20.5, 20.5, 20.5, 20.5, 20.5,
            20.5, 20.5, 20.5, 20.5, 20.5, 20.5, 20.5, 20.5, 20.5, 20.5, 20.5,
            20.5,
          ];
          for (let i = 0; i < row_size.length; i++) {
            ws.row(i + 1).setHeight(row_size[i]);
          }

          ws.cell(39, 1, 39, 9, true)
            .string(exInput.footer_option_text())
            .style(exStyle.sFooter_option(wb));
          ws.cell(40, 1, 40, 9, true)
            .string(exInput.footer_sign_text(writer_info))
            .style(exStyle.sFooter_sign(wb));
          ws.cell(41, 1, 41, 9, true)
            .string(exInput.footer_text())
            .style(exStyle.sFooter(wb));

          let last_row_size = [80, 45, 23.5];
          for (let i = 0; i < last_row_size.length; i++) {
            ws.row(i + 39).setHeight(last_row_size[i]);
          }

          ex.insertImage(ws, post, writer_info, "logo");
          ex.insertImage(ws, post, writer_info, "sign");

          exSave.save(wb, ws, post, writer_info);
        }
      );
    }
  );
};
