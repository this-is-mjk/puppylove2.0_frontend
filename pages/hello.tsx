import "./hello.css"
import "../app/globals.css"
import Image from "next/image";
import { BsSearch } from "react-icons/bs"

export default function Hello() {
    return (
        <div className="box">
            <div className="container">
                <div className="section-1">
                    <div className="image-container">
                        <div >
                            <Image src="/Dog.jpg" width={200} height={200} alt="Profile" className="image"></Image>
                        </div>
                        <div className="detail">
                            <p>yoasahshhqshhdhw</p>
                            <p>asahshhqshhdhw</p>
                            <p>ahshhqshhdhw</p>
                            <p>ahshhqshhdhw</p>

                        </div>
                    </div>
                    <div className="heart">

                    </div>
                </div>
                <div className="section-2">
                    <div className="search-div">
                        <BsSearch />
                        <input type="text" className="search-bar" />
                    </div>
                </div>
            </div>
        </div>
    );
}