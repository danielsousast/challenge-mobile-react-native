import styled from 'styled-components/native';
import { Dimensions, Platform } from 'react-native';
import colors from '../../styles/Colors';

const { width } = Dimensions.get('window');

export const Container = styled.Modal`
  flex: 1;
  padding-bottom: 30px;
`;

export const Content = styled.ScrollView`
  flex: 1;
  background: ${colors.background};
  padding-bottom: 20px;
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  justify-content: center;
  align-items: center;
  background: ${colors.white};
  width: 30px;
  height: 30px;
  border-radius: 15px;
  top: ${Platform.OS === 'ios' ? 50 : 20}px;
  right: 20px;
`;

export const Image = styled.ImageBackground`
  width: 100%;
  height: ${Platform.OS === 'ios' ? width : width * 0.8}px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

export const Name = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: #fff;

  text-transform: uppercase;
`;

export const StarButton = styled.TouchableOpacity``;

export const Description = styled.Text`
  color: #fff;
  margin: 20px;
`;

export const SectionTitle = styled.Text`
  color: ${colors.white};
  font-size: 20px;
  margin: 20px;
`;

export const Scroll = styled.ScrollView`
  padding-left: 20px;
  height: 150px;
  margin-bottom: 25px;
`;
