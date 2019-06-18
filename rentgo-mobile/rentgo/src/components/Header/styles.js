import { Platform } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
    height: ${Platform.OS === "ios" ? 80 : 60 };
    padding-top: 5px;
    background-color: #1C2331;
`;

export const Content = styled.View`
    height: ${Platform.OS === "ios" ? 80 : 50 };
    flex-direction: row;
    align-items: center;
`;

export const Title = styled.Text`
    flex: 1;
    color: #FFF;
    font-family: 'Quicksand-Bold';
    text-align: center;
    font-size: 20px;
`;

export const HeaderActionButton = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
`;

export const HeaderActionButtonIcon = styled.Image`
    width: 20px;
    height: 20px;
    margin: 15px;
`;

export const ButtonImageProfile = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    margin-right: 10px;
`;

export const ImageProfile = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 25px;
`;

export const ViewGeneric = styled.View`
    width: 50px;
    height: 50px;
`;