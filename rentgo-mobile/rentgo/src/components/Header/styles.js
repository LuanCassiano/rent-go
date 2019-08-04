import styled from 'styled-components/native';

export const Container = styled.View`
    padding: 20px;
    background-color: #1C2331;
`;

export const Content = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const HeaderActionButton = styled.TouchableOpacity`
    width: 30;
    height: 30;
    margin: 20px 20px 0px 10px;
`;

export const HeaderActionButtonIcon = styled.Image`
    width: 30; 
    height: 30;
`;

export const Title = styled.Text`
    margin-top: 20px;
    margin-right: 50px;
    color: #FFF;
    font-family: 'Quicksand-Bold';
    text-align: center;
    font-size: 20px;
`;