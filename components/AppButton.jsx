import { TouchableOpacity, Text, StyleSheet} from "react-native";

export default function AppButton({children,style,onPress, color, size}) {
    const styles = StyleSheet.create({
        button: {
            alignContent: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            alignItems: 'center',
            color: color,
            fontSize: size,
        },
    })
    
    return (
        <TouchableOpacity onPress={onPress} style={style}>
         <Text
           style={styles.button} >
           {children}
         </Text>
        </TouchableOpacity>
      );
}