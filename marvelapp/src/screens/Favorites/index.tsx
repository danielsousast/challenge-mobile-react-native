/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import { useStore } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';

import { Container, InputView, Input, SectionTitle } from './styles';
import Character from '../../components/Character';
import Details from '../../components/Details';

interface CharacterData {
  id: string;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}
const Favorites: React.FC = () => {
  const [character, setCharacter] = useState();
  const [characteres, setCharacters] = useState<CharacterData[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const [modalDetails, setModalDetails] = useState(false);

  const store = useStore();

  const loadCharacters = async () => {
    if (loading) return;

    setLoading(true);

    const list: CharacterData[] = store.getState().app.favorites;

    if (search) {
      const filterList = list.filter(item => {
        const itemFilter = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const newText = search.toUpperCase();
        return itemFilter.indexOf(newText) > -1;
      });

      setCharacters(filterList);
      setSearch(search);
      setLoading(false);
      return;
    }

    setCharacters(list);
    setLoading(false);
  };

  useEffect(() => {
    loadCharacters();
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
          onSubmitEditing={() => loadCharacters()}
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
        refreshing={loading}
        onRefresh={loadCharacters}
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

export default Favorites;
