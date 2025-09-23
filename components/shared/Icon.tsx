import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { Ionicons } from "@expo/vector-icons";

type Props = {
    name: React.ComponentProps<typeof Ionicons>["name"],
    size?: number
    className?: string
    disabled?: boolean
    color?: string
}

const Icon = ({
    name,
    size,
    className,
    disabled,
    color
}: Props) => {
    const colorScheme = useColorScheme();
    const finalColor = getIconColor(name, Colors[colorScheme ?? 'light'].icon, color, disabled)

    return <Ionicons name={name} size={size} color={finalColor} className={className} />
}

export default Icon;

function getIconColor(name: string, themeColor: string, color?: string, disabled?: boolean) {
    if (color) return color;
    if (name === "star") return "#facc15"
    if (name === "heart-outline" || name === "heart") return "#ef4444"
    if (disabled) return "gray"
    return themeColor;
}