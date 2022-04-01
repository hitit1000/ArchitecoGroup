import React from 'react';
import { Grid, InputLabel, TextField} from '@mui/material';

const SectionClient = ({get}) => {
    const handleChange = (event) => {
        get(event.target.id, event.target.value);
    };
    return (
        <>
            <h2>2. 고객</h2>
            <Grid style={{padding:'1rem', borderTop:"2px solid #eaedf0", borderBottom:"2px solid #eaedf0", backgroundColor:"#f6f9fc"}}>
                <Grid container direction="row" justifyContent="flex-start" alignItems="center" rowSpacing={1} columns={100} >
                    <Grid item xs={20} sm={15} md={15} lg={15} style={{textAlign:"center"}}> {/*~600 ~900 ~1200 ~1546*/}
                        <InputLabel id="demo-simple-select-label">이름</InputLabel>
                    </Grid>
                    <Grid item xs={5} sm={2} md={2} lg={2} style={{textAlign:"center"}}></Grid>
                    <Grid item xs={70} sm={30} md={30} lg={20}> {/*~600 ~900 ~1200 ~1546*/}
                        <TextField id="client" label="이름" variant="outlined" fullWidth size="small" onChange={handleChange} required/>
                    </Grid>
                    <Grid item xs={5} sm={3} md={3} lg={3} style={{textAlign:"center"}}></Grid>


                    <Grid item xs={20} sm={15} md={15} lg={15} style={{textAlign:"center"}}> {/*~600 ~900 ~1200 ~1546*/}
                        <InputLabel id="demo-simple-select-label">회사명</InputLabel>
                    </Grid>
                    <Grid item xs={5} sm={2} md={2} lg={2} style={{textAlign:"center"}}></Grid>
                    <Grid item xs={70} sm={30} md={30} lg={30}> {/*~600 ~900 ~1200 ~1546*/}
                        <TextField id="company" label="회사명" variant="outlined" fullWidth size="small" onChange={handleChange} required/>
                    </Grid>
                    <Grid item xs={5} sm={3} md={3} lg={3} style={{textAlign:"center"}}></Grid>
                </Grid>
                <br/>
                <Grid container direction="row" justifyContent="flex-start" alignItems="center" rowSpacing={1} columns={100} >
                    <Grid item xs={20} sm={15} md={15} lg={15} style={{textAlign:"center"}}> {/*~600 ~900 ~1200 ~1546*/}
                        <InputLabel id="demo-simple-select-label">번호</InputLabel>
                    </Grid>
                    <Grid item xs={5} sm={2} md={2} lg={2} style={{textAlign:"center"}}></Grid>
                    <Grid item xs={70} sm={30} md={30} lg={20}> {/*~600 ~900 ~1200 ~1546*/}
                        <TextField id="number" label="번호" variant="outlined" fullWidth size="small" onChange={handleChange} required/>
                    </Grid>
                    <Grid item xs={5} sm={3} md={3} lg={3} style={{textAlign:"center"}}></Grid>


                    <Grid item xs={20} sm={15} md={15} lg={15} style={{textAlign:"center"}}> {/*~600 ~900 ~1200 ~1546*/}
                        <InputLabel id="demo-simple-select-label">이메일</InputLabel>
                    </Grid>
                    <Grid item xs={5} sm={2} md={2} lg={2} style={{textAlign:"center"}}></Grid>
                    <Grid item xs={70} sm={30} md={30} lg={30}> {/*~600 ~900 ~1200 ~1546*/}
                        <TextField id="mail" label="이메일" variant="outlined" fullWidth size="small" onChange={handleChange} required/>
                    </Grid>
                    <Grid item xs={5} sm={3} md={3} lg={3} style={{textAlign:"center"}}></Grid>
                </Grid>
            </Grid>
            
        </>
    )
}

export default SectionClient;