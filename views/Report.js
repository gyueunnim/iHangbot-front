import { Text, ScrollView, View, StyleSheet } from "react-native";
import { PieChart, StackedBarChart } from "react-native-chart-kit";

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

    
    const sentimentDataToday = [
        {
            name: "긍정",
            population: reportData.data.sentiment.today.positive,
            color: "#0098DB",
            legendFontColor: "#444444",
            legendFontSize: 17
        },
        {
            name: "부정",
            population: reportData.data.sentiment.today.negative,
            color: "#DB4D69",
            legendFontColor: "#444444",
            legendFontSize: 17
        }
    ]

    return (
        <ScrollView>
        <View style={styles.container}>
            <Text style={styles.report}>테스트 계정의 데일리 보고서</Text>
            <Text style={styles.reportTitle}>오늘의 주요 관심사는 <Text style={{ color: '#214597' }}>레고</Text> 입니다.</Text>
            {
                reportData.data.keywordList.map((a, idx) => {
                    return (
                        <View style={styles.reportView} key={idx}>
                            <Text style={styles.keyword}>{a.keyword}</Text>
                            <Text style={styles.count}>{a.count}회</Text>
                            <View style={styles.line} />
                        </View>
                    )
                })
            }
            <Text style={styles.sentimentTitle}>오늘의 주요 감정은 <Text style={{ color: '#214597' }}>긍정</Text> 입니다</Text>
            <PieChart
                data={sentimentDataToday}
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
            <Text style={styles.sentimentTitle}>전날 대비 감정 추이 비교</Text>
        </View>
        </ScrollView>   
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        paddingLeft: 0,
        backgroundColor: '#FFFFFF',
        width: "100%"
    },
    report: {
        textAlign: 'center', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontSize: 25
    },
    reportTitle: {
        textAlign: 'center', 
        alignItems: 'center', 
        justifyContent: 'center',   
        marginTop: 35,
        marginBottom: 15,
        fontSize: 17
    },
    reportView: {
        flexDirection:'row', 
        marginLeft: 60, 
        marginRight: 60,
    },
    sentimentTitle: {
        textAlign: 'center', 
        marginTop: 30, 
        marginBottom: 30,
        fontSize: 20
    },
    keyword: {
        textAlign: 'left',
        fontSize: 22
    },
    count: {
        position: 'absolute',
        right: 0,
        fontSize: 17
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#D5D5D5', 
        marginTop: 20
    },
    chart: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        backgroundColor: '#FFFFFF'
    }
});
  

export default Report;