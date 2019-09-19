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
    background-color: #E5E9F0;
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
    background-color: #E5E9F0; 
    border-radius: 5px;
    margin: 10px 0px 20px 0px;
    border: 1px solid #1C2331;
    font-family: 'Quicksand-Regular';
    font-size: 16px;
    color: #1C2331;
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
    color: #E5E9F0;
    font-family: 'Quicksand-Bold';
    font-size: 16px;
`;

export const ViewGeneric = styled.View`
    padding: 10px;
    flex-direction: row;
`;

export const Fab = styled.TouchableOpacity`
    elevation: 5; 
    position: absolute; 
    width: 60px; 
    height: 60px; 
    border-radius: 30px; 
    align-items: center; 
    justify-content: center; 
    right: 20;
    bottom: 30; 
    background-color: #E5E9F0;
`;

export const FabIcon = styled.Image`
    width: 20px; 
    height: 20px;
`;