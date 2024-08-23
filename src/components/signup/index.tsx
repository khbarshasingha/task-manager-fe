"use client";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styles from "./signup.module.scss";
import { AuthContext, UseAuthContext } from "@/app/store/global";
import { sign } from "crypto";
// import AuthUseContext from "../../store/loginContext";

const SignupComponent: React.FC = () => {
  const [signupData, setsignupData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [passwordError, setPasswordError] = useState({
    isError: false,
    message: "",
  });

  const { token, handleUpdateToken } = useContext(AuthContext);

  const handleSubmit = async () => {
    if (!passwordError.isError) {
      await axios
        .post(`http://localhost:3000/api/auth/signup`, {
          username: signupData.username,
          password: signupData.password,
          email: signupData.email,
        })
        .then((res) => {
          console.log("response checking", res.data);
        });
    }
  };

  useEffect(() => {
    console.log("token from store", token);
  }, []);

  return (
    <div className={styles.login}>
      <h1>Login to your component</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();

          e.stopPropagation();
        }}
        className={styles.form}
      >
        <div className={styles.form_textField}>
          <label>Username </label>
          <input
            value={signupData.username}
            name="username"
            type="text"
            onChange={(e) => {
              setsignupData((prev) => ({
                ...prev,
                username: e.target.value,
              }));
            }}
          />
        </div>

        <div className={styles.form_textField}>
          <label>Email </label>
          <input
            value={signupData.email}
            name="email"
            type="text"
            onChange={(e) => {
              setsignupData((prev) => ({
                ...prev,
                email: e.target.value,
              }));
            }}
          />
        </div>

        <div className={styles.form_textField}>
          <label>Password</label>
          <input
            value={signupData.password}
            name="password"
            type="text"
            onChange={(e) => {
              setsignupData((prev) => ({ ...prev, password: e.target.value }));
            }}
          />
        </div>

        <div className={styles.form_textField}>
          <label>Confirm Password</label>
          <input
            value={signupData.confirmpassword}
            name="confirmpassword"
            type="text"
            onChange={(e) => {
              const cnfpwd = e.target.value;
              if (cnfpwd !== signupData.password) {
                setPasswordError({
                  isError: true,
                  message: "Passwords do not match",
                });
              } else {
                setPasswordError({ isError: false, message: "" });
              }
              setsignupData((prev) => ({
                ...prev,
                confirmpassword: cnfpwd,
              }));
            }}
          />
          {passwordError.isError && <div>{passwordError.message}</div>}
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

export default SignupComponent;
