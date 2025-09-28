import { Container, FavoriteCard, Header, LoadingIndicator } from "@/components";
import { NoContentView } from "@/components/shared/no-content-view";
import { useFavoritesLogic } from "@/hooks/app/use-favorites-logic";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { ResponsiveGrid } from "react-native-flexible-grid";

const Favorite = () => {
    const { refetch, data, isLoading } = useFavoritesLogic()

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [refetch])
    )

    if (isLoading) {
        return <LoadingIndicator />
    }

    if (!data || data.length === 0) {
        return <NoContentView title="Favorites" subtitle="No items found" content="You haven't favorited any property so far, please go ahead and ❤️ your favorite places!." />
    }

    return (
        <Container>
            <Header title="Favorite" />
            <ResponsiveGrid
                data={data}
                keyExtractor={(item) => item.id}
                maxItemsPerColumn={2}
                itemUnitHeight={256}
                showScrollIndicator={false}
                renderItem={({ item }) => <FavoriteCard property={item} />}
            />
        </Container>
    )
}

export default Favorite