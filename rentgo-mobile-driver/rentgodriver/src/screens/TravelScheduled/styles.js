import styled from 'styled-components/native'

export const Title = styled.Text`
    font-family: 'Quicksand-Regular';
    font-size: 20px;
    color: #384662;
    text-transform: uppercase;
    margin-left: 10px;
    margin-top: 10px;
`;

export const CardTravel = styled.TouchableOpacity`
    flex: 1;
    border-radius: 5px;
    background-color: #384662;
    margin: 20px 10px 20px 10px;
    elevation: 5;
    shadowOffset: {  width: 10;  height: 10  };
    shadowColor: #000000;
    shadowOpacity: 1.0;
    box-shadow: 5px 5px 5px #BCBCBC;
`;

export const CardTravelBody = styled.View`
    padding: 20px;
`;

export const CardTravelDetailsOrigem = styled.View`
    flex-direction: column; 
    margin-bottom: 20px;
`;

export const CardTravelDetailsDestiny = styled.View`
    flex-direction: column;
    margin-bottom: 20px;
`;

export const Label = styled.Text`
    font-family: 'Quicksand-Regular'; 
    font-size: 12px; 
    color: #E5E9F0;
`;

export const TextInfo = styled.Text`
    font-family: 'Quicksand-Bold'; 
    font-size: 12px;
    color: #E5E9F0;
`;

export const Divider = styled.View`
    border: 0.5px solid #E5E9F0;
    margin-bottom: 10px;
`;

export const CardTravelFooter = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;