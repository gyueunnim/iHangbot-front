
import { useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import formStyles from "../styles/formStyles";

function SignUp() {
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");
    const [check, setCheck] = useState(false);
    const [btnStyle, setBtnStyle] = useState({});

    let checkAlert = () => {
        Alert.alert(                  
        "회원가입",                    // Title
        "비밀번호가 일치하지 않습니다",     // Sub-Title
        [{                           // Button
        
            text: "확인",
            style: "cancel"
        }],
    { cancelable: false }
   )};
   
   let tempAlert = () => {
        Alert.alert(                  
        "회원가입",                    // Title
        "회원가입이 완료되었습니다.",       // Sub-Title
        [{                           // Button
        
            text: "확인",
            style: "cancel"
        }],
    { cancelable: false }
   )};

   useEffect(() => {
       (name !== "") && (id !== "") && (password !== "") && (checkPassword !== "") ? setBtnStyle(formStyles.btnActive) : setBtnStyle(formStyles.btnDisabled)
   }, [name, id, password, checkPassword])


    return (
        <View style={formStyles.container}>
            <View style={formStyles.inputContainer}>
                <View style={formStyles.labelContainer}>
                    <Text style={formStyles.label}>아이 이름</Text>
                    <Text style={formStyles.requiredInput}>*</Text>
                </View>
                <TextInput style={formStyles.input} placeholder="아이 이름을 입력하세요"
                        onChangeText={(text) => setName(text)}/>
            </View>
            <View style={formStyles.inputContainer}>
                <View style={formStyles.labelContainer}>
                    <Text style={formStyles.label}>아이디</Text>
                    <Text style={formStyles.requiredInput}>*</Text>
                </View>
                <TextInput style={formStyles.input} placeholder="아이디를 입력하세요"
                        onChangeText={(text) => setId(text)}/>
            </View>
            <View style={formStyles.inputContainer}>
                <View style={formStyles.labelContainer}>
                    <Text style={formStyles.label}>비밀번호</Text>
                    <Text style={formStyles.requiredInput}>*</Text>
                </View>
                <TextInput style={formStyles.input} placeholder="비밀번호를 입력하세요"
                        secureTextEntry={true} onChangeText={(text) => setPassword(text)}/>
            </View>
            <View style={formStyles.inputContainer}>
                <View style={formStyles.labelContainer}>
                    <Text style={formStyles.label}>비밀번호 확인</Text>
                    <Text style={formStyles.requiredInput}>*</Text>
                </View>
                <TextInput style={formStyles.input} placeholder="비밀번호를 다시 한번 입력하세요"
                        secureTextEntry={true} onChangeText={(text) => setCheckPassword(text)}/>
            </View>
            <View style={formStyles.btnContainer}>
                <TouchableOpacity
                        style={[formStyles.btnLogin, btnStyle]}
                        onPress={ (e) => {
                            // password === checkPassword ? setCheck(true) : checkAlert() // tempAlert() -> 서버 API 호출 대체 예정
                            password === checkPassword ? tempAlert() : checkAlert() 
                        } }>
                    <Text style={formStyles.btnText}>회원가입</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default SignUp;