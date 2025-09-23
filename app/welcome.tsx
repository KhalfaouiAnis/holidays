import { Container, Text } from '@/components';
import { PRIMARY } from '@/core/theme/color';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { SquircleButton } from 'expo-squircle-view';
import { View } from 'react-native';

const Welcome = () => {
    return (
        <Container>
            <View className="flex items-center justify-center flex-1 px-4">
                <View className="flex flex-1 items-center justify-center">
                    <Image source={require("../assets/images/holidays.svg")}
                        style={{
                            height: 40,
                            width: 176,
                        }}
                        contentFit='contain'
                    />
                </View>
                <SquircleButton
                    backgroundColor={PRIMARY}
                    borderRadius={16}
                    style={{
                        paddingVertical: 16,
                        marginTop: 16,
                    }}
                    className='w-full items-center'
                    onPress={() => router.push("/signup")}
                >
                    <Text variant="button" className="text-center">
                        Join us!
                    </Text>

                </SquircleButton>
                <SquircleButton
                    className='w-full items-center'
                    borderRadius={16}
                    style={{
                        paddingVertical: 16,
                    }}
                    onPress={() => router.push("/login")}
                >
                    <Text variant="button" className="text-center text-primary">
                        Already signed up? Login
                    </Text>

                </SquircleButton>
            </View>
        </Container>
    );
};

export default Welcome;