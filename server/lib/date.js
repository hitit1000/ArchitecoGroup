exports.getToday = () => {
    let today = new Date();   
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜
    let result = year + "년 " + month + "월 " + date + "일"
    return result;
}

exports.changeDate = (date_info) => {
    let today = new Date(date_info);
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜
    let result = year + "년 " + month + "월 " + date + "일"
    return result;
}

exports.changeSerial = (date_info) => {
    let date = new Date(date_info);   
    let result = date.getFullYear() 
    + ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1).toString() : "0" 
    + (date.getMonth() + 1)) + "-" + (date.getDate() > 9 ? date.getDate().toString() : "0" 
    + date.getDate().toString());
    return result;
}