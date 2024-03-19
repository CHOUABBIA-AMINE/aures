
import '@react-pdf-viewer/core/lib/styles/index.css';

// Import styles of default layout plugin
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import {useState}               from 'react'

// Import Worker
import { Worker }               from '@react-pdf-viewer/core';
// Import the main Viewer component
import { Viewer }               from '@react-pdf-viewer/core';
import { Box }                  from '@mui/material';
// default layout plugin
import { defaultLayoutPlugin }  from '@react-pdf-viewer/default-layout';

const PDFViewer = (params : {url : string}) => {

  // creating new plugin instance
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    return (
        <Box sx={{display : "flex", width : '800px', height : '80%', top: "50%", left: "50%", transform : 'translate(-50%, -50%)', position: 'absolute'}}>
            { params.url&&(
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                        <Viewer fileUrl={params.url} plugins={[defaultLayoutPluginInstance]}></Viewer>
                </Worker>
            )}
        </Box>
    );
}
export { PDFViewer};
