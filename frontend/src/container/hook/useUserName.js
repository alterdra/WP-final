import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { WindowSharp } from "@mui/icons-material";

const LOCALSTORAGE_KEY_ME = "save-me";
const LOCALSTORAGE_KEY_SIGNEDIN = "save-login";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY_ME);
const saveSignedIn = localStorage.getItem(LOCALSTORAGE_KEY_SIGNEDIN);

const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})

const UserContext = createContext({
    user: "",
    password: "",
    signedIn: false,
    setUser: () => {},
    setPassword: () => {},
});

const UserProvider = (props) => {
    const [user, setUser] = useState(savedMe || "");
    const [password, setPassword] = useState("");
    const [signedIn, setSignedIn] = useState(JSON.parse(saveSignedIn) || false);
    // For register
    const [showModal, setShowModal] = useState(false);
    const [newUser, setNewUser] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const handleLogin = async () => {
        const { data: { msg } } = await instance.get('/login', { params: { user, password } });
        alert(msg);
        if(msg === 'Login Successfully')
        	setSignedIn(true);
    }
    const handleLogout = () => {
        // setUser("");
        setPassword("");
        setSignedIn(false);
		window.location.href = '/';
    }
    const handleRegister = async () => {
        // console.log(newUser)
        const { data: { msg } } = await instance.post('/signup', { user: newUser, password: newPassword });
        alert(msg);
        setShowModal(false);
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
          }}
          {...props}
        />
    );
};
const useUserName = () => useContext(UserContext);
export { UserProvider, useUserName }