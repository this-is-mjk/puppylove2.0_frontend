import React, { useEffect } from "react";
import styles from "../styles/login.module.css";
import "../app/(landing)/globals.css";
import Link from "next/link";
import { motion } from "framer-motion";
import Dog from "@/components/Dog";
import Clear from "@/components/clear";
import { useRouter } from "next/router"
import { confirmationToPublish } from "@/utils/API_Calls/confirmation_api";
import {Id} from "@/utils/UserData"

const ConfirmationPage: React.FC = () => {
    const router = useRouter()

    const submit_yes = async () => {
        const status = await confirmationToPublish();
        if(status.success) {
            alert("Yay! Your confirmation was submitted")
            router.push("/result")
        }
        else {
            if(status.error === "Results Published") {
                alert("You are Late, Results are Already Published :(")
                router.push("/")
            }
            else {
                alert("Error in Publishing, Contact Developers")
            }
        }
    }

    // Either Page was Reloaded or User Tried to Access the page before time.
    // In Any Case push router to Login Page
    useEffect(() => {
        if(Id === '') {
            router.push(`/login`)
        }
    })
    if(Id === '') {
        return
    }

    return (
        <div>
            <Clear />
            <div className={styles["login-box"]}>
                <div className={styles["login-box2"]}>
                    <Dog />
                    <div className={styles["login-container"]}>
                        <h1 className={styles["login-title"]} style={{ color: "black" }}>Do you want to get matched?</h1>
                        <div className={styles["login-bottom"]}>
                            
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className={styles["login-submit-button"]}
                                onClick={submit_yes}
                                style={{ width: "80%", backgroundColor: "#d61174", color: "white", fontSize:"22px"}}
                            // style={{ color: "black" }}
                            >
                                YES
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Link href={"/"}>NO</Link>
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

export default ConfirmationPage;