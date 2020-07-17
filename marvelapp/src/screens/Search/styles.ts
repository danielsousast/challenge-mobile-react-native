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

export const InputView = styled.View`
  height: 50px;
  width: 100%;
  margin: 30px;
  padding: 0 10px;
  border-radius: 25px;
  align-self: center;
  background: ${colors.dark};
  font-size: 16px;
  flex-direction: row;
  align-items: center;
`;

export const Input = styled.TextInput`
  height: 50px;
  width: 90%;
  padding: 0 18px;
  color: #ccc;
  font-size: 16px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  color: ${colors.white};
  margin-bottom: 20px;
`;
