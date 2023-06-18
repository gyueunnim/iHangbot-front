import { Text, ScrollView, View, Image } from "react-native";
import { useState, useEffect } from "react";
import { StackedBarChart } from "react-native-chart-kit";
import reportStyles from '../styles/reportStyles';
import getInterestAnalysis from "../modules/getInterestAnalysis";
import getSentimentAnalysis from "../modules/getSentimentAnalysis";

function Report() {
    const [interestAnalysis, setInterestAnalysis] = useState({
        keywords: [],
        concerns: []
    });
    const [todaySentimentAnalysis, setTodaySentimentAnalysis] = useState({
        negative: 0,
        positive: 0,
        neutral: 0,
        negData: [],
        posData: []
    });
    const [yesterdaySentimentAnalysis, setYesterdaySentimentAnalysis] = useState({
        negative: 0,
        positive: 0,
        neutral: 0,
        negData: [],
        posData: []
    });

    const [comparedSentiment, setComparedSentiment] = useState({
        positive: {
            difference: 0,
            message: []
        },
        negative: {
            difference: 0,
            message: []
        }
    });

    const reportData = {
        "data": {
            "keywordList": [
            {
                "keyword": "레고",
                "count": 45
            },
            {
                "keyword": "소리",
                "count": 35
            },
            {
                "keyword": "지구",
                "count": 25
            },
            {
                "keyword": "감정",
                "count": 15
            },
            {
                "keyword": "자동차",
                "count": 5
            }
            ],
            "sentiment": {
                "yesterday": {
                    "positive": 90,
                    "negative": 10
                },
                "today": {
                    "positive": 65,
                    "negative": 35
                }
            }
        }
    }
    
    const compareSentiment = (diff) => {
        const returnObj = {
            difference: Math.abs(diff),
            message: diff >= 0 ? "증가" : "감소"
        }
        return returnObj;
    }

    const fetchData = async () => {
        const interestData = await getInterestAnalysis();
        const todaySentimentData = await getSentimentAnalysis(true);
        const yesterdaySentimentData = await getSentimentAnalysis(false);
        setInterestAnalysis(interestData);
        setTodaySentimentAnalysis(todaySentimentData);
        setYesterdaySentimentAnalysis(yesterdaySentimentData);
        const positiveComparison = compareSentiment(todaySentimentData.positive - yesterdaySentimentData.positive);
        const negativeComparison = compareSentiment(todaySentimentData.negative - yesterdaySentimentData.negative);
        setComparedSentiment({
            positive: positiveComparison,
            negative: negativeComparison
        });
    }

    useEffect(() => {
        fetchData();
    }, []);
    
    const stackedBarChartData = {
        labels: ["어제", "오늘"],
        legend: ["부정", "중립", "긍정"],
        data: [
            [yesterdaySentimentAnalysis.negative, yesterdaySentimentAnalysis.neutral, yesterdaySentimentAnalysis.positive],
            [todaySentimentAnalysis.negative, todaySentimentAnalysis.neutral, todaySentimentAnalysis.positive]
        ],
        barColors: ["#DB4D69", "#ced4da", "#0098DB"],
    }

    return (
        <ScrollView>
            <View style={reportStyles.container}>
                <Text style={reportStyles.report}>테스트 계정의 데일리 보고서</Text>
                <Text style={reportStyles.reportTitle}>오늘의 주요 관심사는 <Text style={{ color: '#214597' }}>레고</Text> 입니다.</Text>
                {
                    reportData.data.keywordList.map((a, idx) => {
                        return (
                            <View style={reportStyles.reportView} key={idx}>
                                <Text style={reportStyles.keyword}>{a.keyword}</Text>
                                <Text style={reportStyles.count}>{a.count}회</Text>
                                <View style={reportStyles.line} />
                            </View>
                        );
                    })
                }
                <Text style={reportStyles.sentimentTitle}>오늘의 주요 감정은 <Text style={{ color: '#214597' }}>긍정</Text> 입니다</Text>
                <View style={reportStyles.analysisBoxContainer}>
                    <AnalysisBox isPositive={true} number={17} mention={["Hi", "Hello"]} />
                    <AnalysisBox isPositive={false} number={83} mention={["Come on", "Kevin"]} />
                </View>
                <Text style={reportStyles.sentimentTitle}>전날 대비 감정 추이 비교</Text>
                <StackedBarChart
                    data={stackedBarChartData}
                    width={300}
                    height={250}
                    chartConfig={{
                        backgroundColor: '#FFFFFF',
                        backgroundGradientFrom: '#FFFFFF', 
                        backgroundGradientTo: '#FFFFFF', 
                        color: (opacity = 1) => `#FFFFFF`,
                        labelColor: (opacity = 1) => `#444444`,
                        propsForLabels: {
                            fontSize: 15
                        }
                    }}
                    withHorizontalLabels={false}
                />
                <Text>전날에 비해 긍정은 
                    {
                        comparedSentiment.positive.difference === 0 ? 
                        <Text>변화가 없었습니다</Text>
                        : <Text> {comparedSentiment.positive.difference}% {comparedSentiment.positive.message}했습니다</Text>
                    } 
                </Text>
                <Text>전날에 비해 부정은 
                    {
                        comparedSentiment.positive.difference === 0 ? 
                        <Text>변화가 없었습니다</Text>
                        : <Text> {comparedSentiment.negative.difference}% {comparedSentiment.negative.message}했습니다</Text>
                    } 
                </Text>
                <View style={reportStyles.reportComment}>
                {
                    comparedSentiment.positive.difference === 0 ? 
                    <Text style={reportStyles.reportComment}>오늘도 아이와 즐거운 하루 보내세요!</Text> 
                    : ( comparedSentiment.positive.difference > 0 ?
                    <Text style={reportStyles.reportComment}>아이가 긍정적인 질문을 많이 했네요! 오늘은 아이와 즐거운 대화를 많이 해보는건 어떨까요?</Text>
                    : <Text style={reportStyles.reportComment}>아이가 부정적인 질문을 많이 했어요. 오늘은 아이의 관심사에 대해 함께 얘기 해보는건 어떨까요?</Text>
                    )
                }
                </View>
            </View>
        </ScrollView>   
    );
}

function AnalysisBox({isPositive, number, mention}) {
    const iconSrc = isPositive ? require("../assets/positive_Icon.png") : require("../assets/negative_Icon.png");
    const summaryColor = isPositive ? { color: "#0098DB" } : { color: "#DB4D69" };
    return (
        <View style={reportStyles.analaysisBox}>
            <Image style={reportStyles.sentimentIcon} source={iconSrc} />
            <View>
                <Text style={[reportStyles.analysisSummary, summaryColor]}>{isPositive ? "긍정" : "부정"}: {number}</Text>
                {
                    mention.map((elem, idx) => <Text key={idx}>{elem}</Text>)
                }
            </View>
        </View>
    );
}

export default Report;