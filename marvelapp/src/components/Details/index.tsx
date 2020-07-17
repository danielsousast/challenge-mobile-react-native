import React, { useEffect, useState, useCallback } from 'react';
import { StatusBar, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

import { useDispatch, useStore } from 'react-redux';
import api from '../../services/api';
import Card from '../Card';
import colors from '../../styles/Colors';
import { addFavorite, delFavorite } from '../../store/actions/AppActions';
import {
  Container,
  Image,
  Content,
  Name,
  SectionTitle,
  Scroll,
  CloseButton,
  Description,
  Header,
  StarButton,
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
  const [series, setSeries] = useState<CardData[]>([]);
  const [events, setEvents] = useState<CardData[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const dispatch = useDispatch();
  const store = useStore();

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

    async function loadSeries() {
      if (!item) return;

      const seriesReponse = await api.get(`characters/${item.id}/series`);
      const eventsResponse = await api.get(`characters/${item.id}/events`);

      setSeries(seriesReponse.data.data.results);
      setEvents(eventsResponse.data.data.results);
    }

    loadSeries();
  }, [item]);

  const toogleFavorite = useCallback(
    async character => {
      const list: [ItemData] = store.getState().app.favorites;

      const findItem = await list.find(
        favorite => favorite.id === character.id,
      );

      if (findItem) {
        dispatch(delFavorite(character.id));

        setIsFavorite(false);

        Alert.alert('Favorito removido');
        return;
      }

      dispatch(addFavorite(character));
      setIsFavorite(true);
    },
    [dispatch, store],
  );

  const handleCloseModal = useCallback(() => {
    StatusBar.setHidden(false);
    closeModal();
  }, []);

  return (
    <Container visible={visible} animationType="slide">
      <Content>
        {item && (
          <>
            <Image
              source={{
                uri: `${item.thumbnail.path}.${item.thumbnail.extension}`,
              }}
            >
              <LinearGradient
                colors={['rgba(36, 45, 60, 0)', 'rgba(36, 45, 60, 1)']}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  height: 100,
                }}
              />
            </Image>
            <Header>
              <Name>{item.name}</Name>
              <StarButton onPress={() => toogleFavorite(item)}>
                <Icon
                  name={isFavorite ? 'star' : 'staro'}
                  size={35}
                  color={colors.primary}
                />
              </StarButton>
            </Header>

            <Description>
              {item.description ||
                'Fictional character that appears in American comics published by Marvel'}
            </Description>

            <SectionTitle>Series</SectionTitle>
            <Scroll horizontal showsHorizontalScrollIndicator={false}>
              {series &&
                series.map(serie => <Card key={serie.id} item={serie} />)}
            </Scroll>

            {events.length > 0 && (
              <>
                <SectionTitle>Eventos</SectionTitle>
                <Scroll horizontal showsHorizontalScrollIndicator={false}>
                  {events.map(serie => (
                    <Card key={serie.id} item={serie} />
                  ))}
                </Scroll>
              </>
            )}
          </>
        )}
      </Content>
      <CloseButton onPress={handleCloseModal}>
        <Icon name="close" size={24} color={colors.background} />
      </CloseButton>
    </Container>
  );
};

export default Details;
