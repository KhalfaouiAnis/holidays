import { LoadingIndicator } from "@/components";
import Container from "@/components/container";
import Card from "@/components/home/card";
import Discovery from "@/components/home/discovery";
import MainHeader from "@/components/home/main-header";
import { client } from "@/core/api/client";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect } from "react";
import { FlatList } from "react-native";

export default function HomeScreen() {

  const { data, isLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const { data } = await client.get("/properties")

      return data.properties
    }
  })

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/payment-successful")
    }, 3000)

    return () => clearTimeout(timeout);
  }, [])

  if (!data || isLoading) {
    return <LoadingIndicator />
  }

  return (
    <Container>
      <MainHeader />
      <FlatList
        data={data}
        ListHeaderComponent={() => <Discovery properties={data.reverse()} />}
        renderItem={({ item }) => (<Card property={item} />)}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}

