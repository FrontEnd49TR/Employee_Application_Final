import { authActions } from "../../redux/authSlice";
import { useDispatch } from 'react-redux'
export const Logout: React.FC = () => {
    const dispatch = useDispatch();
    return <button onClick={() => dispatch(authActions.logout())}>Logout</button>
}
