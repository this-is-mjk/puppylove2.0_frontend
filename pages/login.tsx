import React, { useState } from "react";
import styles from "../styles/login.module.css";
import { MdEmail } from "react-icons/md";
import { BiSolidLock } from "react-icons/bi";
import Image from "next/image";
import "../app/(landing)/globals.css";
import Link from "next/link";
import { motion } from "framer-motion";
import Dog from "@/components/Dog";
import ThemeButton from "@/components/Theme";
import Clear from "@/components/clear";

const LoginPage: React.FC = () => {
  const [data, setData] = useState({ email: "", password: "" });

  const handleLog = () => {
    console.log(data);
    setData({ email: "", password: "" });
    console.log(data);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    console.log(data);
  };

  return (
    <div>
      <Clear />
      <div className={styles["login-box"]}>
        <div className={styles["login-box2"]}>
          <Dog />
          <div className={styles["login-container"]}>
            <h1 className={styles["login-title"]} style={{ color: "black" }}>Login</h1>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={styles["login-form-group"]}
            >
              <MdEmail size={18} />

              <input
                className={styles["login-input"]}
                type="email"
                name="email"
                value={data.email}
                onChange={handleSubmit}
                required
                placeholder="Email"
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={styles["login-form-group"]}
            >
              <BiSolidLock size={18} />
              <input
                className={styles["login-input"]}
                type="password"
                name="password"
                value={data.password}
                onChange={handleSubmit}
                required
                placeholder="Password"
              />
            </motion.div>
            <div className={styles["login-bottom"]}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}

              >
                <Link href={"/register"} className={styles["login-submit-button"]}>Register</Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}

                onClick={handleLog}
              // style={{ color: "black" }}
              >
                <Link href={"/dashboard"} className={styles["login-submit-button"]}>
                  Login

                </Link>
              </motion.div>
            </div>
          </div>
          {/* <Link href={'/'} className={styles["close-button"]}>
            &times;
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
