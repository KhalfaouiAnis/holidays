import { FlatList, TextInput, View } from 'react-native';

import { Container, Header, LoadingIndicator } from '@/components';
import Card from '@/components/search/card';
import { client } from '@/core/api/client';
import { useDebounce } from '@/hooks/use-debounce';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    const { data, isLoading } = useQuery<Property[]>({
        queryKey: ["properties-search"],
        queryFn: async () => {
            if (debouncedSearchQuery) {
                const { data } = await client.get(`/properties/search?city${debouncedSearchQuery}`)
                return data.properties
            } else {
                return []
            }
        },
        staleTime: 1000 * 60
    })

    return (
        <Container>
            <Header title='Search' />

            <View className='mx-4 rounded-xl bg-gray-100 px-4 py-2 flex flex-row items-center justify-center'>
                <View className='flex flex-row items-center justify-center py-3'>
                    <Ionicons name='search' size={20} color={"gray"} />
                    <TextInput
                        className='ml-2 flex-1'
                        placeholder='Search by city'
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        returnKeyType='search'
                    />
                </View>
            </View>

            <FlatList
                data={data}
                renderItem={({ item }) => <Card property={item} />}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={!data || isLoading ? <LoadingIndicator /> : null}
            />
        </Container>
    );
};

export default Search;