import styled from 'styled-components/native';

export const Content = styled.View`
    flex: 1;
    margin-top: 30px;
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
    margin-left: 15px;
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