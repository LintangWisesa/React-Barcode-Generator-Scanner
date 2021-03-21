import React, {useState} from 'react'
import {Fab, TextField, TextareaAutosize, Grid} from '@material-ui/core'
import {ArrowBack, GetApp} from '@material-ui/icons'
import { Link } from "react-router-dom";
// var Barcode = require('react-barcode');
import { useBarcode } from '@createnextapp/react-barcode'

function BarcodeGenerator() {
    const [barcode, setBarcode] = useState('lintangwisesa');
    const handleChange = (event) => {
        setBarcode(event.target.value ? event.target.value : '');
    };
    const { inputRef } = useBarcode({
        value: barcode,
        options: {
          background: '#ffffff',
        }
    });
    const downloadBarcode = () => {
        const canvas = document.getElementById("mybarcode");
        const pngUrl = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "mybarcode.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
      <div>
            <Link to="/">
            <Fab style={{marginRight:10}} color="secondary">
                <ArrowBack/>
            </Fab>
            </Link>
            <span>Barcode Generator</span>
            
            <div style={{marginTop:30, marginBottom:30}}>
                <TextField onChange={handleChange} style={{width:320}}
                value={barcode} label="Barcode content" size="large" variant="outlined" color="secondary" 
                />
            </div>

            <div>
                {
                    barcode !== ''
                    ?
                    // <Barcode 
                    //     id="mybarcode" value={barcode} background='#ffffff'
                    //     lineColor='red'
                    //     width="2"
                    //     height="100"
                    //     format="CODE128"
                    //     displayValue='true'
                    //     font='monospace'
                    //     textAlign='center'
                    //     textPosition='bottom'
                    //     textMargin='5'
                    //     fontSize='12'
                    //     margin='10'
                    //     marginTop='10'
                    //     marginBottom='10'
                    //     marginLeft='10'
                    //     marginRight='10'
                    // />
                    <canvas id="mybarcode" ref={inputRef} />
                    :
                    <p>No barcode preview</p>
                }
            </div>
            <div>
                {
                    barcode ? 
                    <Grid container style={{marginTop:30}}>
                        <Grid item xs={10}>
                        <TextareaAutosize
                            style={{fontSize:18, width:250, height:100}}
                            rowsMax={4}
                            defaultValue={barcode}
                            value={barcode}
                        />
                        </Grid>
                        <Grid item xs={2}>
                        <Fab onClick={downloadBarcode} style={{marginLeft:10}} color="secondary">
                            <GetApp/>
                        </Fab>
                        </Grid>
                    </Grid> :
                    ''
                }
            </div>
      </div>
    );
  }
  
  export default BarcodeGenerator;
  