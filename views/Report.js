import { Text, View, StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";

function Report() {
    // data = axios.get();
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
                    "positive": 10,
                    "negative": 90
                },
                "today": {
                    "positive": 35,
                    "negative": 65
                }
            }
        }
    }

    const sentimentData = {
        labels: [null, null],
        datasets: [
            {
                data: [
                    reportData.data.sentiment.yesterday.positive, 
                    reportData.data.sentiment.yesterday.negative, 
                    reportData.data.sentiment.today.positive, 
                    reportData.data.sentiment.today.negative
                ],
                colors: [
                    (opacity = 1) => '#CD0F0F',
                    (opacity = 1) => '#214597',
                    (opacity = 1) => '#CD0F0F',
                    (opacity = 1) => '#214597',
                ],
            }
        ]
    }

    const chartConfig = {
        backgroundColor: '#FFFFFF',
        backgroundGradientFrom: '#FFFFFF', 
        backgroundGradientTo: '#FFFFFF', 
        decimalPlaces: 0, 
        color: (opacity = 1) => `#000000`,
        labelColor: (opacity = 1) => `#FFFFFF`,
    };
    
    return (
        <View style={styles.container}>
            <Text>테스트 계정의 데일리 보고서</Text>
            <Text>오늘의 주요 관심사는 <Text style={{ color: '#214597' }}>레고</Text> 입니다.</Text>
            {
                reportData.data.keywordList.map((a) => {
                    return (
                        <View>
                            <Text>{a.keyword}</Text>
                            <Text>{a.count}회</Text>
                        </View>
                    )
                })
            }
            <Text>오늘의 주요 감정은 <Text style={{ color: '#214597' }}>긍정</Text> 입니다</Text>
            <Text>전날 대비 감정 추이 비교</Text>
            <BarChart
                // style={styles.chart}
                data={sentimentData}
                width={500}
                height={300}
                showBarTops={false}
                showValuesOnTopOfBars={true}
                chartConfig={chartConfig}
                horizontal={true}
                withCustomBarColorFromData={true}
                flatColor={true}
                fromZero={true}
                withInnerLines={false}
                withHorizontalLabels={false}
                withVerticalLabels={false}
            />
        </View>   
    );
}


  

export default Report;