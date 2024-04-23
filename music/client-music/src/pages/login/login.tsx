import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

import './login.css';
import User from '../../types/user.login';
import loginProvider from '../../apis/service.api.ts/service.api';

export default function Login() {
    const [ user, setUser ] = useState<User>({ username: "", password: "" });
    const [ loggedStatus, setLoggedStatus ] = useState<string | null>(null);
    const [ loggedIn, setLoggedIn ] = useState<boolean>(false);
    const navigate = useNavigate();

    const isDesktopOrLaptop = useMediaQuery(
        { minDeviceWidth: 1224 },
        { deviceWidth: 1600 }
    );

    const changeUserDetails = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [ name ]: value });
    };

    const login = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!user.username || !user.password) {
            setLoggedStatus("Username and Password both required");

        } else {
            try {
                const response = await loginProvider.loginUser(user);
                if (response.status === 200) {
                    sessionStorage.setItem("token", (response.data.accessToken));
                    loginProvider.setToken();
                    navigate('/home');
                    setUser({ username: "", password: "" });
                }

            } catch (error) {
                setLoggedStatus("Invalid user credintial");
            }

        };

    };

    return (
        <div >
            { isDesktopOrLaptop && (
                <div className="bg-img">
                    <div className="content">
                        <header>Please sign in</header>
                        <form >
                            <div className="field">
                                <span className="fa fa-user"></span>
                                <label htmlFor="text" className="form-label"></label>
                                <input type="text"
                                    placeholder="Username"
                                    id="username"
                                    name="username"
                                    value={ user.username }
                                    onChange={ changeUserDetails } />
                            </div>
                            <div className="field space">
                                <span className="fa fa-lock"></span>
                                <label htmlFor="password" className="sr-only"></label>
                                <input type="password"
                                    placeholder="Password"
                                    id='password'
                                    className="pass-key"
                                    name="password"
                                    value={ user.password }
                                    onChange={ changeUserDetails } />

                            </div>
                            <div className="pass">
                                <span style={ { color: "red" } }> { loggedStatus } </span>
                            </div>
                            <button type="button" className="btn btn-primary btn-lg"
                                onClick={ login }>Login</button>
                        </form>
                    </div>
                </div>
            ) }


        </div>
    );
}








