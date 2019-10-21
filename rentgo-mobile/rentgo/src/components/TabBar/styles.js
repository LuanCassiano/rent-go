import styled from 'styled-components/native';

export const Container = styled.View`
    background-color: #1C2331;
    height: 50px;
`;

export const Content = styled.View`
    height: 50px;
    flex-direction: row;
`;

export const Tab = styled.TouchableOpacity`
    flex: 1;
    flex-direction: column;
    align-items: center;
`;

export const TabText = styled.Text`
    font-size: 12px;
    margin-bottom: 10px;
    font-family: ${props => props.isActive === true ? 'Quicksand-Bold' : 'Quicksand-Regular'};
    color: ${props => props.isActive === true ? '#E5E9F0' : '#384662'};
`;

export const TabIcon = styled.Image`
    width: 25px;
    height: 25px;
    margin: 5px 5px 0px 5px;
`;