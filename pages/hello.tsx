import "./hello.css"
import "../app/globals.css"
import Image from "next/image";
import { BsSearch } from "react-icons/bs"
import Card from "../components/card";

export default function Hello() {
    return (
        <div className="box">
            <div className="container">
                <div className="section-1">
                    <div className="image-container">
                        <div className="image-box" >
                            <Image src="/Dog.jpg" width={200} height={200} alt="Profile" className="image"></Image>
                        </div>
                        <div className="detail">
                            <p className="details-text">yoasahshhqshhdhw</p>
                            <p className="details-text">asahshhqshhdhw</p>
                            <p className="details-text">ahshhqshhdhw</p>
                            <p className="details-text">ahshhqshhdhw</p>
                        </div>
                    </div>
                    <div className="heart">

                    </div>
                </div>
                <div className="section-2">
                    <div className="search-div">
                        <BsSearch />
                        <input type="text" className="search-bar details-text" placeholder="Enter Name To Search.." />
                    </div>
                    <div className="student-container">
                        <Card />
                        <Card />
                        <Card />
                        <Card />


                    </div>
                </div>
            </div>
        </div>
    );
}