import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import formStyles from "../formStyles";

function Login({navigation}) {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [btnStyle, setBtnStyle] = useState({});

    let checkAlert = () => {
        Alert.alert(
        "로그인",
        "일치하는 아이디와 비밀번호가 없습니다",
        [{
            text: "확인",
            style: "cancel"
        }],
        { cancelable: false });
    };

    let tempSuccess = () => {
        navigation.navigate("ChatBot");
    };

    // TODO: Delete this part after testing
    // useEffect(() => {
    //     navigation.navigate("ChatBot");
    // }, []);

    useEffect(() => {
        (id !== "") && (password !== "") ? setBtnStyle(formStyles.btnActive) : setBtnStyle(formStyles.btnDisabled);
    }, [id, password]);

    return (
        <View style={formStyles.container}>
            <View style={formStyles.inputContainer}>
                <Text style={formStyles.label}>아이디</Text>
                <TextInput style={formStyles.input} placeholder="아이디를 입력하세요"
                        onChangeText={(text) => setId(text)}/>
            </View>
            <View style={formStyles.inputContainer}>
                <Text style={formStyles.label}>비밀번호</Text>
                <TextInput style={formStyles.input} placeholder="비밀번호를 입력하세요"
                        secureTextEntry={true} onChangeText={(text) => setPassword(text)}/>
            </View>
            <View style={formStyles.btnContainer}>
                <TouchableOpacity
                        style={formStyles.btnLogin}
                        onPress={ (e) => {
                            // 서버 API 호출 대체 예정
                            // id, password가 올바른 경우 tempSuccess() 프로시저 호출 (ChatBot 컴포넌트로 이동)
                            (id === "test") && (password === "test123") ? tempSuccess() : checkAlert();
                        } }>
                    <Text style={btnStyle}>로그인</Text>
                </TouchableOpacity>
                <Pressable
                        onPress={ (e) => {
                            navigation.navigate('SignUp');
                        } }>
                    <Text>회원가입</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default Login;