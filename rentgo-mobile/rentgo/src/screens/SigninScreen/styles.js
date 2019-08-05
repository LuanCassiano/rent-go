import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

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
    width: 300px; 
    height: 250px;
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
    background-color: #FFFFFF;
    margin: 10px 0px 0px 0px;
    border-radius: 30px;
    border: 1px solid #1c2331;
`;

export const FormInput = styled.TextInput`
    font-size: 16px;
    color: #1C2331;
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
    margin: 20px 10px 20px 10px;
    background-color: #1c2331;
    border-radius: 30px;
    elevation: 5;
    box-shadow: 5px 5px 5px #BCBCBC;
`;

export const TextButton = styled.Text`
    font-size: 16px;
    color: #FFFFFF;
    text-align: center;
    font-family: 'Quicksand-Medium';
`;

export const Title = styled.Text`
    text-align: center;
    color: #1C2331;
    font-size: 16px;
    font-family: 'Quicksand-Bold';
`;

export const Href = styled.TouchableOpacity`
    margin: 10px 10px 10px 10px;
`;

export const TextHref = styled.Text`
    color: #1c2331;
    font-size: 14px;
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
    color: #ce2029;
    text-align: center;
    margin-top: 10px;
`;