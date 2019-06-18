import React, { useState, useEffect } from 'react';
import { Animated, AsyncStorage, StatusBar } from 'react-native';
// import api from '../../services/api';

import { 
    Container,
    ButtonSubmit,
    CardForm,
    Form,
    FormIcon,
    FormInput,
    Href,
    Row,
    TextButton,
    TextHref,
    Title,
    ErrorMessage
} from './styles';

export default function SigninScreen(props) {

    const [animation, setAnimation] = useState(new Animated.Value(0));
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const goToHome = () => {
        props.navigation.navigate('Home')
    }

    useEffect(() => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 3000
        }).start();
    }, []);

    // async function handleSignIn() {
    //     if(!email || !password) {
    //         setError('Informe seu e-mail e sua senha para continuar!');
    //         setTimeout(() => {
    //             setError('');
    //         }, 3000);
    //     } else {
    //         try {
    //             const response = await api.post('/api/authentication', {
    //                 email: email,
    //                 password: password
    //             });
    
    //             AsyncStorage.setItem('MyStoreToken', response.data.token);
    //             AsyncStorage.setItem('MyStoreUser', JSON.stringify(response.data.result))

    //             goToHome();
    //         } catch (error) {
    //             setError('Erro ao fazer login, verifique suas credenciais!');
    //             setTimeout(() => {
    //                 setError('');
    //             }, 3000);
    //         }
    //     }
    // }

    return (
        <Container>
            <StatusBar backgroundColor="#1c2331"/>
            <Title>RENT&#38;GO</Title>

            <Animated.View style={{opacity: animation}}>
                <CardForm>
                    <Title>Vamos lá!</Title>
                    <Form>
                        <FormIcon source={require('../../assets/img/email.png')}/>
                        <FormInput 
                            placeholder="Seu e-mail" 
                            placeholderTextColor="#1C2331"
                            autoCapitalize="none" 
                            autoCorrect={false} 
                            underlineColorAndroid="transparent" 
                            textContentType="emailAddress"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </Form>

                    <Form>
                        <FormIcon source={require('../../assets/img/lock.png')}/>
                        <FormInput 
                            placeholder="Sua senha" 
                            placeholderTextColor="#1C2331"
                            autoCapitalize="none" 
                            autoCorrect={false} 
                            underlineColorAndroid="transparent" 
                            secureTextEntry  
                            value={password}
                            onChangeText={setPassword}
                        />
                    </Form>

                    { !error ? (
                        null
                    ) : (
                        <ErrorMessage>{error}</ErrorMessage>
                    )}

                    <ButtonSubmit onPress={() => {}}>
                        <TextButton>Entrar</TextButton>
                    </ButtonSubmit>

                    <Row>
                        <Href>
                            <TextHref>Esqueci minha senha</TextHref>
                        </Href>
                        <Href onPress={() => {}}>
                            <TextHref>Criar uma conta</TextHref>
                        </Href>
                    </Row>
                </CardForm>
            </Animated.View>
        </Container>
    );
}