import styled from 'styled-components/native'

export const Container = styled.ScrollView`
    flex: 1;
    background-color: #E5E5E5;
`;

export const ViewGeneric = styled.View`
    padding: 20px;
`;

export const Label = styled.Text`
    font-family: 'Quicksand-Regular';
    font-size: 20px;
    color: #384662;
    text-transform: uppercase;
    margin-bottom: 20px;
`;

export const Section = styled.View`
    background-color: #FFFFFF; 
    padding: 20px; 
    margin-bottom: 20px;
`;

export const Row = styled.View`
    flex-direction: row;
`;

export const CardInfo = styled.View`
    width: 45%; 
    height: 200px; 
    background-color: #384662;
    margin-right: 30px; 
    padding: 20px;
    border-radius: 5px;
`;

export const ViewCenter = styled.View`
    align-items: center;
`;

export const CardInfoMedia = styled.Image`
    width: 50px;
    height: 50px;
`;

export const CardInfoContent = styled.View`
    margin-top: 20px;
`;

export const Paragraph = styled.Text`
    text-align: center;
    color: #FFFFFF; 
    font-family: 'Quicksand-Bold'; 
    font-size: 16px;
    margin-top: ${props => props.isMargin === true ? 20 : 0};
`;