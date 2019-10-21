import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
    background-color: #FFFFFF;
`;

export const ViewGeneric = styled.View`
    padding: 20px;
`;

export const ViewTripInfoContent = styled.View`
    flex-direction: column; 
    justify-content: space-between;
`; 

export const ViewTripContent2 = styled.View`
    flex-direction: row; 
    justify-content: space-between;
`;

export const Label = styled.Text`
    font-family: 'Quicksand-Bold';
    font-size: 16px;
    color: #E5E9F0;
`;

export const Span = styled.Text`
    font-family: 'Quicksand-Medium'; 
    font-size: 14px;
    color: #E5E9F0;
`;

export const Divider = styled.View`
    border: 1px solid #E5E9F0;
    margin: 20px 0px 20px 0px;
`;