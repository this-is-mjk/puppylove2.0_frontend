import React, { useEffect, useState } from "react";
import styles from "../styles/login.module.css";
import { MdEmail } from "react-icons/md";
import { BiSolidLock } from "react-icons/bi";
import Image from "next/image";
import { search_students } from "../utils/API_Calls/search";
import "../app/(landing)/globals.css";
import Link from "next/link";
import { motion } from "framer-motion";
import Dog from "@/components/Dog";
// import ThemeButton from "@/components/Theme";
import Clear from "@/components/clear";
import { handleLog } from "../utils/API_Calls/login_api"
import { useRouter } from "next/router"
import { useToast } from "@chakra-ui/react";

const LoginPage: React.FC = () => {
    const [data, setData] = useState({ id: "", password: "" });

    const router = useRouter()
    const toast = useToast()

    const handleLog_api = async () => {
        const status = await handleLog(data)

        if (status.success) {
            // Heart Sending Period Over, Now user is doing last day login to give Confirmation for Matching or to see Results(later)
            if(!status.permit) {
                if(!status.publish) {
                    router.push(`/confirmation`)
                }
                else {
                    router.push(`/result`)
                }
            }
            else {
                router.push(`/dashboard`)
            }
        }
        else {
            toast({
                title: status.credentialError ? "Wrong Credentials!!" : "Server Error in Logging, Contact Developers",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top',
            })
        }
    }

    useEffect(() => {
        toast.closeAll()
    }, [])

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const { name, value } = e.target;
        setData({ ...data, [name]: value });
        // console.log(data);
    };

    useEffect(()=>{search_students("")},[])

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
                                type="text"
                                name="id"
                                value={data.id}
                                onChange={handleSubmit}
                                required
                                placeholder="ID"
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
                                className={styles["login-submit-button"]}
                                onClick={handleLog_api}
                                style={{ color: "black" }}
                            // style={{ color: "black" }}
                            >
                                Login
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