import { useState } from 'react';
import { Grid, Select, MenuItem, InputLabel, FormControl} from '@mui/material';

const SectionWriter = ({list, get}) => { 
    const [value, setValue] = useState('');
    const nameList = list.map((v, index)=>(<MenuItem key={index} value={v.id}>{v.name}</MenuItem>))

    const handleChange = (event) => {
        setValue(event.target.value);
        get("writer", event.target.value);
    };
    return (
        <>
            <h2>1. 작성자</h2>
            <Grid container direction="row" justifyContent="flex-start" alignItems="center" columns={100} style={{padding:'1rem', borderTop:"2px solid #eaedf0", borderBottom:"2px solid #eaedf0", backgroundColor:"#f6f9fc"}}>
                <Grid item xs={20} sm={15} md={15} lg={15} style={{textAlign:"center"}}> {/*~600 ~900 ~1200 ~1546*/}
                    <InputLabel id="demo-simple-select-label">작성자</InputLabel>
                </Grid>
                <Grid item xs={5} sm={2} md={2} lg={2}></Grid>
                <Grid item xs={70} sm={30} md={30} lg={20}> {/*~600 ~900 ~1200 ~1546*/}
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">작성자</InputLabel>
                        <Select value={value} onChange={handleChange} label="작성자" required>
                            {nameList}
                        </Select>
                    </FormControl>
                </Grid>
                
            </Grid>
        </>
    )
}

export default SectionWriter;