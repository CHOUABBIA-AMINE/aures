
import '@react-pdf-viewer/core/lib/styles/index.css';

// Import styles of default layout plugin
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import { Worker }               from '@react-pdf-viewer/core';
import { Viewer }               from '@react-pdf-viewer/core';
import { Box }                  from '@mui/material';
import { defaultLayoutPlugin }  from '@react-pdf-viewer/default-layout';

const PDFViewer = (params : {url : string}) => {

  // creating new plugin instance
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    return (
        <Box sx={{display : "flex", width : '700px', height : '95%', top: "50%", left: "50%", transform : 'translate(-50%, -50%)', position: 'absolute'}}>
            { params.url&&(
                <Worker workerUrl="/pdf.worker.min.js">
                        <Viewer fileUrl={params.url} plugins={[defaultLayoutPluginInstance]}></Viewer>
                </Worker>
            )}
        </Box>
    );
}
export { PDFViewer};