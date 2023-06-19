import axios from "axios";
import { urlPostReport } from "../data/global";

const reportData = {
    data: {
        keywords: [
            {
                keyword: "레고",
                count: 45
            },
            {
                keyword: "소리",
                count: 35
            },
            {
                keyword: "지구",
                count: 25
            },
            {
                keyword: "감정",
                count: 15
            },
            {
                keyword: "자동차",
                count: 5
            }
        ],
        concerns: [
            "레고",
            "자동차",
            "여행"
        ]
    }
}

export default async function getInterestAnalysis() {
    try {
        // 서버가 켜져 있을 경우
        // const response = await axios.post(urlPostReport);
        // console.log(response.status);
        // console.log(response.message);

        // 서버가 안 켜져 있을 경우
        const response = reportData;
        return response.data;
    } catch (err) {
        console.error(err);
    }
}