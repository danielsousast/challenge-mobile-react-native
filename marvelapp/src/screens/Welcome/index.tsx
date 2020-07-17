import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Background,
  Button,
  ButtonText,
  Content,
  Label,
  Title,
} from './styles';

const Welcome: React.FC = () => {
  const navigation = useNavigation();

  const handleNavigation = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  return (
    <Container>
      <Background source={require('../../assets/background.jpg')}>
        <Content>
          <Title>É um fã da Marvel?</Title>
          <Label>Que tal ter todos personagens na palma da mão</Label>
          <Button onPress={handleNavigation}>
            <ButtonText>Vamos lá</ButtonText>
          </Button>
        </Content>
      </Background>
    </Container>
  );
};

export default Welcome;
