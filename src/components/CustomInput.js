import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Input} from 'react-native-elements';
import {MaterialCommunityIcons} from '@expo/vector-icons';

const CustomInput = ({
                         label,
                         iconName,
                         error,
                         onFocus = () => {
                         },
                         password,
                         ...props
                     }) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    return (
        <View style={styles.labelContainerStyle}>
            {iconName}
            {password === true ? <Input
                    secureTextEntry={hidePassword}
                    labelStyle={styles.labelStyle}
                    label={label}
                    inputContainerStyle={styles.inputContainerStyle}
                    style={[
                        styles.inputStyle,
                        {borderColor: error ? 'red' : isFocused ? 'gray' : 'white'},
                    ]}
                    onFocus={() => {
                        onFocus();
                        setIsFocused(true);
                    }}
                    onBlur={() => {
                        setIsFocused(false);
                    }}
                    {...props}
                /> :
                <Input
                    labelStyle={styles.labelStyle}
                    label={label}
                    inputContainerStyle={styles.inputContainerStyle}
                    style={[
                        styles.inputStyle,
                        {borderColor: error ? 'red' : isFocused ? 'gray' : 'white'},
                    ]}
                    onFocus={() => {
                        onFocus();
                        setIsFocused(true);
                    }}
                    onBlur={() => {
                        setIsFocused(false);
                    }}
                    {...props}
                />}
            {password ? <MaterialCommunityIcons
                name={hidePassword ? 'eye-off' : 'eye'}
                style={styles.passwordIconStyle}
                onPress={() => setHidePassword(!hidePassword)}
            /> : null}

            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
};


const styles = StyleSheet.create({
    labelContainerStyle: {
        justifyContent: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: '-8%',
        marginLeft: '6%',
        marginBottom: '3%',
    },
    passwordIconStyle: {
        position: 'absolute',
        left: '85%',
        fontSize: 20,
        opacity: 0.5,
        color: 'white',
    },
    inputStyle: {
        textAlign: 'center',
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 15,
        marginVertical: '2%',
        shadowColor: 'transparent',
        color: 'white',
        opacity: 0.7,
        paddingHorizontal: '20%',
    },
    inputContainerStyle: {
        borderBottomWidth: 0,
    },
    labelStyle: {
        color: 'white',
        opacity: 0.8,
    },
});

export default CustomInput;
