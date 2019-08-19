import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
    justify-content: center; 
    background-color: rgba(0, 0, 0, 0.5);
    padding: 20px;
`;

export const Content = styled.View`
    align-items: stretch;
    align-self: stretch;
    background-color: #FFFFFF;
    border-radius: 10px;
    padding: 20px;
`;

export const ButtonCloseModal = styled.TouchableOpacity`
    align-items: flex-end;
`;

export const ButtonCloseModalIcon = styled.Image`
    width: 15px;
    height: 15px;
`;

export const Input = styled.TextInput`
    padding: 15px; 
    background-color: #FFFFFF; 
    border-radius: 5px;
    border: 1px solid #1C2331; 
    margin: 10px 0px 20px 0px;
    font-family: 'Quicksand-Regular';
    font-size: 16px;
`;

export const ButtonSubmit = styled.TouchableOpacity`
    padding: 15px;
    background-color: #1C2331; 
    border-radius: 30px;
    elevation: 5;
    box-shadow: 5px 5px 5px #BCBCBC;
`;

export const TextButton = styled.Text`
    text-align: center;
    color: #FFFFFF;
    font-family: 'Quicksand-Bold';
    font-size: 16px;
`;

export const ViewGeneric = styled.View`
    padding: 10px;
    flex-direction: row;
`;