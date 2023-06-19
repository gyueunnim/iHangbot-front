import axios from "axios";
import { urlGetReportComment } from "../data/global";

export default async function requestReportComment() {
    // const reportComment = await axios.get(urlGetReportComment);
    const reportComment = "아이가 많이 힘들어 보입니다. 아이를 보듬어 주세요.";
    return reportComment;
}