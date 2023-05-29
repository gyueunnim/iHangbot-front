
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

function SignUp() {
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");
    return (
        <View>
            <Text>아이 이름</Text>
            <TextInput placeholder="아이 이름을 입력하세요" onChangeText={(text) => setName(text)}/>
            <Text>아아디</Text>
            <TextInput placeholder="아이디를 입력하세요" onChangeText={(text) => setId(text)}/>
            <Text>비밀번호</Text>
            <TextInput placeholder="비밀번호를 입력하세요" secureTextEntry={true} onChangeText={(text) => setPassword(text)}/>
            <Text>비밀번호 확인</Text>
            <TextInput placeholder="비밀번호를 다시 한번 입력하세요" secureTextEntry={true} onChangeText={(text) => setCheckPassword(text)}/>

            <TouchableOpacity
                    onPress={ (e) => {
                    } }>
                <Text>회원가입</Text>
            </TouchableOpacity>
        </View>
    );
}

export default SignUp;