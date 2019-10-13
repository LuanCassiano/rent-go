import styled from 'styled-components/native'
import LinearGradient from 'react-native-linear-gradient'

export const Container = styled(LinearGradient).attrs({
    colors: ['#1C2331', '#384662'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 }
})`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const Logo = styled.Image`
    width: 100px; 
    height: 100px;
`;

export const CardForm = styled.View`
    margin: 20px 30px 20px 30px;
    background-color: #FFFFFF;
    border-radius: 10px;
    padding: 20px;
    align-self: stretch;
`;

export const Form = styled.View`
    flex-direction: row;
    align-self: stretch;
    background-color: rgba(0, 0, 0, 0.2);
    margin: 10px 20px 0px 20px;
    border-radius: 5px;
`;

export const FormInput = styled.TextInput`
    font-size: 16px;
    color: #E5E9F0;
    align-self: stretch;
    flex: 1;
    font-family: 'Quicksand-Medium';
`;

export const FormIcon = styled.Image`
    width: 15px;
    height: 15px;
    padding: 10px;
    margin: 15px 15px 15px 15px;
`;

export const ButtonSubmit = styled.TouchableOpacity`
    padding: 15px;
    align-self: stretch;
    margin: 20px 20px 20px 20px;
    background-color: #1c2331;
    border-radius: 30px;
    elevation: 5;
    box-shadow: 5px 5px 5px #BCBCBC;
`;

export const TextButton = styled.Text`
    font-size: 16px;
    color: #E5E9F0;
    text-align: center;
    font-family: 'Quicksand-Medium';
`;

export const Title = styled.Text`
    text-align: center;
    color: #E5E9F0;
    font-size: 18px;
    font-family: 'Quicksand-Bold';
`;

export const Href = styled.TouchableOpacity`
    margin: 10px 10px 10px 10px;
`;

export const TextHref = styled.Text`
    color: #E5E9F0;
    font-size: 16px;
    text-align: center;
    font-family: 'Quicksand-Regular';
`;

export const Row = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const ErrorMessage = styled.Text`
    font-family: 'Quicksand-Bold';
    font-size: 16px;
    color: #FFFFFF;
    text-align: center;
`;

export const ModalContainer = styled.View`
    flex: 1; 
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: rgba(0, 0, 0, .6);
`;

export const ModalContent = styled.View`
    align-items: stretch; 
    align-self: stretch;
    background-color: #D32F2F;
    border-radius: 10px; 
    padding: 20px;
`;

export const ModalTitle = styled.Text`
    font-size: 20px; 
    font-family: 'Quicksand-Bold'; 
    color: #FFFFFF;
    text-align: center;
`;