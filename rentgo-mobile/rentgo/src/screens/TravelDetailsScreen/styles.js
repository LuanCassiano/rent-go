import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: #FFFFFF;
`;

export const MapPointerContainer = styled.View`
    width: 10px;
    height: 10px;
    align-items: center;
    justify-content: center;
    background-color: #FFFFFF;
    border-radius: 5px;
`;

export const MapPointerFill = styled.View`
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #1C2331;
    transform: { scale: 0.8 };
`;