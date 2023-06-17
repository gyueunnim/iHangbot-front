import { useEffect, useState } from "react";
import { Alert, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import formStyles from "../styles/formStyles";
import { useSelector } from "react-redux";
import axios from "axios";

function Login({navigation}) {
    const initialLogin = useSelector((state) => state.initialLogin);
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [btnStyle, setBtnStyle] = useState({});

    const url = "http://192.168.0.177:8080/member/login"

    const loginInfo = {
        "user_id": id, 
        "password": password
    }

    let failAlert = () => {
        Alert.alert(
        "로그인 실패",
        "일치하는 아이디와 비밀번호가 없습니다",
        [{
            text: "확인",
            style: "cancel"
        }],
        { cancelable: false });
    };

    let navigateTo = () => {
        initialLogin ? navigation.navigate("ChatBot") : navigation.navigate("ReportTab");
    };

    const clickedToServer = async () => {
        axios.get(url, {
            params: loginInfo
        }).then((response) => {
            if(response.status === 200) 
                navigateTo();
            else
                failAlert();
        })
        .catch((err) => console.error(err))
    }

    useEffect(() => {
        setPassword("");
    }, [initialLogin]);

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
                        value={password}
                        secureTextEntry={true} onChangeText={(text) => setPassword(text)}/>
            </View>
            <View style={formStyles.btnContainer}>
                <TouchableOpacity
                        style={[formStyles.btnLogin, btnStyle]}
                        onPress={ (e) => {
                            clickedToServer();
                        } }>
                    <Text style={formStyles.btnText}>로그인</Text>
                </TouchableOpacity>
                <Pressable
                        onPress={ (e) => {
                            navigation.navigate('SignUp');
                        } }>
                    <Text style={formStyles.btnToSignUpText}>회원가입</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default Login;