import styled from 'styled-components/native'

export const Content = styled.View`
    padding: 20px;
`;

export const Row = styled.View`
    flex-direction: row;
`;

export const ImageDriver = styled.Image`
    width: 60px;
    height: 60px;
    border-radius: 30px;
`;

export const TextDriverName = styled.Text`
    margin: 15px;
    color: #E5E9F0; 
    font-family: 'Quicksand-Bold'; 
    font-size: 16px;
`;

export const Label = styled.Text`
    margin-top: 20px; 
    margin-bottom: 10px; 
    color: #E5E9F0; 
    font-family: 'Quicksand-Regular'; 
    font-size: 20px;
`;

export const Form = styled.View`
    flex-direction: row;
    align-self: stretch;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.2);
`;

export const FormInput = styled.TextInput.attrs({
    placeholderTextColor: '#E5E9F0',
})`
    flex: 1;
    font-size: 16px; 
    color: #E5E9F0; 
    align-self: stretch; 
    margin-left: 20px;
    font-family: 'Quicksand-Medium';
`;

export const ButtonSubmit = styled.TouchableOpacity`
    background-color: #1C2331; 
    flex: 1; 
    justify-content: center; 
    align-items: center; 
    border-radius: 30px; 
    padding: 15px;
    margin-top: 20px;
    elevation: 5;
`;

export const ButtonText = styled.Text`
    font-family: 'Quicksand-Medium'; 
    font-size: 16;
    color: #E5E9F0; 
    text-align: center;
`;