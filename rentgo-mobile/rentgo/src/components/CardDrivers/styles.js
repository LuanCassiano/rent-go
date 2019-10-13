import styled from 'styled-components/native'
import LinearGradient from 'react-native-linear-gradient'

export const Container = styled(LinearGradient).attrs({
    colors: ['#1C2331', '#384662'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 }
})`
    flex: 1;
    padding: 20px;
`;

export const Card = styled.TouchableOpacity`
    flex: 1;
    border-radius: 5px;
    background-color: #E5E9F0;
    margin: 20px 10px 10px 10px;
    elevation: 5;
    shadowOffset: {  width: 10;  height: 10  };
    shadowColor: #000000;
    shadowOpacity: 1.0;
`;

export const CardBody = styled.View`
    padding: 15px;
    flex-direction: row;
`;

export const Label = styled.Text`
    font-family: 'Quicksand-Regular';
    font-size: 20px;
    color: #E5E9F0;
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
    font-size: 20px;
    color: #1C2331;
    margin-left: 10px;
`;

export const CardText = styled.Text`
    font-family: 'Quicksand-Medium';
    font-size: 12px;
    color: #1C2331;
    margin-left: 10px;
`;

export const CardFooter = styled.View`
    flex-direction: row;
    padding: 15px;
    justify-content: space-between;
`;

export const Row = styled.View`
    flex-direction: row;
`;