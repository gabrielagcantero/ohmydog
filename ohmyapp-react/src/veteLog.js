import { useState } from 'react';
import Log from './log';

function VeteLog(){
    const [veteLog, setVeteLog] = useState(true);
    if (Log())
        return(veteLog);
    else
        return false;
}

export default VeteLog;