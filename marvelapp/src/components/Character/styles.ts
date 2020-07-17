import styled from 'styled-components/native';
import colors from '../../styles/Colors';

export const Container = styled.TouchableOpacity`
  width: 100%;
  margin-bottom: 20px;
  border-radius: 10px;
  overflow: hidden;
  flex-direction: row;
  background: #1d232b;
`;

export const Image = styled.Image`
  height: 130px;
  width: 100px;
`;

export const Info = styled.View`
  background: #1d232b;
  height: 130px;
  width: 100%;
  padding: 10px;
`;

export const Name = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  flex-wrap: wrap;
  width: 250px;
`;

export const Description = styled.Text`
  color: #ccc;
  width: 200px;
  height: 60px;
  margin-top: 10px;
  margin-right: 10px;
`;
