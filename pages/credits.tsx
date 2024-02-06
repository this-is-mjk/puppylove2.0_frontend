import Image from "next/image"
import { BsLinkedin, BsGithub } from "react-icons/bs"
import "../styles/credits.css"
import Clear from "@/components/clear"
import { useEffect, useState } from "react"
import { Student, search_students } from "@/utils/API_Calls/search"
import CreditCard from "@/components/credits-card"

const Credits = () => {

    const [Contributors, setcontributors] = useState<string[]> (['210755', '210667', '220120', '220950', '221029', '221223' ])
    const [LeadDevelopers, setLeadDevelopers] = useState<Student[]>([]);
    const [Developers, setDevelopers] = useState<Student[]>([]);

    useEffect(()=>{search_students("")},[])

    useEffect(() => {
        const credits = () => {
            // console.log("hello")
            for(let j=0; j < 2; j++) {
                const data: Array<Student> =  search_students(Contributors[j]);
                if(!data.length) {
                    return;
                }
                const student = data[0];
                // console.log(student)
                if (!LeadDevelopers.some((existingStudent) => existingStudent.i === student.i)) {
                    setLeadDevelopers((prevLeadDevelopers) => [...prevLeadDevelopers, student]);
                }
            }

            for(let j=2; j < Contributors.length; j++) {
                const data: Array<Student> = search_students(Contributors[j]);
                if(!data.length) {
                    return;
                }
                const student = data[0];
                // console.log(student)
                if (!Developers.some((existingStudent) => existingStudent.i === student.i)) {
                    setDevelopers((prevDevelopers) => [...prevDevelopers, student]);
                }
            }
        }
        // credits()
        setTimeout(credits,200)
        // console.log(LeadDevelopers)
    }, [])

    // console.log(LeadDevelopers)

    return (
        <div className="credits section_padding">
            <div>
                <h1 className="credit-font">Lead Developers</h1>
                <div className="credits-sec1">
                {LeadDevelopers.map((student) => (
                    // <div key={student.i}>{student.i}</div>
                    <CreditCard
                      key={student.i}
                      student={student}
                      matched
                    />
                ))}
                </div>
            </div>           
            <div>
            <h1 className="credit-font">Developers</h1>
                <div className="credits-sec1">
                {Developers.map((student) => (
                    <CreditCard
                    key={student.i}
                    student={student}
                    matched
                  />
                ))}
                </div>
            </div>
            <Clear />
        </div>
    )
}

export default Credits