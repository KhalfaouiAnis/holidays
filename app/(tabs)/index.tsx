import { Container, Discovery, HomeCard, LoadingIndicator, MainHeader } from "@/components";
import { PAGE_SIZE } from "@/core/api/common";
import useProperties from "@/core/api/feature/properties/use-properties";
import { PRIMARY } from "@/core/theme/color";
import { useScrollToTop } from "@react-navigation/native";
import { useRef } from "react";
import { FlatList, RefreshControl } from "react-native";

export default function HomeScreen() {
  const { properties, refetch, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching, isPending } = useProperties({ pageSize: PAGE_SIZE })
  const propertiesRef = useRef(null)
  useScrollToTop(propertiesRef)

  const ListFooterComponent = () => {
    if (isPending || isFetchingNextPage) return <LoadingIndicator />
    return null
  }

  return (
    <Container>
      <MainHeader />
      <FlatList
        ref={propertiesRef}
        data={properties}
        ListHeaderComponent={() => <Discovery />}
        renderItem={({ item }) => (<HomeCard property={item} />)}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage()
          }
        }}
        ListFooterComponent={ListFooterComponent}
        onEndReachedThreshold={0.5}
        refreshControl={<RefreshControl onRefresh={refetch} refreshing={isRefetching} colors={[PRIMARY]} />}
      />
    </Container>
  );
}

