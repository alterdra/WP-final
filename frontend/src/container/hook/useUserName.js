import { createContext, useContext, useState } from "react";
const UserContext = createContext({
    user: "",
    password: "",
    setUser: () => {},
    setPassword: () => {},
});

const UserProvider = (props) => {
    const [user, setUser] = useState("Benny");
    const [password, setPassword] = useState("");
    return (
        <UserContext.Provider
          value={{
            user,
            password,
            setUser,
            setPassword,
          }}
          {...props}
        />
    );
};
const useUserName = () => useContext(UserContext);
export { UserProvider, useUserName }