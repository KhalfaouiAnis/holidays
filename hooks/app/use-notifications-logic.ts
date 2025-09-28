import { useRef, useState } from "react";
import { View } from "react-native";

export default function useNotificationsLogic() {
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const iconRef = useRef<View>(null);
  const [iconPosition, setIconPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  // Measure icon position to anchor the popup
  const handleIconPress = () => {
    if (iconRef.current) {
      iconRef.current.measureInWindow(
        (x: number, y: number, _: number, height: number) => {
          setIconPosition({ x, y: y + height + 24 });
          setPopupVisible(true);
        }
      );
    }
  };

  return {
    iconRef,
    popupVisible,
    iconPosition,
    setPopupVisible,
    handleIconPress,
  };
}
