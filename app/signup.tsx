import { Container, Header, Text } from '@/components';
import { client } from '@/core/api/client';
import useAuth from '@/core/auth';
import { PRIMARY } from '@/core/theme/color';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { SquircleButton } from 'expo-squircle-view';
import { useState } from 'react';
import { ActivityIndicator, TextInput, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { toast } from 'sonner-native';

const Signup = () => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { signIn, setUser } = useAuth()

    const handleRegister = async () => {
        setLoading(true)
        try {
            if (!email || !password || !name) {
                return;
            }

            await client.post("users", {
                email, password, name
            })

            const response = await client.post("users/login", { email, password })

            setUser(response.data.user)
            signIn({ access: response.data.token })
            setLoading(false)

            router.push("/")
            toast.success("Welcome to holidays!")
        } catch (error) {
            setLoading(false)
            console.log({ error });
        }
    }

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
                            source={require("../assets/images/logo.png")}
                            style={{
                                height: 40,
                                width: 176,
                            }}
                        />
                    </View>
                    <Text variant='subtitle-primary' className='text-center mt-2'>Let&apos;s get started</Text>

                    <TextInput
                        className='mt-4 rounded-xl bg-gray-100 px-4 py-6 text-xl' placeholder='Name'
                        value={name} onChangeText={setName}
                        autoCapitalize='none'
                    />
                    <TextInput
                        className='mt-4 rounded-xl bg-gray-100 px-4 py-6 text-xl' placeholder='Email'
                        value={email} onChangeText={setEmail}
                        autoCapitalize='none'
                        textContentType='emailAddress'
                    />
                    <TextInput
                        secureTextEntry
                        value={password} onChangeText={setPassword}
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