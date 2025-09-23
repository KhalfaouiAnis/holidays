import { Container, FavoriteCard, Header, LoadingIndicator } from "@/components";
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

    if (!data || isLoading) {
        return <LoadingIndicator />
    }

    return (
        <Container>
            <Header title="Favorite" />
            <ResponsiveGrid
                data={data}
                keyExtractor={(item) => item.id}
                maxItemsPerColumn={2}
                itemUnitHeight={256}
                renderItem={({ item }) => <FavoriteCard property={item} />}
            />
        </Container>
    )
}

export default Favorite