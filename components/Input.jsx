import { TextInput,View} from 'react-native';
import AppButton from './AppButton'

export default function Input({style, input, onPress, onChange}) {
    return (
        <View style={style.input_view}>
          <TextInput onChangeText = {(text) => onChange(input.id, text)} style={style.input} value={input.value ?? ''}/>
          <AppButton onPress={() => onPress(input.id)} children={'x'} style = {style.button} color={'#fff'}/>
        </View>
    )
}