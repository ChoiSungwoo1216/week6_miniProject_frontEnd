import axios from "axios";

export const login = async (email, password)=>{
    const {data} = await axios.post("url",
    {
        email,
        password,
    }, { withCredentials: true});

    if (data?.accessToken) {
        localStorage.setItem("user",JSON.stringify(data));
    }

    return data;
}

export const logout = () => {
    localStorage.removeItem("user");
}

export const register = (user_nick, email, password) => {
    return axios.post("url",
    {
        user_nick,
        email,
        password,
    },
    {withCredentials: true}
    );
};

export const getCurrentUser =() => {
    return JSON.parse(localStorage.getItem("user"));
};