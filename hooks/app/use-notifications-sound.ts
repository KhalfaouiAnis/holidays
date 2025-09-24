import { useAudioPlayer } from "expo-audio";

const audioSource = require("../../assets/audio/newNotification.mp3");

export default function useNotificationSound(url?: string) {
  const player = useAudioPlayer(url || audioSource);

  const handlePlay = () => {
    player.seekTo(0);
    player.play();
  };

  return { handlePlay };
}
