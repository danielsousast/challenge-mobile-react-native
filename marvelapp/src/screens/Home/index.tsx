import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, StatusBar } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import Loading from '../../components/Loading';
import api from '../../services/api';
import Character from '../../components/Character';
import Details from '../../components/Details';
import BigCard from '../../components/BigCard';
import {
  Container,
  Logo,
  Header,
  SectionTitle,
  Scroll,
  SectionRow,
  DetailsButton,
  DetailsButtonText,
  ScrollContainer,
} from './styles';

interface ParamsData {
  limit: number;
  orderBy: string;
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
  const [characters, setCharacters] = useState<CharacterData[]>([]);
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalDetails, setModalDetails] = useState(false);

  const navigation = useNavigation();

  const loadCharacters = async (): Promise<void> => {
    if (loading) return;

    setLoading(true);

    const params: ParamsData = {
      limit: 10,

      orderBy: 'name',
    };

    const response = await api.get('characters', { params });

    setCharacters(response.data.data.results);
    setLoading(false);
  };

  const loadSeries = useCallback(async () => {
    setLoading(true);
    const response = await api.get('series', {
      params: {
        limit: 10,
      },
    });

    setSeries(response.data.data.results);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadSeries();
    loadCharacters();

    setTimeout(() => {
      setLoading(false);
    }, 3000);
    StatusBar.setHidden(false);
  }, []);

  const handleShowDetails = useCallback(item => {
    setCharacter(item);
    setModalDetails(true);
  }, []);

  const closeModalDetails = useCallback(() => {
    setModalDetails(false);
  }, []);

  return (
    <>
      <Container>
        <ScrollContainer showsVerticalScrollIndicator={false}>
          <Header>
            <Logo
              source={require('../../assets/logo.png')}
              resizeMode="contain"
            />
          </Header>
          <SectionRow>
            <SectionTitle>Popular Series</SectionTitle>
            <DetailsButton
              onPress={() => navigation.navigate('Slide', { itens: series })}
            >
              <DetailsButtonText>View details</DetailsButtonText>
            </DetailsButton>
          </SectionRow>
          <Scroll horizontal showsHorizontalScrollIndicator={false}>
            {series.map(serie => (
              <BigCard item={serie} key={serie.id} />
            ))}
          </Scroll>

          <SectionRow>
            <SectionTitle>Marvel Characters</SectionTitle>
            <DetailsButton onPress={() => navigation.navigate('Search')}>
              <DetailsButtonText>View More</DetailsButtonText>
            </DetailsButton>
          </SectionRow>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={characters}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Character item={item} onPress={() => handleShowDetails(item)} />
            )}
          />
          <Details
            visible={modalDetails}
            item={character}
            closeModal={closeModalDetails}
          />
        </ScrollContainer>
      </Container>
      {loading && <Loading />}
    </>
  );
};

export default Home;
