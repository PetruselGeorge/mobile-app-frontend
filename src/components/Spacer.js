import {View,StyleSheet} from "react-native"



const Spacer=({children})=>{
    return <View style={styles.spacerStyle}>{children}</View>
}

const styles=StyleSheet.create({
    spacerStyle:{
        marginHorizontal:10
    }

})

export default Spacer