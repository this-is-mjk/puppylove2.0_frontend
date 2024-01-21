// import { setAdminPublished, setMatchedIds } from "../UserData";

import { batchWiseMatches, batchWiseResgis, femaleRegistration, maleRegistration, setStats, totalMatches, totalRegistration } from "../UserData";

// let matchedId : string [] = []

const SERVER_IP = process.env.SERVER_IP
export const get_stats = async() => {
    try {
        const res = await fetch(`${SERVER_IP}/stats`, {
            method: "GET",
            credentials: "include" // For CORS
        });
        if(!res.ok) {
            throw new Error(`HTTP Error: ${res.status} - ${res.statusText}`);
        }
        const res_json = await res.json()
        console.log(res_json)
        setStats(batchWiseMatches, res_json.batchwiseMatches)
        setStats(batchWiseResgis, res_json.batchwiseRegistration)
        setStats(femaleRegistration, res_json.femaleRegisters)
        setStats(maleRegistration, res_json.maleRegisters)
        setStats(totalMatches, res_json.totalMatches)
        setStats(totalRegistration, res_json.totalRegisters)

    }
    catch(err) {
        console.log(err)
        alert('Error in Fetching Results')
    }
}