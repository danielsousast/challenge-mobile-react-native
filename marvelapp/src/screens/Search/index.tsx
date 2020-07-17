import React, { useEffect, useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import api from '../../services/api';
import Character from '../../components/Character';
import Details from '../../components/Details';
import { Container, InputView, Input, SectionTitle } from './styles';

interface ParamsData {
  limit: number;
  offset: number;
  name?: string;
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

const Serach: React.FC = () => {
  const [character, setCharacter] = useState<CharacterData>();

  const [characteres, setCharacters] = useState<CharacterData[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const [modalDetails, setModalDetails] = useState(false);

  const loadCharacters = async (reset = false) => {
    if (loading) return;

    setLoading(true);

    const nextPage = reset ? 1 : page + 1;

    const params: ParamsData = {
      limit: 20,
      offset: (nextPage - 1) * 20,
    };

    if (search) {
      params.name = search;
    }

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

  function onEndReached() {
    if (loading || characteres.length < 20) return;
    loadCharacters();
  }

  const handleShowDetails = useCallback(item => {
    setCharacter(item);
    setModalDetails(true);
  }, []);

  const closeModalDetails = useCallback(() => {
    setModalDetails(false);
  }, []);

  return (
    <Container>
      <InputView>
        <Input
          placeholder="Informe o nome"
          placeholderTextColor="#666"
          onChangeText={text => setSearch(text)}
          keyboardType="web-search"
          onSubmitEditing={() => loadCharacters(true)}
        />
        <Icon name="search1" color="#666" size={24} />
      </InputView>
      <SectionTitle>Resultados</SectionTitle>
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

export default Serach;
