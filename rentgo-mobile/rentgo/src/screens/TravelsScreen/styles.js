import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
    background-color: #FFFFFF;
`;

export const Content = styled.ScrollView`
    padding: 10px;
`;

export const Title = styled.Text`
    font-family: 'Quicksand-Regular';
    font-size: 20px;
    color: #1C2331;
    text-transform: uppercase;
    margin-left: 10px;
    margin-top: 10px;
`;

export const CardTravel = styled.TouchableOpacity`
    flex: 1;
    border-radius: 5px;
    background-color: #1C2331;
    margin: 20px 10px 20px 10px;
    elevation: 5;
    box-shadow: 5px 5px 5px #BCBCBC;
`;

export const CardTravelBody = styled.View`
    padding: 20px;
`;

export const CardTravelDetailsOrigem = styled.View`
    flex-direction: row; 
    margin-bottom: 20px;
`;

export const CardTravelDetailsDestiny = styled.View`
    flex-direction: row;
    margin-bottom: 20;
`;

export const Label = styled.Text`
    font-family: 'Quicksand-Regular'; 
    font-size: 12px; 
    color: #FFFFFF;
`;

export const TextInfo = styled.Text`
    font-family: 'Quicksand-Bold'; 
    font-size: 12px;
    color: #FFFFFF;
`;

export const Divider = styled.View`
    border: 0.5px solid #FFFFFF;
    margin-bottom: 10px;
`;

export const CardTravelFooter = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;