import styled from 'styled-components/native';

export const Container = styled.ScrollView`
    flex: 1;
    background-color: #FFFFFF;
`;

export const DriverProfileImage = styled.ImageBackground`
    width: 100%;
    height: 300px;
`;

export const ViewGeneric = styled.View`
    padding: 20px;
`;

export const Row = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 60px;
`;

export const ContentInfo = styled.View`
    flex-direction: row;
`;

export const Icon = styled.Image`
    width: 40px;
    height: 40px;
`;

export const Label = styled.Text`
    font-family: 'Quicksand-Medium'; 
    font-size: 22;
    color: #1C2331; 
    margin-top: 10;
    margin-left: 10;
`;

export const ContentDetails = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const TextInfo = styled.Text`
    font-family: 'Quicksand-Medium'; 
    font-size: 16;
    color: #1C2331; 
`;

export const Divider = styled.View`
    border: 1px solid #E5E5E5;
    margin-top: 20px;
    margin-bottom: 20px;
`;

export const ActionButton = styled.TouchableOpacity`
    align-self: stretch;
    background-color: #1C2331;
    padding: 15px;
    border-radius: 30px;
    margin-top: 30px;
    elevation: 5;
    box-shadow: 5px 5px 5px #BCBCBC;
`;

export const ActionButtonText = styled.Text`
    font-family: 'Quicksand-Medium'; 
    font-size: 16;
    color: #FFFFFF; 
    text-align: center;
`;