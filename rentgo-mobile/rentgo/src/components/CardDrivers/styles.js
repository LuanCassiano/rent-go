import styled from 'styled-components/native'

export const Container = styled.View`
    padding: 10px;
`;

export const Card = styled.View`
    flex: 1;
    border-radius: 5px;
    border: 1px solid #1C2331;
    margin: 20px 10px 10px 10px;
`;

export const CardBody = styled.View`
    padding: 15px;
    flex-direction: row;
`;

export const Label = styled.Text`
    font-family: 'Quicksand-Regular';
    font-size: 20px;
    color: #1C2331;
    margin-left: 10px;
    margin-top: 10px;
    text-transform: uppercase;
`;

export const CardImage = styled.Image`
    width: 50px; 
    height: 50px; 
    border-radius: 25px;
`;

export const ViewInfo = styled.View`
    width: 0; 
    flex-grow: 1; 
    margin-left: 10px;
`;

export const CardTitle = styled.Text`
    font-family: 'Quicksand-Medium';
    font-size: 12px;
    color: #1C2331;
`;

export const CardText = styled.Text`
    font-family: 'Quicksand-Medium';
    font-size: 12px;
    color: #1C2331;
    margin-top: 10px;
`;

export const CardFooter = styled.View`
    align-items: center;
`;

export const CardAction = styled.TouchableOpacity`
    align-self: stretch;
    padding: 10px; 
    background-color: #1C2331; 
    border-radius: 30px;
    margin: 10px;
`;

export const CardActionText = styled.Text`
    font-family: 'Quicksand-Medium';
    font-size: 12px;
    color: #FFFFFF;
    text-align: center;
`;