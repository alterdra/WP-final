import { createContext, useContext, useState, useEffect } from "react";
import { useAlert } from 'react-alert';
import instance from '../../api';

const LOCALSTORAGE_KEY_ME = "save-me";
const LOCALSTORAGE_KEY_SIGNEDIN = "save-login";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY_ME);
const saveSignedIn = localStorage.getItem(LOCALSTORAGE_KEY_SIGNEDIN);

const UserContext = createContext({
    user: "",
    password: "",
    signedIn: false,
    setUser: () => {},
    setPassword: () => {},
});

const UserProvider = (props) => {
    const [focusElement, setFocusElement] = useState("");
    const [user, setUser] = useState(savedMe || "");
    const [password, setPassword] = useState("");
    const [signedIn, setSignedIn] = useState(JSON.parse(saveSignedIn) || false);
    // For register
    const [showModal, setShowModal] = useState(false);
    const [newUser, setNewUser] = useState("");
    const [newPassword, setNewPassword] = useState("");
	const alert = useAlert();
    const handleLogin = async () => {
        const { data: { msg } } = await instance.get('/login', { params: { user, password } });
        if(msg === 'Login Successfully'){
			alert.show(<div style={{ padding: '5px' }}>登入成功</div>);
			setSignedIn(true);
		}
		else{
			alert.error(<div style={{ padding: '5px' }}>帳號/密碼錯誤</div>);
		}
    }
    const handleLogout = () => {
        setPassword("");
        setSignedIn(false);
		window.location.href = '/';
    }
    const handleRegister = async () => {
        const { data: { msg } } = await instance.post('/signup', { user: newUser, password: newPassword });
		if(msg === "Sign up succeeded"){
			alert.show(<div style={{ padding: '5px' }}>註冊成功</div>);
			setShowModal(false);
		}
        else
			alert.error(<div style={{ padding: '5px' }}>此帳號已被使用</div>);
        
    }
    const handleOpen = () => {
        setShowModal(true);
        setNewUser("");
        setNewPassword("");
    }

    useEffect(() => {
        if(signedIn)
            localStorage.setItem(LOCALSTORAGE_KEY_ME, user);
        localStorage.setItem(LOCALSTORAGE_KEY_SIGNEDIN, signedIn);
        console.log(saveSignedIn, signedIn)
    }, [signedIn]);
    
    return (
        <UserContext.Provider
          value={{
            user,
            password,
            setUser,
            setPassword,
			handleLogin, handleLogout,
            handleRegister,
            signedIn,
            showModal, setShowModal,
            handleOpen,
            newUser, setNewUser,
            newPassword, setNewPassword,
            focusElement, setFocusElement,
          }}
          {...props}
        />
    );
};
const useUserName = () => useContext(UserContext);
export { UserProvider, useUserName }