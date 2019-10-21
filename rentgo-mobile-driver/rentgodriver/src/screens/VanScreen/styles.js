import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
    background-color: #FFFFFF;
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
    background-color: #384662;
`;

export const FabIcon = styled.Image`
    width: 20px; 
    height: 20px;
`;

export const ModalContainer = styled.View`
    flex: 1;
    justify-content: center; 
    background-color: rgba(0, 0, 0, 0.5);
    padding: 20px;
`;

export const ModalContent = styled.View`
    align-items: stretch;
    align-self: stretch;
    background-color: #FFFFFF;
    border-radius: 10px;
    padding: 20px;
`;

export const ButtonCloseModal = styled.TouchableOpacity`
    align-items: flex-end;
`;

export const Input = styled.TextInput`
    padding: 15px; 
    background-color: #E5E5E5; 
    border-radius: 5px;
    margin: 10px 0px 20px 0px;
    font-family: 'Quicksand-Regular';
    font-size: 16px;
    color: #000000;
`;

export const CardVanContainer = styled.TouchableOpacity`
    width: 100%;
    height: 100px;
    border-radius: 5px; 
    background-color: #384662; 
    margin-right: 20px; 
    padding: 20px; 
    elevation: 5;
`;

export const CardVanContent = styled.View`
    flex-direction: row;
`;

export const CardVanMedia = styled.Image`
    width: 60px;
    height: 60px; 
    border-radius: 30px;
`;

export const CardVanInfo = styled.View`
    margin: 0px 0px 0px 20px;
`;

export const H2 = styled.Text`
    font-family: 'Quicksand-Bold';
    font-size: 20px;
    color: #FFFFFF;
`;