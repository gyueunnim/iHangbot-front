export const restServerUrl = "http://192.168.0.177:8080";

// keyword
export const urlPostReport = restServerUrl + "/keyword/report";
export const urlPostGetKeyword = restServerUrl + "/keyword/getKeyWord";
export const urlPostGetConcern = restServerUrl + "/keyword/getConcern";

// sentiment
export const urlPostSentimentReport = restServerUrl + "/sentiment/report";
export const urlPostGetSentimentData = restServerUrl + "/sentiment/getData";

// member
export const urlPutProfile = (memberId) => restServerUrl + `/member/${memberId}/profile/setting`;
export const urlPostSignUp = restServerUrl + "/member/signUp";
export const urlGetLogin = restServerUrl + "/member/login";
export const urlGetProfile = (memberId) => restServerUrl + `/member/${memberId}"/profile`;

export const chatbotUrl = "http://192.168.0.204:8079/api/chat";