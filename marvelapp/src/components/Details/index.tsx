import React, { useEffect, useState, useCallback, useRef } from 'react';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import { useDispatch, useStore } from 'react-redux';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import Card from '../Card';
import colors from '../../styles/Colors';
import { addFavorite, delFavorite } from '../../store/actions/AppActions';
import Loading from '../Loading';
import {
  Container,
  Image,
  Content,
  Name,
  SectionTitle,
  Scroll,
  BackButton,
  Description,
  Header,
  StarButton,
  CardItemsView,
  CardItem,
  CardItemLabel,
  Cover,
  NavButton,
  NavButtonText,
  ScrollContent,
} from './styles';

interface DetailsProps {
  visible: boolean;
  item:
    | {
        id: string;
        name: string;
        description: string;
        thumbnail: {
          path: string;
          extension: string;
        };
      }
    | undefined;
  closeModal(): void;
}

interface ItemData {
  id: string;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

interface CardData {
  id: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

const Details: React.FC<DetailsProps> = ({ visible, item, closeModal }) => {
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const store = useStore();

  const modalRef = useRef(null);

  useEffect(() => {
    if (item) {
      const list: [ItemData] = store.getState().app.favorites;
      const findCharacter = list.find(favorite => favorite.id === item.id);

      if (findCharacter) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
  }, [item, store]);

  useEffect(() => {
    StatusBar.setHidden(true);
  }, []);

  const toogleFavorite = useCallback(
    async character => {
      const list: [ItemData] = store.getState().app.favorites;

      const findItem = await list.find(
        favorite => favorite.id === character.id,
      );

      if (findItem) {
        dispatch(delFavorite(character.id));

        setIsFavorite(false);

        return;
      }

      dispatch(addFavorite(character));
      setIsFavorite(true);
    },
    [dispatch, store],
  );

  const handleGoBack = useCallback(() => {
    StatusBar.setHidden(false);
    closeModal();
  }, []);

  const handleNavigation = useCallback(param => {
    closeModal();
    navigation.navigate('MoreDetails', { item: param });
  }, []);

  return (
    <Container visible={visible} animationType="slide" ref={modalRef}>
      <ScrollContent
        contentContainerStyle={{
          justifyContent: 'center',
        }}
      >
        <Content>
          <BackButton onPress={handleGoBack}>
            <Icon name="arrowleft" color={colors.primary} size={26} />
          </BackButton>
          {item && (
            <>
              <Cover>
                <Image
                  source={{
                    uri: `${item.thumbnail.path}.${item.thumbnail.extension}`,
                  }}
                />
                <StarButton onPress={() => toogleFavorite(item)}>
                  <Icon
                    name={isFavorite ? 'star' : 'staro'}
                    size={38}
                    color={colors.primary}
                  />
                </StarButton>
              </Cover>

              <Header>
                <Name>{item.name}</Name>
              </Header>

              <Description>
                {item.description ||
                  'Fictional character that appears in American comics published by Marvel'}
              </Description>
              <NavButton onPress={() => handleNavigation(item)}>
                <NavButtonText>View more</NavButtonText>
              </NavButton>
            </>
          )}
        </Content>
      </ScrollContent>

      {loading && <Loading />}
    </Container>
  );
};

export default Details;
