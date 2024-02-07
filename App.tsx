import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

// Form Validation

import * as Yup from 'yup'
import { Formik } from 'formik'

import BouncyCheckbox from 'react-native-bouncy-checkbox'

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
  .min(6, 'Should have atleast 6 characters')
  .max(16, 'Password length must be less than 16')
  .required('Mandatory Field'),
})

export default function App() {

  const [password, setPassword] = useState('')
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false)

  const [lowerCase, setLowerCase] = useState(true)
  const [upperCase, setUpperCase] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)

  const generatePasswordString = (passwordLength: number) => {
    
    let characterList = ''
  
    const upperCaseCharacter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowerCaseCharacter = 'abcdefghijklmnopqrstuvwxyz'
    const numbersCharacter = '0123456789'
    const symbolsCharacter = '!@#$%^&*()_+'
  
    if(upperCase) {
      characterList += upperCaseCharacter
    }
    if(lowerCase) {
      characterList += lowerCaseCharacter
    }
    if(numbers) {
      characterList += numbersCharacter
    }
    if(symbols) {
      characterList += symbolsCharacter
    }

    const passwordResult = createPassword(characterList, passwordLength)

    setPassword(passwordResult)
    setIsPasswordGenerated(true)
  }

  const createPassword = (characters: string, passwordLength: number) => {
  
    let generatedPassword = ''
  
    for (let i=0; i<passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length)
      generatedPassword += characters.charAt(characterIndex)
    }

    return generatedPassword
  }

  const resetPasswordState = () => {
    setPassword('')
    setIsPasswordGenerated(false)
    setLowerCase(true)
    setUpperCase(false)
    setNumbers(false)
    setSymbols(false)


  }

  return (
    <ScrollView keyboardShouldPersistTaps={'handled'}>
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
       initialValues={{ passwordLength: '' }}
        validationSchema={PasswordSchema}
       onSubmit={(values) => {
        console.log(values)
        generatePasswordString(Number(values.passwordLength))
       }}
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         handleReset
         /* and other goodies */
       }) => (
          <>
            <View style={styles.inputWrapper}>
              <View style={styles.inputColumn}>
                <Text style={styles.heading}>Password Length</Text>
                {touched.passwordLength && errors.passwordLength && (<Text style={styles.errorText}>{errors.passwordLength}</Text>)}
                
              </View>
              <TextInput style={styles.inputStyle}
                value={values.passwordLength}
                onChangeText={handleChange('passwordLength')}
                placeholder='Ex. 8'
                keyboardType='numeric' 

                />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.heading}>Include LowerCase</Text>
              <BouncyCheckbox 
              disableBuiltInState
              isChecked={lowerCase}
              onPress={() => setLowerCase(!lowerCase)}
              fillColor='#29AB87'
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.heading}>Include UpperCase</Text>
              <BouncyCheckbox 
              disableBuiltInState
              isChecked={upperCase}
              onPress={() => setUpperCase(!upperCase)}
              fillColor='#FED85D'
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.heading}>Include Numbers</Text>
              <BouncyCheckbox 
              disableBuiltInState
              isChecked={numbers}
              onPress={() => setNumbers(!numbers)}
              fillColor='#C9A0DC'
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.heading}>Include Symbols</Text>
              <BouncyCheckbox 
              disableBuiltInState
              isChecked={symbols}
              onPress={() => setSymbols(!symbols)}
              fillColor='#FC80A5'
              />
            </View>
            <View style={styles.inputWrapper}></View>
            <View style={styles.inputWrapper}></View>
            <View style={styles.inputWrapper}></View>

            <View style={styles.formActions}>
              <TouchableOpacity 
              disabled={!isValid}
              style={styles.primaryButton}
              onPress={handleSubmit}
              >
                <Text style={styles.primaryButtonText}>Generate Password</Text>
              </TouchableOpacity>
              <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => {
                handleReset()
                resetPasswordState
              }}
              >
                <Text style={styles.secondaryButtonText}>Reset</Text>
              </TouchableOpacity>
            </View>
          </>
       )}
          </Formik>
        </View>
        {isPasswordGenerated ? (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style = {styles.subtitle}>Result:</Text>
            <Text style = {styles.description}>Long Press to Copy</Text>
            <Text selectable={true} style={styles.generatePassword}>{password}</Text>
          </View>
        ): null}
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1
  },
  formContainer: {
    margin: 8,
    padding: 8
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15
  },
  subtitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2
  },
  description: {
    marginBottom: 8,
  
  },
  heading: {
    fontSize: 15
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  inputColumn: {
    flexDirection: 'column'
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#16213E'
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10'
  },
  primaryButton: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5D83FA'
  },
  primaryButtonText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: '700'
  },
  secondaryButton: {
    width: 120,
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
    alignItems: 'center',
    justifyContent: 'center'
  },
  secondaryButtonText: {
    textAlign: 'center'
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12
  },
  cardElevated: {
    backgroundColor: '#FAC42F',
    elevation: 3,
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowColor: '#333',
    shadowOpacity: 0.4,
    shadowRadius: 2
  },
  generatePassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color: '#000000'
  }
})