let db = require('./lib/db');

const post={
  dwelling: "비주거",
  price: "저가", // or 중가
  floor_area: 5555
}


const db_table_name = post.dwelling === "주거" ? 
post.price === "저가" ? "dwelling_low_price":"dwelling_middle_price" //주거-저가 : 주거-중가
: post.price === "저가" ? "nondwelling_low_price":"nondwelling_middle_price" //비주거-저가 : 비주거-중가


// // ** 가격 테이블에서 조건 검색하여 열 추출 ((((면적을 입력하면 해당 범위를 찾아줌))))
// db.query(`show columns from ${db_table_name}`, function (error, price_info) {
//   if (error) {
//     throw error;
//   }
//   let price_field;
//   price_info.map((v, index) => {
//     if(v.Field.includes('_or_less')){             // 3000 이하
//       if(post.floor_area <= Number(v.Field.replace('_or_less',""))){
//         price_field = index;
//       }
//     }else if(v.Field.includes('_or_more')){       // 100001 이상
//       if(post.floor_area >= Number(v.Field.replace('_or_more',""))){
//         price_field = index;
//       }
//     }else if(v.Field.includes('_to_')){           // 이외 특정값 이상 ~ 특정값 이하
//       const v_array = v.Field.split('_to_');
//       if(v_array[0]<=post.floor_area && post.floor_area<=v_array[1]){
//         price_field = index;
//       }
//     }
//   })
//   console.log(price_field)
// })






db.query(`show columns from ${db_table_name}`, function (error, price_info) {
  if (error) {
    throw error;
  }
////////////////////////////////////////////////////////////////////////////////////////
//////////////////// 면적,세대수,타입등의 조건에 따른 필드 선택 ///////////////////////////
  let price_field;
  if (post.dwelling === "주거"){

  }else if (post.dwelling === "비주거"){
    price_info.map((v, index) => {
      if(v.Field.includes('_or_less')){             // 3000 이하
        if(post.floor_area <= Number(v.Field.replace('_or_less',""))){
          price_field = v.Field;
        }
      }else if(v.Field.includes('_or_more')){       // 100001 이상
        if(post.floor_area >= Number(v.Field.replace('_or_more',""))){
          price_field = v.Field;
        }
      }else if(v.Field.includes('_to_')){           // 이외 특정값 이상 ~ 특정값 이하
        const v_array = v.Field.split('_to_');
        if(v_array[0]<=post.floor_area && post.floor_area<=v_array[1]){
          price_field = v.Field;
        }
      }
    })
  } 
  console.log(price_field)
  console.log(db_table_name)
//////////////////// price_field => '3001_to_5000' 등 과 같은 테이블 필드 형식 ///////////
////////////////////////////////////////////////////////////////////////////////////////

  let item_array=[1,3,8]
  let item_text='';
  for(let i=0; i < item_array.length; i++){
    if(i===0){
    item_text += `id=${item_array[i]}`
    }else{
    item_text += ` or id=${item_array[i]}`
    }
  }

  db.query(`SELECT * FROM quotation.service where ${item_text} order by category_rank`, function (error, service_info) {
    if (error) {
        throw error;
    }
    let c_selecter = []
    let c_and_item = []
    for(let i=0; i<service_info.length; i++){
      
      if(c_selecter.includes(service_info[i].category_rank)===false){
          c_selecter.push(service_info[i].category_rank);                    // 카테고리 식별자 체크
          const ranks = service_info.filter((data)=>{                        // 카테고리 내 아이템 개수 확인 함수
              return data.category_rank === service_info[i].category_rank;
          })
          c_and_item.push(['category',service_info[i],ranks.length])         // 배열 삽입 _ 카테고리
          c_and_item.push(['item',service_info[i]])                          // 배열 삽입 _ 아이템
      }else{
          c_and_item.push(['item',service_info[i]])                          // 배열 삽입 _ 아이템
      }
    }
    for(let i=0; i<c_and_item.length; i++){
      if(c_and_item[i][0]==='category'){ 
      }else if(c_and_item[i][0]==='item'){
        console.log(`select ${price_field} from ${db_table_name} where link="${c_and_item[i][1].link_nondwelling}"`)
        db.query(`select ${price_field} from ${db_table_name} where link="${c_and_item[i][1].link_nondwelling}"`, function (error, price_info) {
          if (error) {
              throw error;
          }
          console.log(price_info[0][price_field]*1)        
        })
        
  

        
      }
    }
  })



})

  