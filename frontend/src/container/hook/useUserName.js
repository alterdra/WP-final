import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

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
    const [showModal, setShowModal] = useState(false);

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
    }
    const handleRegister = async () => {
        const { data: { msg } } = await instance.post('/signup', { user, password });
        alert(msg);
        setShowModal(false);
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
			handleLogin,
			handleLogout,
            handleRegister,
            signedIn,
            showModal,
            setShowModal,
          }}
          {...props}
        />
    );
};
const useUserName = () => useContext(UserContext);
export { UserProvider, useUserName }