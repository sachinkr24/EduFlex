
import EduFlexLogo from '../images/EduFlexLogo.png';
import { useNavigate } from 'react-router-dom';


function Logo(){
    const navigate = useNavigate();
    return <div>
       <img src={EduFlexLogo} style={{ height : '80px'}} onClick={
            () => {
                navigate('/');
            }
       }/> 
    </div>
}

export default Logo;