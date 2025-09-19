import { Container, Header, Text } from '@/components';
import { client } from '@/core/api/client';
import useAuth from '@/core/auth';
import { PRIMARY } from '@/core/theme/color';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { SquircleButton } from 'expo-squircle-view';
import { useState } from 'react';
import { TextInput, View } from 'react-native';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signIn } = useAuth()

    const handleSignin = async () => {
        try {
            const resqonse = await client.post("users/login", {
                email, password
            })
            signIn({ access: resqonse.data.token })
            router.push("/")
        } catch (error) {
            console.log({ error });
        }
    }

    return (
        <Container>
            <Header title='Login' />
            <View className="flex-1 p-4">
                <View className="flex flex-row items-center justify-center mt-24">
                    <Image source={require("../assets/images/logo.png")}
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
                    onPress={handleSignin}
                    style={{
                        backgroundColor: PRIMARY,
                        paddingVertical: 16
                    }}
                >
                    <Text variant="button" className="text-center">
                        Sign In
                    </Text>

                </SquircleButton>
            </View>
        </Container>
    );
};

export default Login;