import { PRIMARY } from '@/core/theme/color';
import formatNotificationDate from '@/core/utils/dates';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from '../shared/Icon';

type Props = {
    item: UserNotificationItem,
    handleMarkAsRead: (notificationId: string) => void
}

export const NotificationListItem = ({ item, handleMarkAsRead }: Props) => {
    return (
        <TouchableOpacity className={`p-4 mb-4 border-b border-b-slate-200 ${!item.isRead ? 'dark:bg-slate-900 bg-slate-100' : ''}`} onPress={() => handleMarkAsRead(item.notification.id!)}>
            <View className='flex flex-row items-center'>
                <View>
                    {
                        item.isRead ? <Icon name='checkmark-circle' size={30} color={PRIMARY} /> : <Text className='text-3xl'>🆕</Text>
                    }
                </View>
                <View className='flex flex-1 flex-row items-center justify-between ml-3'>
                    <View className='flex flex-col overflow-hidden w-10/12'>
                        <Text className='text-xl font-bold text-dark dark:text-light'>{item.notification.title}</Text>
                        <Text className='text-base font-semibold text-gray-600 dark:text-gray-300 truncate'>{item.notification.message}</Text>
                    </View>
                    <View>
                        <Text className='text-[8px] font-bold text-dark dark:text-gray-400'>{formatNotificationDate(item.notification.createdAt!)}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}
