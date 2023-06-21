import { SafeAreaView, ScrollView, StyleSheet, Text, View,TouchableOpacity, TextInput } from 'react-native'
import React,{useState} from 'react'
import * as Yup from 'yup'
import {Formik} from 'formik'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

const PasswordSchema = Yup.object().shape({
  passwordLength : Yup.number().min(4,'Should be minimum 4 characters long').max(16,'Should be maximum 16 characters long').required()
})

export default function App() {

  const [Password,setPassword] = useState('')

  const [isPassGenerated,setisPassGenerated] = useState(false)

  const [LowerCase,setLowerCase] = useState(true)
  const [UpperCase,setUpperCase] = useState(false)
  const [Number,setNumber] = useState(false)
  const [Symbol,setSymbol] = useState(false)

  const generatePasswordString = (passwordLength : number) => {
    let CharacterList = ''

    const LowerCaseChars = "abcdefghijklmnopqrstuvwxyz"
    const UpperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const Digits = "0123456789"
    const SpecialChars = "~!@#$%^&*()_+<>?|/"

    if (LowerCase) {
      CharacterList += LowerCaseChars;
    }

    if (UpperCase) {
      CharacterList += UpperCaseChars
    }

    if(Number) {
      CharacterList += Digits
    }

    if(Symbol) {
      CharacterList += SpecialChars
    }

    const PasswordResult = createPassword(CharacterList,passwordLength
    )

    setPassword(PasswordResult)
    setisPassGenerated(true)
    
  }

  const createPassword = (characters: string,passwordLength : number) => {
    let result = ''
    for (let i = 0 ; i < passwordLength ; i++){
      const characterIndex = Math.round(Math.random() * characters.length)
      result = result + characters.charAt(characterIndex)
    }
    return result
  }

  const resetPassword = () => {
    setPassword('')
    setisPassGenerated(false)
    setLowerCase(true)
    setUpperCase(false)
    setNumber(false)
    setSymbol(false)
  }


  return (
    <ScrollView keyboardShouldPersistTaps = "handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
       initialValues={{ passwordLength : ''}}
       validationSchema={PasswordSchema}
       onSubmit={values => {
        console.log(values);
        generatePasswordString(+values.passwordLength)
      }}
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleSubmit,
         handleReset
         /* and other goodies */
       }) => (
         <>
         <View style={styles.inputWrapper}>
         <View style={styles.inputColumn}>
          <Text style={styles.heading}>Password Length</Text>
          {touched.passwordLength && errors.passwordLength && (
            <Text style={styles.errorText}>{errors.passwordLength}</Text>
          )}
          
         </View>
         <TextInput
          style={styles.inputStyle}
          value={values.passwordLength}
          onChangeText={handleChange("passwordLength")}
          placeholder='Ex .10'
          keyboardType='numeric'
          />
         </View>
         <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include LowerCase</Text>
          <BouncyCheckbox 
          disableBuiltInState
          isChecked={LowerCase}
          onPress={() => setLowerCase(!LowerCase)}
          fillColor='#29AB87'
          />
         </View>
         <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include UpperCase</Text>
          <BouncyCheckbox 
          disableBuiltInState
          isChecked={UpperCase}
          onPress={() => setUpperCase(!UpperCase)}
          fillColor='#E03B8B'
          />
         </View>
         <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include Numbers</Text>
          <BouncyCheckbox 
          disableBuiltInState
          isChecked={Number}
          onPress={() => setNumber(!Number)}
          fillColor='#FF6666'
          />
         </View>
         <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include Symbols</Text>
          <BouncyCheckbox 
          disableBuiltInState
          isChecked={Symbol}
          onPress={() => setSymbol(!Symbol)}
          fillColor='#8D3DAF'
          />
         </View>

         <View style={styles.formActions}>
          <TouchableOpacity disabled={!isValid} style={styles.primaryBtn} onPress={handleSubmit}>
            <Text style={styles.primaryBtnTxt}>Generate Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryBtn} onPress={() => {
            handleReset();
            resetPassword()
          }}>
            <Text style={styles.secondaryBtnTxt}>Reset</Text>
          </TouchableOpacity>
         </View>

         </>
       )}
          </Formik>
        </View>
        {isPassGenerated ? (
          <View style={[styles.card , styles.cardElevated]}>
            <Text style={styles.subTitle}>Result : </Text>
            <Text style={styles.description}>Long Press to Copy</Text>
            <Text style={styles.generatedPassword} selectable={true}>{Password}</Text>
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 20,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#758283',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
    fontWeight : "bold",
    color : "#FFF"
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#000'
  },
}); 