import { SafeAreaView } from 'react-native-safe-area-context';

type ContainerProps = {
    children?: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
    return <SafeAreaView style={{ flex: 1 }} className='dark:bg-[#242832]'>{children}</SafeAreaView>;
};

export default Container;
