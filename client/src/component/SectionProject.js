import {useEffect, useState} from 'react';
import { Grid, Select, MenuItem, InputLabel, FormControl, TextField, FormControlLabel, Checkbox, FormLabel, RadioGroup, Radio} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';


const SectionProject = ({list, get}) => {
    useEffect(()=>{
        const date = new Date();
        get('currentDate', date);
        get('price', price);
    }, []);

    const [service, setService] = useState('');
    const [useage, setUseage] = useState('');
    const [value, setValue] = useState('');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentDisable, setCurrentDisable] = useState(false);
    const [step1Date, setStep1Date] = useState(new Date());
    const [step1Disable, setStep1Disable] = useState(true);
    const [step2Date, setStep2Date] = useState(new Date());
    const [step2Disable, setStep2Disable] = useState(true);
    const [step3Date, setStep3Date] = useState(new Date());
    const [step3Disable, setStep3Disable] = useState(true);
    const [price, setPrice] = useState('저가');
    const [residentialHouseHold, setResidentialHouseHold] = useState('');
    const [residentialType, setResidentialType] = useState('');
    const [residentialDisable, setResidentialDisable] = useState(true);
    const [floorArea, setFloorArea] = useState('');
    const [landArea, setLandArea] = useState('');
    const [nonResidentialDisable, setNonResidentialDisable] = useState(true);
    const [complexHouseHold, setComplexHouseHold] = useState('');
    const [complexType, setComplexType] = useState('');
    const [complexDisable, setComplexDisable] = useState(true);
    const [apartmentHouseHold, setApartmentHouseHold] = useState('');
    const [apartmentType, setApartmentType] = useState('');
    const [apartmentDisable, setApartmentDisable] = useState(true);

    
    const municipalityList = list.map((v, index)=>(<MenuItem name="municipality" key={index} value={index}>{v}</MenuItem>))

    const handleChange = (event) => { // checkbox 및 날짜를 제외한 값 업데이트
        if(event.target.name === 'municipality'){
            setValue(event.target.value);
        }else if(event.target.name === 'price'){
            setPrice(event.target.value);
        }else if(event.target.name === 'residentialHouseHold'){
            setResidentialHouseHold(event.target.value);
        }else if(event.target.name === 'residentialType'){
            setResidentialType(event.target.value);
        }else if(event.target.name === 'floorArea'){
            setFloorArea(event.target.value);
        }else if(event.target.name === 'landArea'){
            setLandArea(event.target.value);
        }else if(event.target.name === 'complexHouseHold'){
            setComplexHouseHold(event.target.value);
        }else if(event.target.name === 'complexType'){
            setComplexType(event.target.value);
        }else if(event.target.name === 'apartmentHouseHold'){
            setApartmentHouseHold(event.target.value);
        }else if(event.target.name === 'apartmentType'){
            setApartmentType(event.target.value);
        }else if(event.target.name === 'service'){
            setService(event.target.value);
        }else if(event.target.name === 'useage'){
            setUseage(event.target.value);
        }
        get(event.target.name, event.target.value);
    };

    const handleCheck = (event) => { // checkbox 선택에 따른 값 업데이트
        if(event.target.name === 'checkCurrent'){
            setCurrentDisable(!currentDisable);
            if(event.target.checked){
                get('currentDate',currentDate)
            }else get('currentDate','')
        }else if(event.target.name === 'checkStep1'){
            setStep1Disable(!step1Disable);
            if(event.target.checked){            
                get('step1Date',step1Date)
            }else get('step1Date','')
        }else if(event.target.name === 'checkStep2'){
            setStep2Disable(!step2Disable);
            if(event.target.checked){            
                get('step2Date',step2Date)
            }else get('step2Date','')
        }else if(event.target.name === 'checkStep3'){
            setStep3Disable(!step3Disable);
            if(event.target.checked){           
                get('step3Date',step3Date)
            }else get('step3Date','')
        }else if(event.target.name === 'checkResidential'){
            setResidentialDisable(!residentialDisable);
            get('residential',residentialDisable)
            if(event.target.checked){
                get('residentialType',residentialType)
                get('residentialHouseHold',residentialHouseHold)
            }else{
                get('residentialType',0)
                get('residentialHouseHold',0)
            }
        }else if(event.target.name === 'checkNonResidential'){
            setNonResidentialDisable(!nonResidentialDisable);
            get('nonResidential',nonResidentialDisable)
            if(event.target.checked){
                get('landArea',landArea)
                get('floorArea',floorArea)
            }else{
                get('landArea',0)
                get('floorArea',0)
            }
        }else if(event.target.name === 'checkComplex'){
            setComplexDisable(!complexDisable);
            get('complex',complexDisable)
            if(event.target.checked){
                get('complexType',complexType)
                get('complexHouseHold',complexHouseHold)
            }else{
                get('complexType',0)
                get('complexHouseHold',0)
            }
        }else if(event.target.name === 'checkApartment'){
            setApartmentDisable(!apartmentDisable);
            get('apartment',apartmentDisable)
            if(event.target.checked){
                get('apartmentType',apartmentType)
                get('apartmentHouseHold',apartmentHouseHold)
            }else{
                get('apartmentType',0)
                get('apartmentHouseHold',0)
            }
        }
    }

    // 날짜 선택에 따른 값 업데이트
    const handleDateToday = (event) => { 
        setCurrentDate(event);
        get('currentDate', event);
    }
    const handleDateStep1 = (event) => { 
        setStep1Date(event);
        get('step1Date', event);
    }
    const handleDateStep2 = (event) => { 
        setStep2Date(event);
        get('step2Date', event);
    }
    const handleDateStep3 = (event) => { 
        setStep3Date(event);
        get('step3Date', event);
    }

    return (
        <>
            <h2>3. 프로젝트</h2>
            <Grid style={{padding:'1rem', borderTop:"2px solid #eaedf0", borderBottom:"2px solid #eaedf0", backgroundColor:"#f6f9fc"}}>
                <Grid container direction="row" justifyContent="flex-start" alignItems="center" rowSpacing={1} columns={100} >
                    <Grid item xs={20} sm={15} md={15} lg={15} style={{textAlign:"center"}}> {/*~600 ~900 ~1200 ~1546*/}
                        <InputLabel id="demo-simple-select-label">용도</InputLabel>
                    </Grid>
                    <Grid item xs={5} sm={2} md={2} lg={2}></Grid>
                    <Grid item xs={70} sm={30} md={30} lg={20}> {/*~600 ~900 ~1200 ~1546*/}
                        <TextField name="useage" label="용도" variant="outlined" fullWidth size="small" onChange={handleChange} required/>
                    </Grid>
                    <Grid item xs={5} sm={3} md={3} lg={3}></Grid>
                    <Grid item xs={20} sm={15} md={15} lg={15} style={{textAlign:"center"}}> {/*~600 ~900 ~1200 ~1546*/}
                        <InputLabel id="demo-simple-select-label">용역명</InputLabel>
                    </Grid>
                    <Grid item xs={5} sm={2} md={2} lg={2}></Grid>
                    <Grid item xs={70} sm={30} md={30} lg={30}> {/*~600 ~900 ~1200 ~1546*/}
                        <TextField name="service" label="용역명" variant="outlined" fullWidth size="small" onChange={handleChange} required/>
                    </Grid>
                    <Grid item xs={5} sm={3} md={3} lg={3}></Grid>
                </Grid>
                <br/>
                <Grid container direction="row" justifyContent="flex-start" alignItems="center" rowSpacing={1} columns={100} >
                    <Grid item xs={20} sm={15} md={15} lg={15} style={{textAlign:"center"}}> {/*~600 ~900 ~1200 ~1546*/}
                        <InputLabel id="demo-simple-select-label">지역(구)</InputLabel>
                    </Grid>
                    <Grid item xs={5} sm={2} md={2} lg={2}></Grid>
                    <Grid item xs={70} sm={30} md={30} lg={20}> {/*~600 ~900 ~1200 ~1546*/}
                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-simple-select-label">지역(구)</InputLabel>
                            <Select name="municipality" value={value} onChange={handleChange} label="작성자" required>
                                {municipalityList}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={5} sm={3} md={3} lg={3}></Grid>

                    <Grid item xs={20} sm={15} md={15} lg={15} style={{textAlign:"center"}}> {/*~600 ~900 ~1200 ~1546*/}
                        <InputLabel id="demo-simple-select-label">상세위치</InputLabel>
                    </Grid>
                    <Grid item xs={5} sm={2} md={2} lg={2} ></Grid>
                    <Grid item xs={70} sm={30} md={30} lg={30}> {/*~600 ~900 ~1200 ~1546*/}
                        <TextField name="position" label="상세위치" variant="outlined" fullWidth size="small" onChange={handleChange} required/>
                    </Grid>
                    <Grid item xs={5} sm={3} md={3} lg={3}></Grid>
                </Grid>

                <br/>

                <Grid container direction="row" justifyContent="flex-start" alignItems="center" rowSpacing={1} columns={100} >
                    <Grid item xs={25} sm={17} md={17} lg={5}></Grid>
                    <Grid container direction="column" justifyContent="flex-start" alignItems="left" item xs={70} sm={50} md={30} lg={20}>
                        <FormControlLabel control={<Checkbox defaultChecked name="checkCurrent" onChange={handleCheck}/>} label="작성일" />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                disabled={currentDisable}
                                label="작성일"
                                name="currentDate"
                                inputFormat={"yyyy년 MM월 dd일"}
                                mask={"____년 __월 __일"}
                                value={currentDate}
                                onChange={handleDateToday}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={5} sm={33} md={10} lg={1}></Grid>
                    <Grid item xs={25} sm={17} md={10} lg={2}></Grid>
                    <Grid container direction="column" justifyContent="flex-start" alignItems="left" item xs={70} sm={50} md={30} lg={20}>
                        <FormControlLabel control={<Checkbox name="checkStep1" onChange={handleCheck}/>} label="인허가 또는 사업승인" />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                disabled={step1Disable}
                                label="인허가 또는 사업승인"
                                name="step1Date"
                                inputFormat={"yyyy년 MM월 dd일"}
                                mask={"____년 __월 __일"}
                                value={step1Date}
                                onChange={handleDateStep1}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={5} sm={33} md={3} lg={1}></Grid>
                    <Grid item xs={25} sm={17} md={17} lg={2}></Grid>
                    <Grid container direction="column" justifyContent="flex-start" alignItems="left" item xs={70} sm={50} md={30} lg={20}>
                        <FormControlLabel control={<Checkbox name="checkStep2" onChange={handleCheck}/>} label="준공" />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                disabled={step2Disable}
                                label="준공"
                                name="step2Date"
                                inputFormat={"yyyy년 MM월 dd일"}
                                mask={"____년 __월 __일"}
                                value={step2Date}
                                onChange={handleDateStep2}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={5} sm={33} md={10} lg={1}></Grid>
                    <Grid item xs={25} sm={17} md={10} lg={2}></Grid>
                    <Grid container direction="column" justifyContent="flex-start" alignItems="left" item xs={70} sm={50} md={30} lg={20}>
                        <FormControlLabel control={<Checkbox name="checkStep3" onChange={handleCheck}/>} label="제출일" />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                disabled={step3Disable}
                                label="제출일"
                                name="step3Date"
                                inputFormat={"yyyy년 MM월 dd일"}
                                mask={"____년 __월 __일"}
                                value={step3Date}
                                onChange={handleDateStep3}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
                <br/>
                <Grid container direction="row" justifyContent="center" alignItems="center" rowSpacing={1} columns={100} >
                    <Grid item xs={0} sm={0} md={0} lg={0}>
                        <FormControl>
                            <FormLabel>가격</FormLabel>
                            <RadioGroup
                                row
                                defaultValue="저가"
                                name="row-radio-buttons-group"
                                onChange={handleChange}
                            >
                                <FormControlLabel name="price" value="저가" control={<Radio size="small"/>} label="저가" />
                                <FormControlLabel name="price" value="중가" control={<Radio size="small"/>} label="중가" />
                                <FormControlLabel name="price" value="고가" control={<Radio size="small"/>} label="고가" />
                                <FormControlLabel name="price" value="특별" control={<Radio size="small"/>} label="특별" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
                <br/>

                <Grid container direction="row" justifyContent="flex-start" alignItems="center" rowSpacing={1} columns={100} >
                    <Grid item xs={25} sm={17} md={25} lg={30}></Grid>
                    <Grid container direction="column" justifyContent="flex-start" alignItems="left" item xs={75} sm={25} md={10} lg={10}>
                        <FormControlLabel control={<Checkbox name="checkResidential" onChange={handleCheck}/>} label="주거" />
                    </Grid>
                    <Grid item xs={25} sm={5} md={1} lg={1}></Grid>
                    <Grid container direction="column" justifyContent="flex-start" alignItems="left" item xs={75} sm={53} md={12} lg={10}>
                        <FormControlLabel control={<Checkbox name="checkNonResidential" onChange={handleCheck}/>} label="비주거" />
                    </Grid>
                    <Grid item xs={25} sm={17} md={1} lg={1}></Grid>
                    <Grid container direction="column" justifyContent="flex-start" alignItems="left" item xs={75} sm={25} md={14} lg={10}>
                        <FormControlLabel control={<Checkbox name="checkComplex" onChange={handleCheck}/>} label="주상복합" />
                    </Grid>
                    <Grid item xs={25} sm={5} md={1} lg={1}></Grid>
                    <Grid container direction="column" justifyContent="flex-start" alignItems="left" item xs={70} sm={25} md={14} lg={10}>
                        <FormControlLabel control={<Checkbox name="checkApartment" onChange={handleCheck}/>} label="공동주택" />
                    </Grid>
                    <Grid item xs={5} sm={28} md={22} lg={27}></Grid>
                </Grid>

                <br/>
                {residentialDisable? null :
                    <div>
                        <Grid container direction="row" justifyContent="flex-start" alignItems="center" rowSpacing={2} columns={100} >
                            <Grid item xs={25} sm={17} md={17} lg={5}></Grid>
                            <Grid container direction="column" justifyContent="flex-start" alignItems="left" item xs={70} sm={50} md={30} lg={20}>
                                <TextField  name="residentialHouseHold" label="주거_세대수" variant="outlined" fullWidth size="small" onChange={handleChange} value={residentialHouseHold} required/>
                            </Grid>
                            <Grid item xs={5} sm={17} md={1} lg={1}></Grid>
                            <Grid item xs={25} sm={17} md={19} lg={2}></Grid>
                            <Grid container direction="column" justifyContent="flex-start" alignItems="left" item xs={70} sm={50} md={30} lg={20}>
                                <TextField name="residentialType" label="주거_type수" variant="outlined" fullWidth size="small" onChange={handleChange} value={residentialType} required/>
                            </Grid>
                        </Grid>
                        <br/>
                    </div>
                }
                {nonResidentialDisable? null :
                    <div>
                        <Grid container direction="row" justifyContent="flex-start" alignItems="center" rowSpacing={2} columns={100} >
                            <Grid item xs={25} sm={17} md={17} lg={5}></Grid>
                            <Grid container direction="column" justifyContent="flex-start" alignItems="left" item xs={70} sm={50} md={30} lg={20}>
                                <TextField name="floorArea" label="비주거_연면적" variant="outlined" fullWidth size="small" onChange={handleChange} value={floorArea} required/>
                            </Grid>
                            <Grid item xs={5} sm={17} md={1} lg={1}></Grid>
                            <Grid item xs={25} sm={17} md={19} lg={2}></Grid>
                            <Grid container direction="column" justifyContent="flex-start" alignItems="left" item xs={70} sm={50} md={30} lg={20}>
                                <TextField name="landArea" label="비주거_대지면적" variant="outlined" fullWidth size="small" onChange={handleChange} value={landArea} required/>
                            </Grid>
                        </Grid>
                        <br/>
                    </div>
                }
                {complexDisable? null :
                    <div>
                        <Grid container direction="row" justifyContent="flex-start" alignItems="center" rowSpacing={2} columns={100} >
                            <Grid item xs={25} sm={17} md={17} lg={5}></Grid>
                            <Grid container direction="column" justifyContent="flex-start" alignItems="left" item xs={70} sm={50} md={30} lg={20}>
                                <TextField name="complexHouseHold" label="주상복합_세대수" variant="outlined" fullWidth size="small" onChange={handleChange} value={complexHouseHold} required/>
                            </Grid>
                            <Grid item xs={5} sm={17} md={1} lg={1}></Grid>
                            <Grid item xs={25} sm={17} md={19} lg={2}></Grid>
                            <Grid container direction="column" justifyContent="flex-start" alignItems="left" item xs={70} sm={50} md={30} lg={20}>
                                <TextField name="complexType" label="주상복합_type수" variant="outlined" fullWidth size="small" onChange={handleChange} value={complexType} required/>
                            </Grid>
                        </Grid>
                        <br/>
                    </div>
                }
                {apartmentDisable? null :
                    <div>
                        <Grid container direction="row" justifyContent="flex-start" alignItems="center" rowSpacing={2} columns={100} >
                            <Grid item xs={25} sm={17} md={17} lg={5}></Grid>
                            <Grid container direction="column" justifyContent="flex-start" alignItems="left" item xs={70} sm={50} md={30} lg={20}>
                                <TextField name="apartmentHouseHold" label="공동주택_세대수" variant="outlined" fullWidth size="small" onChange={handleChange} value={apartmentHouseHold} required/>
                            </Grid>
                            <Grid item xs={5} sm={17} md={1} lg={1}></Grid>
                            <Grid item xs={25} sm={17} md={19} lg={2}></Grid>
                            <Grid container direction="column" justifyContent="flex-start" alignItems="left" item xs={70} sm={50} md={30} lg={20}>
                                <TextField name="apartmentType" label="공동주택_type수" variant="outlined" fullWidth size="small" onChange={handleChange} value={apartmentType} required/>
                            </Grid>
                        </Grid>
                        <br/>
                    </div>
                }

        


            </Grid>
        </>
    )
}

export default SectionProject;