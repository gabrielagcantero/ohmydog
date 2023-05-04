
import VeteLog from '../veteLog';

function VeteLink(){
    if (VeteLog())
        return (
            <li className="nav-item">
                <a className="nav-link link text-info text-primary display-4" href="index.html#features1-y">Veterinario</a>
            </li>
        )
}

export default VeteLink;