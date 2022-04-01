let db = require('./lib/db');

const post={
    dwelling: "주거", // 주거 or 비주거
    price: "저가", // 저가 or 중가 or 고가 or 특별
    floor_area: 5555,

    residential: false,
    nonResidentia: false,
    complex: false,
    apartment: false,

    residentialHouseHold: 450,
    residentialType: 5,
    nonResidentialHouseHold: 450,
    nonResidentialType: 5,
    complexHouseHold: 450,
    complexType: 5,
    apartmentHouseHold: 450,
    apartmentType: 5,
}

const db_table_name = post.dwelling === "주거" ? 
post.price === "저가" ? "dwelling_low_price":"dwelling_middle_price" //주거-저가 : 주거-중가
: post.price === "저가" ? "nondwelling_low_price":"nondwelling_middle_price" //비주거-저가 : 비주거-중가

const link_name = post.dwelling === "주거" ? 'link_dwelling' : 'link_nondwelling'

db.query(`SELECT * FROM service;`, function (error, service_info) { // service 테이블
    if(error){
        throw error;
    }
    let link_ids = '';
    for(let i=0; i<service_info.length; i++){
        if(i===0){
            link_ids += 'link=' + service_info[i][link_name]
        }else{
            link_ids += ' or link=' + service_info[i][link_name]
        }
    }
    // step1. service 테이블에서 선택링크(주거/비주거)를 추출
    
      
    db.query(`show columns from ${db_table_name}`, function (error, price_column) {
        if (error) {
            throw error;
        }
        // step2. price 테이블의 열헤더 중 현재 type 의 [해당 열] 추출 ( 2_or_less(type)/3_to_5(type)/6_to_8(type)/9_or_more(type) 중 택1 )
        let price_field = null;
        let type_data = post.residentialType;
        price_column.map((v, index) => {
            if(v.Field.includes('_or_less(type)')){             // 3000 이하
                if(type_data <= Number(v.Field.replace('_or_less(type)',""))){
                    price_field = '\`'+v.Field6+'\`';
                }
            }else if(v.Field.includes('_or_more(type)')){       // 100001 이상
                if(type_data >= Number(v.Field.replace('_or_more(type)',""))){
                    price_field = '\`'+v.Field+'\`';
                }
            }else if(v.Field.includes('_to_')){           // 이외 특정값 이상 ~ 특정값 이하
                const v_array = v.Field.replace('(type)',"").split('_to_');
                if(v_array[0]<=type_data && type_data<=v_array[1]){
                    price_field = '\`'+v.Field+'\`';
                }
            }
        })
        // step3. price 테이블에서 선택링크(주거/비주거) + [해당열] 추출 
        db.query(`select id,item,link,household,${price_field} from ${db_table_name} where ${link_ids}`, function (error, price_info) {
            if (error) {
                throw error;
            }
            // step4. price 테이블(선택링크 + type[해당열])에서 세대수(household)로 필터하여 각 아이템 별 한 행 추출 # [최종행] 추출
            let house_data = post.residentialHouseHold;
            let filter_price = price_info.filter(v => (house_data <= Number(v.household.replace('_or_less',"")) || (house_data >= Number(v.household.replace('_or_more',""))) || (v.household.split('_to_')[0]<=house_data && house_data<=v.household.split('_to_')[1] )))
            console.log(filter_price)
        })
    })
})


