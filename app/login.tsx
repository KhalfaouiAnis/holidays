import { Container, Header, Text } from '@/components';
import { PRIMARY } from '@/core/theme/color';
import { useLogin } from '@/hooks/app/use-auth-logic';
import { Image } from 'expo-image';
import { SquircleButton } from 'expo-squircle-view';
import { ActivityIndicator, TextInput, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

const Login = () => {
    const {
        email,
        password,
        loading,
        setEmail,
        setPassword,
        handleLogin,
    } = useLogin()

    return (
        <Container>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior='padding'
                keyboardVerticalOffset={4}
            >
                <Header title='Login' />
                <View className="flex-1 px-4">
                    <View className="flex flex-row items-center justify-center mt-24">
                        <Image source={require("../assets/images/holidays.svg")}
                            style={{
                                height: 40,
                                width: 176
                            }}
                        />
                    </View>
                    <Text variant='subtitle-primary' className='text-center mt-2 mb-16'>Welcome back</Text>
                    <TextInput
                        className='mt-4 rounded-xl bg-gray-100 px-4 py-6 text-xl' placeholder='Email'
                        value={email} onChangeText={setEmail}
                        textContentType='emailAddress'
                        autoCapitalize='none'
                    />
                    <TextInput
                        secureTextEntry
                        autoCapitalize='none'
                        textContentType='password'
                        value={password} onChangeText={setPassword}
                        className='mt-4 rounded-xl bg-gray-100 px-4 py-6 text-xl' placeholder='Password'
                    />
                    <SquircleButton
                        className='mt-auto'
                        preserveSmoothing
                        cornerSmoothing={100}
                        borderRadius={16}
                        onPress={handleLogin}
                        style={{
                            backgroundColor: PRIMARY,
                            paddingVertical: 16
                        }}
                    >
                        <Text variant="button" className="text-center">
                            {loading ? <ActivityIndicator color="white" /> : "Sign In"}
                        </Text>
                    </SquircleButton>
                </View>
            </KeyboardAvoidingView>
        </Container>
    );
};

export default Login;