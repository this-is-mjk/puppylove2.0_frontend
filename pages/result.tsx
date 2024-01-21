"use client"

import React, { useEffect, useState } from 'react';
import "../styles/result-page.css";
import Clear from "@/components/clear";
import Hearts from "@/components/Hearts";
import { motion } from "framer-motion";
import { admin_pulished, Id, Matched_Ids, Matches, setMatches, setUser, Submit, user } from "@/utils/UserData";
import Results from "@/components/matchedResults";
import { useRouter } from "next/router"
import styles from "../styles/login.module.css";
import Link from 'next/link';
import { search_students, Student } from '@/utils/API_Calls/search';
import { get_result } from '@/utils/API_Calls/get_results';
import { Button } from '@chakra-ui/react';
import { handle_Logout } from '@/utils/API_Calls/login_api';
import { FaSignOutAlt } from 'react-icons/fa';

const ResultPage = () => {

    const router = useRouter();

    useEffect(() => {
        
        if (Id === '') {
          router.push('/login');
        }else {
            setUser(search_students(Id)[0]);
        }
    }, [])
   
    useEffect(() => {
        const show_result = async() => {
            await get_result();
            for(let j=0; j < Matched_Ids.length; j++) {
                const data: Array<Student> = search_students(Matched_Ids[j]);
                if(!data.length) {
                    return;
                }
                const student = data[0];
                console.log(student)
                setMatches(student)
            }
        }
        show_result();
        console.log(Matches)
    }, [])

    const Logout = async () => {

        const isValid = await handle_Logout()
        router.push('/')
        if(!isValid) {
            alert('Some Error Occured while Logging Out')
        }
        else {
            // console.log('Logged Out')
        }
    }

    const stylesss = {
        backgroundImage: `url("https://home.iitk.ac.in/~${user?.u}/dp"), url("https://oa.cc.iitk.ac.in/Oa/Jsp/Photo/${user?.i}_0.jpg"), url("/dummy.png")`,
      };

        return (
        <div className='box'>
            <Clear />

            <div className='logout-button-div'>
                <Button as="a" className="chakra-button" onClick={Logout} leftIcon={<FaSignOutAlt />}>
                    Logout
                </Button>
            </div>

            <div className='heror'>
            <div className='section-Ar'>
                <div className='section_1r'>
                    <div className="info">
                        <div className="image-container">
                            <div className="image-box">
                            <div className="profile" style={stylesss}></div>
                            </div>
                            {user && <div className="detail">
                                <div className="details-text-name">{user?.n}</div>
                                {/* <div className="details-text" >{user?.d}</div> */}
                                <div className="details-text" >{user?.i}</div>
                            </div>}

                        </div>
                    </div>
                </div>
                <div className='section_2r'><Hearts /></div>
               
            </div>
            <div className="section-Br">
                {admin_pulished ?
                
                <div className='section_3r'>
                    <h2>Matches :</h2>
                    <Results />
                </div>
                :

                <div className='section_3r'>
                    <h1>Results Yet to be Published</h1>
                </div>
                }
            {/* <Link href="/dashboard"  style={{ color: "white" , fontSize : "20px"}}>Back</Link> */}
                
            </div>
            </div>
            <Clear />
        </div>

        );
}

export default ResultPage;