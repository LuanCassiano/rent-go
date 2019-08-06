import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: #FFFFFF;
`;

export const SideHeader = styled.View`
    height: 200px;
    background-color: #1C2331;
    justify-content: center;
`;

export const SideHeaderContent = styled.View`
    flex-direction: row;
    padding: 20px;
`;

export const SideHeaderImage = styled.Image`
    width: 80px;
    height: 80px;
    border-radius: 40px;
    background-color: #FFFFFF;
`;

export const SideHeaderInfo = styled.View`
    width: 0;
    flex-grow: 1;
    margin-left: 20px;
    margin-top: 15px;
`;

export const SideHeaderUsername = styled.Text`
    font-family: 'Quicksand-Regular';
    font-size: 20px;
    color: #FFFFFF;
`;

export const SideHeaderUserRating = styled.Text`
    font-family: 'Quicksand-Regular';
    font-size: 16px;
    color: #FFFFFF;
`;

export const SideBody = styled.View`
    padding: 20px;
`;