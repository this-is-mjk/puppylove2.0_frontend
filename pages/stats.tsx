import HorizontalCharts from "@/components/charts/horizontalChart"
import Clear from "@/components/clear"
import { admin_pulished, batchWiseMatches, batchWiseResgis, totalMatches } from "@/utils/UserData"
import '../styles/stats.css'
import DoughnutChart from "@/components/charts/donutChart"
import { FcDislike } from "react-icons/fc";
import { IoHeartDislikeSharp } from "react-icons/io5"
import { useEffect } from "react"
import { get_stats } from "@/utils/API_Calls/stats_api"



const Stats = () => {

    useEffect(() => {
        const show_stats = async() => {
            await get_stats();
        }
        show_stats();
    }, [])

    return (
        <div>
        { !(admin_pulished) ?
            <div>
                <Clear/>
                <Clear/>
                <div className="section">
                    <h1 className="font">No Stats To Show Yet</h1>
                    <div className="dislikeheart">
                        <IoHeartDislikeSharp/>
                    </div>
                </div>
            </div> :
        <div>
            <Clear/>
            <Clear/>
            <div>
                <h1 className="font">Total Matches: {totalMatches}</h1>
            </div>
            <Clear/>
            <div className="grid">
                <div className="section-1">
                    <h1 className="font">Batch Wise Stats</h1>
                    <div className="graphGrid">
                        <HorizontalCharts Data = {batchWiseMatches} Label = "Batch Wise Matches"/>
                        <HorizontalCharts Data = {batchWiseResgis} Label = "Batch Wise Registration"/>
                        
                    </div>
                </div>
                <div className="section-2">
                    <h1 className="font">Registrations</h1>
                    <div className="doughnutGrid">
                        <DoughnutChart/>
                    </div>
                </div>
            </div>
            <Clear/>
        </div>
        }
        </div>
    )
}

export default Stats
