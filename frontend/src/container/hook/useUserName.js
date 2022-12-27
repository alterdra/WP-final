import { createContext, useContext, useState } from "react";

const LOCALSTORAGE_KEY = "save-me";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
const UserContext = createContext({
    user: "",
    password: "",
    setUser: () => {},
    setPassword: () => {},
});

const UserProvider = (props) => {
    const [user, setUser] = useState(savedMe || "");
    const [password, setPassword] = useState("");
    const [signedIn, setSignedIn] = useState(false);

    const handleLogin = async () => {
        const { data: { msg } } = await instance.get('/login', {param: { name: user, password}});
        alert(msg);
        if(msg === 'Login Successfully')
        	setSignedIn(true);
    }
    const handleLogout = () => {
        setUser("");
        setPassword("");
        setSignedIn(false);
    }

    useEffect(() => {
        if(signedIn){
            localStorage.setItem(LOCALSTORAGE_KEY, me);
        }
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
          }}
          {...props}
        />
    );
};
const useUserName = () => useContext(UserContext);
export { UserProvider, useUserName }