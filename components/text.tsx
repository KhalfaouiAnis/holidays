import { Text as RnText, TextProps } from "react-native";
import { twMerge } from "tailwind-merge";

type TypographyVariant = "title" | "subtitle" | "body" | 'caption' | "button" | "display" | "caption-primary" | "body-primary" | "subtitle-primary";

interface TextComponentProps extends TextProps {
    className?: string,
    variant?: TypographyVariant,
}

const variantStyles: Record<TypographyVariant, string> = {
    title: "text-4xl font-bold",
    subtitle: "text-xl font-semibold",
    "subtitle-primary": "text-xl font-semibold text-primary",
    body: 'text-base',
    "body-primary": 'text-base text-primary',
    caption: "text-sm font-medium",
    "caption-primary": "text-sm text-primary font-medium",
    button: 'text-xl text-primary font-semibold text-white text-center',
    display: 'text-3xl font-bold'
}

const Text = ({ variant = "body", children, className, ...props }: TextComponentProps) => {
    const textStyle = twMerge("text-black", variantStyles[variant], className)

    return <RnText className={textStyle} {...props}>
        {children}
    </RnText>
}

export default Text