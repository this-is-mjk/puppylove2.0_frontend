import Image from "next/image"
import { BsLinkedin, BsGithub } from "react-icons/bs"
import "../styles/credits.css"
import Clear from "@/components/clear"
const CreditCard = ({ check }) => {
    return (
        <div className="credit-card">
            <div>
                <Image
                    src="/Dog.jpg"
                    width={140}
                    height={140}
                    alt="Profile"
                    className="credit-image"
                />
            </div>
            <div className="credit-sec2">
                <p className="credits-text">Pratham Sahu</p>
                {check && <p>Coordinator</p>}

            </div>
            <div className="centered">
                <BsLinkedin className="icons" />
                <BsGithub className="icons" />
            </div>


        </div>
    )
}
const Credits = () => {
    return (
        <div className="credits section_padding">
            <div>
                <h1 className="credit-font">Credits</h1>
                <div className="credits-sec1">


                    <CreditCard check={true} />
                    <CreditCard check={true} />

                </div>


            </div>
            <div>
                <h1 className="credit-font">Other Contributors</h1>
                <div className="credits-sec1">
                    <CreditCard check={false} />


                    <CreditCard check={false} />
                    <CreditCard check={false} />
                    <CreditCard check={false} />
                    <CreditCard check={false} />

                </div>


            </div>
            <Clear />



        </div>
    )
}

export default Credits
