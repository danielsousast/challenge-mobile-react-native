import styled from 'styled-components/native';
import { Platform } from 'react-native';
import colors from '../../styles/Colors';

export const Container = styled.View`
  flex: 1;
  background: ${colors.background};
  padding-top: ${Platform.OS === 'ios' ? 40 : 10}px;
  padding-bottom: ${Platform.OS === 'ios' ? 40 : 0}px;
  padding-left: 20px;
  padding-right: 20px;
`;

export const ScrollContainer = styled.ScrollView``;

export const Header = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-top: 10px;
`;

export const Logo = styled.Image`
  height: 50px;
  margin-bottom: 20px;
  width: 100%;
`;

export const Scroll = styled.ScrollView`
  padding-bottom: 10px;
`;

export const SectionRow = styled.View`
  width: 100%;
  flex-direction: row;
  align-self: center;
  margin-top: 20px;
  margin-bottom: 20px;
  justify-content: space-between;
`;

export const DetailsButton = styled.TouchableOpacity``;

export const DetailsButtonText = styled.Text`
  font-size: 14px;
  color: #ccc;
`;

export const SectionTitle = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;
