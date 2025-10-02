import { Container, Header, LoadingIndicator } from "@/components"
import { NotificationListItem } from "@/components/notification/notification-list-item"
import { NoContentView } from "@/components/shared/no-content-view"
import { PAGE_SIZE } from "@/core/api/common"
import useUserNotifications from "@/core/api/feature/notifications/use-user-notifications"
import { getUserId } from "@/core/auth"
import { useWebSocketStore } from "@/core/store"
import { PRIMARY } from "@/core/theme/color"
import { FlatList, RefreshControl } from "react-native"
import { useShallow } from "zustand/shallow"

const Notifications = () => {
    const userId = getUserId()
    const markAsRead = useWebSocketStore(useShallow((state) => state.markAsRead));

    const { notifications, isPending, isFetchingNextPage, hasNextPage, refetch, isRefetching, fetchNextPage } = useUserNotifications({ pageSize: PAGE_SIZE, userId: userId || "" })

    const handleMarkAsRead = (notificationId: string) => {
        if (userId) {
            markAsRead(notificationId, userId);
        }
    };

    const renderNotificationItem = ({ item }: { item: UserNotificationItem }) => (
        <NotificationListItem item={item} handleMarkAsRead={handleMarkAsRead} />
    );

    const ListFooterComponent = () => {
        if (isPending || isFetchingNextPage) return <LoadingIndicator />;
        return null
    }

    const ListEmptyComponent = () => (
        <NoContentView subtitle="No notifications" content="New notifications will be displayed here." />
    )

    const handleEndReached = () => {
        if (hasNextPage) {
            fetchNextPage()
        }
    }

    return (
        <Container>
            <Header title="Notifications" />
            <FlatList
                data={notifications}
                renderItem={renderNotificationItem}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={ListEmptyComponent}
                onEndReached={handleEndReached}
                ListFooterComponent={ListFooterComponent}
                onEndReachedThreshold={0.5}
                refreshControl={<RefreshControl onRefresh={refetch} refreshing={isRefetching} colors={[PRIMARY]} />}
            />
        </Container>
    )
}

export default Notifications