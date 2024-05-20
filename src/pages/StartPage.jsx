import {Navigate} from 'react-router-dom';
import {useAuth} from "../conntexts/UserContext";

const  StartPage = () => {

    const {user}  = useAuth();
    if (!user) {
        return <Navigate to={'login'} replace = {true}/>;
    }
    else {
        return <Navigate to={'/loan-opening'} replace = {true}/>;
    }

};


export default StartPage;