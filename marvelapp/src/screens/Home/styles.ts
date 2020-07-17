import styled from 'styled-components/native';
import { Platform } from 'react-native';
import colors from '../../styles/Colors';

export const Container = styled.View`
  flex: 1;
  background: ${colors.background};
  padding-top: ${Platform.OS === 'ios' ? 40 : 10}px;
  padding-left: 30px;
  padding-right: 30px;
`;

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

  width: 100%;
`;

export const Banner = styled.View`
  height: 200px;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 30px;
`;

export const BannerImage = styled.Image`
  height: 200px;
  width: 100%;
  border-radius: 10px;
`;

export const SectionTitle = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
`;
