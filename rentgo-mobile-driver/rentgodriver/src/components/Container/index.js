import styled from 'styled-components/native'
import LinearGradient from 'react-native-linear-gradient'

export default styled(LinearGradient).attrs({
    colors: ['#FFFFFF', '#FFFFFF'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 }
})`
    flex: 1;
    padding-top: ${props => props.noPadding === false ? 0 : 20};
    padding-bottom: ${props => props.noPadding === false ? 0 : 20};
    padding-left: ${props => props.noPadding === false ? 0 : 20};
    padding-right: ${props => props.noPadding === false ? 0 : 20};
`;