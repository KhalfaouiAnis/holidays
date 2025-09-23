import { Container, Header, Text } from '@/components';
import { PRIMARY } from '@/core/theme/color';
import { useSignUp } from '@/hooks/app/use-auth-logic';
import { Image } from 'expo-image';
import { SquircleButton } from 'expo-squircle-view';
import { ActivityIndicator, TextInput, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

const Signup = () => {
    const {
        name,
        email,
        password,
        loading,
        handleRegister,
        handleNameChange,
        handleEmailChange,
        handlePasswordChange,
    } = useSignUp()

    return (
        <Container>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior='padding'
                keyboardVerticalOffset={4}
            >
                <Header title='Sign Up' />
                <View className="flex-1 px-4">
                    <View className="flex flex-row items-center justify-center mt-24">
                        <Image
                            contentFit='contain'
                            source={require("../assets/images/holidays.svg")}
                            style={{
                                height: 40,
                                width: 176,
                            }}
                        />
                    </View>
                    <Text variant='subtitle-primary' className='text-center mt-2'>Let&apos;s get started</Text>

                    <TextInput
                        className='mt-4 rounded-xl bg-gray-100 px-4 py-6 text-xl' placeholder='Name'
                        value={name}
                        onChangeText={handleNameChange}
                        autoCapitalize='none'
                    />
                    <TextInput
                        className='mt-4 rounded-xl bg-gray-100 px-4 py-6 text-xl' placeholder='Email'
                        value={email} onChangeText={handleEmailChange}
                        autoCapitalize='none'
                        textContentType='emailAddress'
                    />
                    <TextInput
                        secureTextEntry
                        value={password} onChangeText={handlePasswordChange}
                        autoCapitalize='none'
                        textContentType='password'
                        className='mt-4 rounded-xl bg-gray-100 px-4 py-6 text-xl' placeholder='Password'
                    />

                    <SquircleButton
                        className='mt-auto'
                        preserveSmoothing
                        cornerSmoothing={100}
                        borderRadius={16}
                        onPress={handleRegister}
                        style={{
                            backgroundColor: PRIMARY,
                            paddingVertical: 16
                        }}
                    >
                        <Text variant="button" className="text-center">
                            {loading ? <ActivityIndicator color={"white"} /> : "Sign Up"}
                        </Text>
                    </SquircleButton>
                </View>
            </KeyboardAvoidingView>
        </Container>
    );
};

export default Signup;