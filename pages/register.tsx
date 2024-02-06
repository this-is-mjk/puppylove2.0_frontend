import React, { useEffect, useState } from "react";
import styles from "../styles/login.module.css"; // Import your CSS module
import { MdEmail } from "react-icons/md";
import "../app/globals.css";
import Link from "next/link";
import { motion } from "framer-motion";
import Dog from "@/components/Dog";
import Clear from "@/components/clear";
import { handleRegister } from "../utils/API_Calls/register_api"
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";

const RegisterPage: React.FC = () => {
    const [id, setId] = useState("");

    const router = useRouter()
    const toast = useToast()

    const handleRegister_api = async () => {
        const res_json : Response = await handleRegister(id)
        const isValid = res_json.ok;
        const already_reg = res_json.status

        if (isValid) {
            setId("");
            router.push(`/verify?id=${id}`)
        }

        else if(already_reg == 405){
            router.push('./login')
            toast({
                title: 'You are already Registered. Login instead',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top',
            })
        }else{
            toast({
                title: 'User not found or already registered',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top',
            })
            // USER NOT CREATED IN DATABASE
            
        }
    };

    useEffect(() => {
        toast.closeAll()
    }, [])

    const handleSubmit = (e: any) => {
        const newId = e.target.value;
        setId(newId);
    };

    return (
        <div>
            <Clear />
            <div className={styles["login-box"]}>
                <div className={styles["login-box2"]}>
                    <Dog />
                    <div className={styles["login-container"]}>
                        <h1 className={styles["login-title"]}>Register</h1>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className={styles["login-form-group"]}
                        >
                            <MdEmail size={18} />

                            <input
                                className={styles["login-input"]}
                                type="text"
                                name="ID"
                                value={id}
                                onChange={handleSubmit}
                                required
                                placeholder="ID"
                            />
                        </motion.div>
                        <div className={styles["login-bottom"]}>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}

                            >
                                <Link style={{ color: "black" }} href={"/login"} className={styles["login-submit-button"]}>Go to Login</Link>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className={styles["login-submit-button"]}
                                style={{ color: 'black' }}
                                onClick={handleRegister_api}
                            >
                                Send OTP
                            </motion.div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RegisterPage;