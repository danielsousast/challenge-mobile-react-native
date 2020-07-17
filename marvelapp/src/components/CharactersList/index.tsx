import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import { Container } from './styles';

interface ParamsData {
  limit: number;
  offset: number;
  name?: string;
}

const CharactersList: React.FC = () => {
  const [characteres, setCharacters] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const route = useRoute();
  const search = route.params?.search;

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

  // O Hook UseEffect chama a função que lista os Personagens
  useEffect(() => {
    loadCharacters(true);
  }, []);

  function onEndReached() {
    if (loading || characteres.length < 20) return;
    loadCharacters();
  }

  return (
    <Container>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={characteres}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <Character item={item} />}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
      />
    </Container>
  );
};

export default CharactersList;
