import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

function Login() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    return (
        <View>
            <Text>아이디</Text>
            <TextInput placeholder="아이디를 입력하세요" onChangeText={(text) => setId(text)}/>
            <Text>비밀번호</Text>
            <TextInput placeholder="비밀번호를 입력하세요" secureTextEntry={true} onChangeText={(text) => setPassword(text)}/>
            <TouchableOpacity
                    onPress={ (e) => {
                    } }>
                <Text>로그인</Text>
            </TouchableOpacity>
            <Pressable
                    onPress={ (e) => {
                    } }>
                <Text>회원가입</Text>
            </Pressable>
        </View>
    );
}

export default Login;