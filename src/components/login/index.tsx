"use client";

import React, { useContext, useState } from "react";
import styles from "./login.module.scss";
import axios from "axios";
import { AuthContext } from "@/app/store/global";
import { useRouter } from "next/navigation";

const LoginComponent: React.FC = () => {
  const router = useRouter();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { handleUpdateToken } = useContext(AuthContext);

  const handleLoginSubmit = async () => {
    try {
      await axios
        .post(`http://localhost:3000/api/auth/login`, {
          email: loginData.email,
          password: loginData.password,
        })
        .then((res) => {
          handleUpdateToken(res.data.token);
          localStorage.setItem("authToken", res.data.token);
          router.push("/dashboard");
        });
    } catch (e) {
      alert("Error in Logging in");
      console.log("login error message", e);
      throw e;
    }
  };

  return (
    <div className={styles.login}>
      <h1>Login to your component</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLoginSubmit();
          e.stopPropagation();
        }}
        className={styles.form}
      >
        <div className={styles.form_textField}>
          <label>Email</label>
          <input
            value={loginData.email}
            name="email"
            type="text"
            onChange={(e) => {
              setLoginData((prev) => ({
                ...prev,
                email: e.target.value,
              }));
            }}
          />
        </div>

        <div className={styles.form_textField}>
          <label>Password</label>
          <input
            value={loginData.password}
            name="password"
            type="text"
            onChange={(e) => {
              setLoginData((prev) => ({ ...prev, password: e.target.value }));
            }}
          />
        </div>
        <div>
          <button className={styles.loginButton} type="submit">
            Login
          </button>
        </div>
      </form>{" "}
    </div>
  );
};

export default LoginComponent;
