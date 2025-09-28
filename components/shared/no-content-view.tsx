import { Text, View } from "react-native";
import Container from "./container";

type Props = {
    title?: string;
    subtitle?: string;
    content?: string
}
export const NoContentView = ({ title, subtitle, content }: Props) => (
    <Container>
        <View className="flex-1 flex-col items-center justify-center p-4">
            {title && <Text className="text-2xl font-bold text-dark dark:text-light">{title}</Text>}
            {
                subtitle && <Text className="mt-2 text-xl font-semibold text-dark dark:text-light">{subtitle}</Text>
            }
            {
                content && <Text className="mt-2 text-base text-dark dark:text-light text-center">{content}</Text>
            }
        </View>
    </Container>
)