import { Container, Header, LoadingIndicator } from "@/components"
import Card from "@/components/favorite/card"
import { client } from "@/core/api/client"
import { useQuery } from "@tanstack/react-query"
import { useFocusEffect } from "expo-router"
import { useCallback } from "react"
import { ResponsiveGrid } from "react-native-flexible-grid"

const Favorite = () => {
    const { data, isLoading, refetch } = useQuery<Property[]>({
        queryKey: ["favorites"],
        queryFn: async () => {
            const { data } = await client.get("/favorites")

            return data.favorites
        }
    })

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
                renderItem={({ item }) => <Card property={item} />}
            />
        </Container>
    )
}

export default Favorite