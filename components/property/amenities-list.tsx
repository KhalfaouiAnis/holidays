import { Text } from '@/components';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import Icon from '../Icon';

export type AmenityType =
    | 'WiFi'
    | 'Kitchen'
    | 'Pool'
    | 'Air conditioning'
    | 'Pet friendly'
    | 'Free parking';

const amenityIcon: Record<AmenityType, keyof typeof Ionicons.glyphMap> = {
    'Air conditioning': 'snow',
    'Pet friendly': 'paw',
    Kitchen: 'restaurant',
    Pool: 'water',
    WiFi: 'wifi',
    'Free parking': 'car',
};

type Props = {
    amenitites: string
};

const AmenitiesList = ({ amenitites }: Props) => {
    const allAmenities = amenitites.split(",") as AmenityType[]

    return (
        <View className='my-4 flex flex-row flex-wrap justify-evenly'>
            {
                allAmenities.map((amenity, index) => {
                    return (
                        <View key={index} className="mx-2 flex flex-1 items-center justify-center rounded-2xl dark:bg-slate-900 bg-slate-100 p-2" >
                            <Icon name={amenityIcon[amenity]} size={24} />
                            <Text variant="body-primary" className="mt-2 text-center">
                                {amenity}
                            </Text>
                        </View>
                    )
                })
            }
        </View >
    );
};

export default AmenitiesList;