import { Text, ScrollView, View } from "react-native";
import { useState, useEffect } from "react";
import { PieChart, StackedBarChart } from "react-native-chart-kit";
import reportStyles from '../styles/reportStyles';

function Report() {
    // data = axios.get();
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
    
    const [sentimentKeywords, setSentimentKeywords] = useState({
        positive: [],
        negative: []
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
    const yesterdaySentiment =  reportData.data.sentiment.yesterday;
    const todaySentiment = reportData.data.sentiment.today;
    
    const compareSentiment = (diff) => {
        const returnObj = {
            difference: Math.abs(diff),
            message: diff >= 0 ? "증가" : "감소"
        }
        return returnObj;
    }

    useEffect(() => {
        const positiveComparison = compareSentiment(todaySentiment.positive - yesterdaySentiment.positive);
        const negativeComparison = compareSentiment(todaySentiment.negative - yesterdaySentiment.negative);
        setComparedSentiment({
            positive: positiveComparison,
            negative: negativeComparison
        });
    }, [])

    
    const pieChartData = [
        {
            name: "긍정",
            population: todaySentiment.positive,
            color: "#0098DB",
            legendFontColor: "#444444",
            legendFontSize: 17
        },
        {
            name: "부정",
            population: todaySentiment.negative,
            color: "#DB4D69",
            legendFontColor: "#444444",
            legendFontSize: 17
        }
    ]
    
    const stackedBarChartData = {
        labels: ["어제", "오늘"],
        legend: ["부정", "긍정"],
        data: [
            [yesterdaySentiment.negative, yesterdaySentiment.positive],
            [todaySentiment.negative, todaySentiment.positive]
        ],
        barColors: ["#DB4D69", "#0098DB"],
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
                <PieChart
                    data={pieChartData}
                    width={300}
                    height={150}
                    chartConfig={{
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    }}
                    accessor={"population"}
                    backgroundColor={"transparent"}
                    paddingLeft={"-5"}
                    center={[10, -10]}
                />
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

export default Report;