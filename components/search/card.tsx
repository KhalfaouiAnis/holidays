import { Pressable, View } from 'react-native';

import { Icon, ImageWithSquircle, Text } from '@/components';
import { WIDTH } from '@/core/utils/layout';

type Props = {
    property: Property
};

const Card = ({ property }: Props) => {
    return (
        <Pressable className='border-b border-gray-200 p-4'>
            <View className='relative'>
                <View className='mb-4 overflow-hidden flex items-center'>
                    <ImageWithSquircle
                        image={property.images[0]}
                        width={WIDTH - 40}
                    />
                </View>
                <View className='absolute right-6 top-6'>
                    <Icon name={property.is_favorite ? "heart" : "heart-outline"} size={24} />
                </View>
            </View>
            <View className='px-2'>
                <View className='flex flex-row items-center'>
                    <Text variant='body'>
                        {property.name}, {property.country}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
};

export default Card;