import { PRIMARY } from '@/core/theme/color';
import { Image } from 'expo-image';
import { View } from "react-native";
import Icon from '../shared/Icon';

const MainHeader = () => {
    return (
        <View className="px-4 pb-4 mt-6">
            <View className="flex flex-row items-center justify-between">
                <Image source={require('../../assets/images/holidays.svg')}
                    contentFit='fill'
                    style={{
                        height: 20,
                        width: 80
                    }}
                />
                <Icon name='notifications' size={20} color={PRIMARY} />
            </View>
        </View>
    )
}

export default MainHeader;