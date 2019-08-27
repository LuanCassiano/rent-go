import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
`;

export const CardVanContainer = styled.TouchableOpacity`
    width: 250px;
    height: 100px;
    border-radius: 5px; 
    background-color: #384662; 
    margin-right: 20px; 
    padding: 20px; 
    elevation: 5; 
    margin-bottom: 20px;
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

export const CardTripContainer = styled.TouchableOpacity`
    width: 300px;
    height: 150px; 
    border-radius: 5px; 
    background-color: #384662; 
    margin-right: 10px; 
    elevation: 5; 
    margin-bottom: 20px;
`;

export const CardTripContent = styled.View`
    padding: 20px;
`;

export const CardTripInfo = styled.View`
    flex-direction: column;
`;

export const Label = styled.Text`
    font-family: 'Quicksand-Bold';
    font-size: 16px;
    color: #FFFFFF;
`;

export const H4 = styled.Text`
    font-family: 'Quicksand-SemiBold';
    font-size: 14px;
    color: #FFFFFF;
    margin-bottom: 20px;
`;