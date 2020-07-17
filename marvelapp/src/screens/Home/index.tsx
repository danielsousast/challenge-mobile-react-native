import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, StatusBar } from 'react-native';

import api from '../../services/api';
import Character from '../../components/Character';
import Details from '../../components/Details';
import {
  Container,
  Logo,
  Header,
  BannerImage,
  Banner,
  SectionTitle,
} from './styles';

interface ParamsData {
  limit: number;
  offset: number;
}

interface CharacterData {
  id: string;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

const Home: React.FC = () => {
  const [character, setCharacter] = useState<CharacterData | undefined>();
  const [characteres, setCharacters] = useState<CharacterData[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const [modalDetails, setModalDetails] = useState(false);

  const loadCharacters = async (reset = false): Promise<void> => {
    if (loading) return;

    setLoading(true);

    const nextPage = reset ? 1 : page + 1;

    const params: ParamsData = {
      limit: 20,
      offset: (nextPage - 1) * 20,
    };

    const response = await api.get('characters', { params });

    setPage(nextPage);
    setCharacters(
      reset
        ? response.data.data.results
        : [...characteres, ...response.data.data.results],
    );
    setLoading(false);
  };

  useEffect(() => {
    loadCharacters(true);
  }, []);

  const handleShowDetails = useCallback(item => {
    setCharacter(item);
    setModalDetails(true);
  }, []);

  const closeModalDetails = useCallback(() => {
    setModalDetails(false);
  }, []);

  function onEndReached() {
    if (loading || characteres.length < 20) return;
    loadCharacters();
  }

  return (
    <Container>
      <Header>
        <Logo source={require('../../assets/logo.png')} resizeMode="contain" />
      </Header>
      <Banner>
        <BannerImage source={require('../../assets/banner.jpg')} />
      </Banner>

      <SectionTitle>Personagens</SectionTitle>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={characteres}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Character item={item} onPress={() => handleShowDetails(item)} />
        )}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
      />
      <Details
        visible={modalDetails}
        item={character}
        closeModal={closeModalDetails}
      />
    </Container>
  );
};

export default Home;
