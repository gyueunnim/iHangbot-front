import { useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import formStyles from "../styles/formStyles";
import { RadioButton } from "react-native-paper";
import axios from "axios";

function SignUp({navigation}) {
    // For the value of radio button of genders

    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");
    const [gender, setGender] = useState(true); // true : male, false : female
    const [age, setAge] = useState(0);
    const [email, setEmail] = useState("");
    const [btnStyle, setBtnStyle] = useState({});

    const userInfo = {
        "user_id": id,
        "password": password,
        "check_password": checkPassword,
        "email": email,
        "child_name": name,
        "child_age": age,
        "child_gender": gender
    }

    const navigateToLogin = () => {
        navigation.navigate("Login");
    }   

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

   let failAlert = () => {
        Alert.alert(                  
        "회원가입",                    // Title
        "회원가입에 실패하였습니다.",     // Sub-Title
        [{                           // Button
        
            text: "확인",
            style: "cancel"
        }],
    { cancelable: false }
    )};
   
   let successAlert = () => {
        Alert.alert(                  
        "회원가입",                    // Title
        "회원가입이 완료되었습니다.",       // Sub-Title
        [{                           // Button
        
            text: "확인",
            style: "cancel"
        }],
    { cancelable: false },
    navigateToLogin()
   )};

      const clickedToServer = async () => {
        axios.post("http://192.168.0.177:8080/signUp", userInfo)
        .then((response) => { 
            if(response.status === 200) {
                successAlert();
                navigateToLogin();
            }
            else
                failAlert();
        })
        .catch((err) => console.error(err));
    }



   useEffect(() => {
       (name !== "") && (id !== "") && (password !== "") && (checkPassword !== "") ? setBtnStyle(formStyles.btnActive) : setBtnStyle(formStyles.btnDisabled)
   }, [name, id, password, checkPassword, gender, age, email])


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
            <View style={formStyles.inputContainer}>
                <View style={formStyles.labelContainer}>
                    <Text style={formStyles.label}>성별</Text>
                    <Text style={formStyles.requiredInput}>*</Text>
                </View>
                <View style={formStyles.radioContainer}>
                    <View style={formStyles.radioUnit}>
                        <RadioButton
                                status={gender == true ? "checked" : "unchecked"}
                                onPress={() => setGender(true)} />
                        <Text style={{color: "#212529"}}>남자</Text>
                    </View>
                    <View style={formStyles.radioUnit}>
                        <RadioButton
                                status={gender == false ? "checked" : "unchecked"}
                                onPress={() => setGender(false)} />
                        <Text style={{color: "#212529"}}>여자</Text>
                    </View>
                </View>
            </View>
            <View style={formStyles.inputContainer}>
                <View style={formStyles.labelContainer}>
                    <Text style={formStyles.label}>나이</Text>
                    <Text style={formStyles.requiredInput}>*</Text>
                </View>
                <TextInput style={formStyles.input} placeholder="나이를 입력하세요"
                        onChangeText={(text) => setAge(text)}/>
            </View>
            <View style={formStyles.inputContainer}>
                <View style={formStyles.labelContainer}>
                    <Text style={formStyles.label}>이메일</Text>
                    <Text style={formStyles.requiredInput}>*</Text>
                </View>
                <TextInput style={formStyles.input} placeholder="이메일을 입력하세요"
                        onChangeText={(text) => setEmail(text)}/>
            </View>
            <View style={formStyles.btnContainer}>
                <TouchableOpacity
                        style={[formStyles.btnLogin, btnStyle]}
                        onPress={ (e) => {
                            password === checkPassword ? clickedToServer() : checkAlert()
                        } }>
                    <Text style={formStyles.btnText}>회원가입</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default SignUp;