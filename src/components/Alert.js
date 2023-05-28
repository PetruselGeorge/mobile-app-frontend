import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Alert = ({ title, message, actions }) => {
    return (
        <View style={styles.alertContainer}>
            <Text style={styles.alertTitle}>{title}</Text>
            <Text style={styles.alertMessage}>{message}</Text>
            <View style={styles.alertActionsContainer}>
                {actions.map((action, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={action.onPress}
                        style={styles.alertButton}
                    >
                        <Text style={styles.alertButtonText}>{action.text}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    alertContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    alertTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    alertMessage: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    alertActionsContainer: {
        flexDirection: 'row',
    },
    alertButton: {
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        backgroundColor: '#fff',
    },
    alertButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
});

export default Alert;
