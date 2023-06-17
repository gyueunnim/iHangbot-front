import { useState, useEffect } from "react";
import { Text, TextInput, TouchableOpacity, View, Alert, Image } from "react-native";
import formStyles from "../styles/formStyles";
import { useSelector } from "react-redux";
import axios from "axios";

function Modification() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [btnStyle, setBtnStyle] = useState({});
    const userLoginInfo = useSelector((state) => {return state.userLoginInfo});
    const url = "http://192.168.0.177:8080/member/"+(userLoginInfo.id)+"/profile"


    const getInfoFromServer = () => {
        axios.get(url)
        .then((res) => {
            setName(res.data.data.child_name);
            setAge(res.data.data.child_age);
            setEmail(res.data.data.email);
        })
    }

    useEffect(() => {
        (name !== "") && (age !== "") && (email !== "") ? setBtnStyle(formStyles.btnActive) : setBtnStyle(formStyles.btnDisabled)
    }, [name, age, email])

    return (
        <View style={formStyles.container}>
        <Image source={require('../assets/user_Icon.png')} style={{ width: 100, height: 100 }}/>
        <Text style={{fontSize: 25, fontWeight: 'bold', marginBottom: 20}}>프로필 수정</Text>
        <View style={formStyles.inputContainer}>
            <View style={formStyles.labelContainer}>
                <Text style={formStyles.label}>아이 이름</Text>
                <Text style={formStyles.requiredInput}>*</Text>
            </View>
            <TextInput style={formStyles.input} placeholder="아이 이름을 입력하세요"  
                    value={name} onChangeText={(text) => setName(text)}/>
        </View>
        <View style={formStyles.inputContainer}>
            <View style={formStyles.labelContainer}>
                <Text style={formStyles.label}>나이</Text>
                <Text style={formStyles.requiredInput}>*</Text>
            </View>
            <TextInput style={formStyles.input} placeholder="나이를 입력하세요"
                    value={age} onChangeText={(text) => setAge(text)}/>
        </View>
        <View style={formStyles.inputContainer}>
            <View style={formStyles.labelContainer}>
                <Text style={formStyles.label}>이메일</Text>
                <Text style={formStyles.requiredInput}>*</Text>
            </View>
            <TextInput style={formStyles.input} placeholder="이메일을 입력하세요"
                   value={email} onChangeText={(text) => setEmail(text)}/>
        </View>
        <View style={formStyles.btnContainer}>
            <TouchableOpacity
                    style={[formStyles.btnLogin, btnStyle]}
                    onPress={ (e) => {
                        // password === checkPassword ? setCheck(true) : checkAlert() // tempAlert() -> 서버 API 호출 대체 예정
                        password === checkPassword ? tempAlert() : checkAlert() 
                    } }>
                <Text style={formStyles.btnText}>수정하기</Text>
            </TouchableOpacity>
        </View>
    </View>
    )
}

export default Modification;