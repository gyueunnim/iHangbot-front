import axios from "axios";
import { urlPostSentimentReport } from "../data/global";

const todayReportData = {
    data: {
        negative: 30,
        positive: 60,
        neutral: 10,
        negData: [
            "말이안통하네 진짜",
            "고추장돈까스가 어딨어 멍청아",
            "나 배고파",
            "마 나와라",
            "배고파"
        ],
        posData: [
            "현재까지 인간이 창조한 캐릭터 중에서 매우 크게 성공한 인물 중 하나이다.[8] 양산 끝에 '그저 그런 기믹'에 불과하게 된 드라큘라 백작과는 달리[9], 다양하게 재창조되었으나 원작자가 만든 고유의 인격과 독특한 매력을 유지하는 불사조 같은 캐릭터. 특히 친구인 존 왓슨과의 콤비는 그야말로 역사에 길이 남을 명콤비라 할 수 있다",
            "캐릭터의 대명사이자 탐정 캐릭터들을 한 단계 진화시킨 캐릭터라고 평가받는다. 과거의 탐정들이 단순히 사건 푸는 ‘사고 기계’에 불과했다면, 홈즈는 그런 탐정 캐릭터들에게 인간다운 개성을 부여하는 시발점이 되었다",
            "반가워",
            "나는 김예찬이야",
            "나는 김예찬이야"
        ]
    }
};

const yesterdayReportData = {
    data: {
        negative: 20,
        positive: 40,
        neutral: 40,
        negData: [
            "말이안통하네 진짜",
            "고추장돈까스가 어딨어 멍청아",
            "나 배고파",
            "마 나와라",
            "배고파"
        ],
        posData: [
            "현재까지 인간이 창조한 캐릭터 중에서 매우 크게 성공한 인물 중 하나이다.[8] 양산 끝에 '그저 그런 기믹'에 불과하게 된 드라큘라 백작과는 달리[9], 다양하게 재창조되었으나 원작자가 만든 고유의 인격과 독특한 매력을 유지하는 불사조 같은 캐릭터. 특히 친구인 존 왓슨과의 콤비는 그야말로 역사에 길이 남을 명콤비라 할 수 있다",
            "캐릭터의 대명사이자 탐정 캐릭터들을 한 단계 진화시킨 캐릭터라고 평가받는다. 과거의 탐정들이 단순히 사건 푸는 ‘사고 기계’에 불과했다면, 홈즈는 그런 탐정 캐릭터들에게 인간다운 개성을 부여하는 시발점이 되었다",
            "반가워",
            "나는 김예찬이야",
            "나는 김예찬이야"
        ]
    }
};

export default async function getSentimentAnalysis(isToday) {
    try {
        // 서버가 켜져 있는 경우
        // const response = await axios.post(urlPostSentimentReport);
        // console.log(response.status);
        // console.log(response.message);

        // 서버가 꺼져 있는 경우
        const response = isToday ? todayReportData : yesterdayReportData;
        return response.data;
    } catch (err) {
        console.error(err);
    }
}