import React, { useRef, useState, useCallback, useEffect } from 'react';
import Carousel from 'react-native-anchor-carousel';
import { useRoute, useNavigation } from '@react-navigation/native';
import {
  View,
  YellowBox,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  LogBox,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from '../../styles/Colors';
import {
  Container,
  Description,
  ScreenTitle,
  CarouselContainer,
  ItemInfo,
  ItemName,
  BackgroundImage,
  CarouselImage,
  Filter,
  BackButton,
} from './styles';

LogBox.ignoreAllLogs(['FlatList']);

const { width } = Dimensions.get('window');

interface ItemData {
  id: string;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}
const SlideDetails: React.FC = () => {
  const route = useRoute();

  const { itens } = route.params;
  const navigation = useNavigation();
  const carrouselRef = useRef<any>(null);

  const [background, setBackground] = useState(
    {
      name: itens[0].title,
      uri: `${itens[0].thumbnail.path}.${itens[0].thumbnail.extension}`,
      description: itens[0].previous,
    } || {},
  );

  useEffect(() => {
    StatusBar.setHidden(true);
  }, []);

  const handleGoBack = useCallback(() => {
    StatusBar.setHidden(false);
    navigation.goBack();
  }, [navigation]);

  const renderItem = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            carrouselRef.current.scrollToIndex(index);
            setBackground({
              uri: `${item.thumbnail.path}.${item.thumbnail.extension}`,
              name: item.title,
              description: item.previous,
            });
          }}
        >
          <CarouselImage
            source={{
              uri: `${item.thumbnail.path}.${item.thumbnail.extension}`,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Container>
      <BackgroundImage source={{ uri: background.uri }} blurRadius={10}>
        <Filter>
          <ScreenTitle>Series Populares</ScreenTitle>

          <CarouselContainer>
            <Carousel
              style={{
                flex: 1,
                overflow: 'visible',
                height: '100%',
              }}
              data={itens}
              renderItem={renderItem}
              itemWidth={200}
              containerWidth={width - 20}
              separatorWidth={0}
              ref={carrouselRef}
            />
          </CarouselContainer>

          <ItemInfo>
            <View style={{ justifyContent: 'center' }}>
              <ItemName>{background.name}</ItemName>

              <Description>
                {background.description ||
                  `${background.name} is an excellent American series developed by Marvel`}
              </Description>
            </View>
          </ItemInfo>
        </Filter>
      </BackgroundImage>
      <BackButton onPress={handleGoBack}>
        <Icon name="close" color={colors.dark} size={24} />
      </BackButton>
    </Container>
  );
};

export default SlideDetails;
