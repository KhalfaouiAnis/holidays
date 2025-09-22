import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { Ionicons } from "@expo/vector-icons";

type Props = {
    name: React.ComponentProps<typeof Ionicons>["name"],
    size?: number
    className?: string
    disabled?: boolean
}

const Icon = ({
    name,
    size,
    className,
    disabled
}: Props) => {
    const colorScheme = useColorScheme();
    const color = getIconColor(name, Colors[colorScheme ?? 'light'].icon, disabled)

    return <Ionicons name={name} size={size} color={color} className={className} />
}

export default Icon;

function getIconColor(name: string, defaultColor: string, disabled?: boolean) {
    if (name === "star") return "#facc15"
    if (name === "heart-outline" || name === "heart") return "#ef4444"
    if (disabled) return "gray"
    return defaultColor;
}