import { StyleSheet } from "react-native";

const reportStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        paddingLeft: 0,
        backgroundColor: '#FFFFFF',
        width: "100%",
        height: "100%"
    },
    report: {
        textAlign: 'center', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontSize: 25,
        fontWeight: 'bold'
    },
    reportTitle: {
        textAlign: 'center', 
        alignItems: 'center', 
        justifyContent: 'center',   
        marginTop: 35,
        marginBottom: 15,
        fontSize: 17,
        fontWeight: 'bold'
    },
    reportView: {
        flexDirection:'row', 
        marginLeft: 60, 
        marginRight: 60,
    },
    reportCommentTitle: {
        textAlign: 'center', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontSize: 15,
        marginTop: 30,
        fontWeight: 'bold'
    },
    reportComment: {
        marginTop: 4,    
        marginLeft: 15, 
        marginRight: 15,
        fontSize: 15
    },
    sentimentTitle: {
        textAlign: 'center', 
        marginTop: 30, 
        marginBottom: 30,
        fontSize: 20,
        fontWeight: 'bold'
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
    },
    analysisBoxContainer: {
        width: "90%",
        alignSelf: "flex-start",
        gap: 8
    },
    analaysisBox: {
        width: "100%",
        paddingHorizontal: 30,
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: 14,
        marginBottom: 12
    },
    sentimentIcon: {
        width: 40,
        height: 40
    },
    analysisSummary: {
        fontWeight: 500
    },
    mentionContainer: {
        marginTop: 8,
        gap: 2
    }
});
  

export default reportStyles;