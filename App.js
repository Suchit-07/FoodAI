import { StatusBar } from 'expo-status-bar';
import { TextInput, ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import AppButton from './components/AppButton'
import Input from './components/Input'
import { useState } from 'react';

export default function App() {
  const [ingredients, setIngredients] = useState([{ id: 1, value: '' }])
  const [response, setResponse] = useState({steps: []});

  function addIngredient(){
    if(ingredients[ingredients.length - 1].value){
      const newInput = {
        id: Date.now(),
        value: '',
      };
      setIngredients([...ingredients, newInput]);
    } else{
      alert('Please enter an ingredient before adding a new one.')
    }
  }

  function handleChange(id, value){
    const updatedInputs = ingredients.map((input) =>{
      if(input.id == id){
        return { ...input, value }
      } else{
        return input
      }
    })

    setIngredients(updatedInputs)
  }

  function handleRemoveInput(id){
    if(ingredients.length > 1){
      const updatedInputs = ingredients.filter((input) => input.id !== id);
      setIngredients(updatedInputs)
    }else{
      alert('You must have at least one ingredient')
    }
  }

  async function handleSubmit(){
    let prompt = ''
    ingredients.forEach(function(item) {
      prompt += (item.value + ' + ')
    });

    await fetch("http://192.168.68.79:8080/send", {
     
      // Adding method type
      method: "POST",
      
      // Adding body or contents to send
      body: JSON.stringify({
        "prompt": prompt,
      }),
      
      // Adding headers to the request
      headers: {
        "auth": "0UMsZXCygUiGlu43zUnPpmbfpYG1EePkYLr6Kie668p1zFkYON",
        "Content-type": "application/json"
      }
    
    })
    .then(response => response.json().then(json => {
      setResponse(json.response);
    }))
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.header}>Food AI</Text>
        <Text style={styles.text}>Ingredients</Text>

        {ingredients.map((input) => (
          <Input key = {input.id} style = {styles} input={input} onPress={handleRemoveInput} onChange={handleChange}/>
        ))}

        <AppButton onPress={addIngredient} children={'Add Ingredient'} style={styles.add_button} color={'#fff'}/>
        <AppButton style={styles.submit_button} children={'Submit'} size={20} color="white" onPress={handleSubmit}/>
        <View style={styles.response}>
          {response.name && <Text style={styles.respheader}>{response.name}</Text>}
          {!response.name && <Text style={styles.respheader}>Response</Text>}
          {Array.apply(0, Array(Object.keys(response.steps).length)).map(function (x, i) {
            return <Text key={i} style={styles.responsetxt}>{(i+1) + '. ' +response.steps[i]} </Text>;
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  responsetxt: {
    margin: 10
  },
  response: {
    width: '100%',
    height: '100%',
    backgroundColor: "white",
    margin: 20,
  },
  add_button: {
    textAlign: 'center',
    marginTop: 20,
    width: 320,
    height: 20,
    backgroundColor: 'blue',
    borderRadius: 5,
  },

  submit_button: {
    textAlign: 'center',
    marginTop: 20,
    width: "100%",
    height: 30,
    fontSize: 20,
    backgroundColor: 'green',
    borderRadius: 5,
  },

  button: {
    textAlign: 'center',
    backgroundColor: 'red',
    width: 20,
    color: '#fff',
    borderRadius: 5,
    marginTop: 10,
    height:25,
  },

  scrollView: {
    backgroundColor: '#000',
  },

  input_view: {
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text:{
    color: "#fff",
    fontSize: 20,
    marginTop: 30,
  },
  
  container: {
    backgroundColor: '#000',
    alignItems: 'center',
  },

  header : {
    color: '#fff',
    fontSize: 65,
    fontFamily: 'Cochin',
    marginTop: 100,
  },

  respheader : {
    marginBottom: 20,
    fontSize: 40,
    fontFamily: 'Cochin',
  },

  input:{
    width: 300,
    height:25,
    color: "#fff",
    borderColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 10,
  }
});
