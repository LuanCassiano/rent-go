import styled from 'styled-components/native'
import LinearGradient from 'react-native-linear-gradient'

export const Container = styled.View`
    flex: 1;
    background-color: #FFFFFF;
`;

export const LogoBackground = styled.ImageBackground`
    width: 100%;
    height: 300px;
`;

export const LogoBackgroundGradient = styled(LinearGradient).attrs({
    colors: ['rgba(255, 255, 255, .7)', 'rgba(255, 255, 255, .7)'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 }
})`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 300px;
    opacity: 0.6;
`;

export const LogoBackgroundContent = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    z-index: 9999;
`;

export const ImageProfile = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 50px;
`;

export const TextProfileName = styled.Text`
    color: #1C2331; 
    margin-top: 10px; 
    font-size: 20px; 
    font-family: 'Quicksand-Bold';
`;

export const ViewProfileTravelContainer = styled.View`
    padding: 20px;
    background-color: #384662;
`;

export const ViewProfileTravelContent = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const IconTravelInfo = styled.Image`
    width: 40px;
    height: 40px;
`;

export const TextTravelInfo = styled.Text`
    font-family: 'Quicksand-Medium';
    font-size: ${props => props.count === true ? 16 : 14};
    color: #FFFFFF;
`;

export const ViewUserInfoContainer = styled.View`
    padding: 20px;
`;

export const ViewContentInfo = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const TextInfo = styled.Text`
    font-family: 'Quicksand-Medium'; 
    font-size: 14px; 
    color: #1C2331;
`;

export const Divider = styled.View`
    border: 1px solid #E5E5E5;
    margin-top: 20px;
    margin-bottom: 20px;
`;