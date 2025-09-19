import { View } from 'react-native';

import { Text } from '@/components';
import { WIDTH } from '@/core/utils/layout';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import ImageWithSquircle from '../home/image-with-squircle';

type Props = {
    imageUrl: string,
    rating: number,
    isFavorite: boolean
};

const PropertyImage = ({ imageUrl, rating = 5, isFavorite }: Props) => {
    return (
        <View className='relative'>
            <View className='flex flex-row items-center justify-center'>
                <ImageWithSquircle image={imageUrl} width={WIDTH - 40} />
            </View>
            <BlurView className='flex flex-row items-center absolute bottom-8 left-8 p-2 rounded-2xl overflow-hidden'>
                <Ionicons name='star' size={24} color={"#facc15"} />
                <Text variant='body' className='text-center mx-1 text-white'>{rating}</Text>
            </BlurView>
            <BlurView className='flex flex-row items-center absolute bottom-8 right-8 p-2 rounded-2xl overflow-hidden'>
                <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={24} color={"white"} />
            </BlurView>
        </View>
    );
};

export default PropertyImage;