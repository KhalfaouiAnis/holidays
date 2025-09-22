import { FlatList, TextInput, View } from 'react-native';

import { Container, Header, LoadingIndicator } from '@/components';
import Icon from '@/components/Icon';
import Card from '@/components/search/card';
import { client } from '@/core/api/client';
import { useDebounce } from '@/hooks/use-debounce';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    const { data: properties, isLoading } = useQuery<Property[]>({
        queryKey: ['properties-search', debouncedSearchQuery],
        queryFn: async () => {
            if (debouncedSearchQuery) {
                const { data } = await client.get(`/properties/search?city=${debouncedSearchQuery}`);
                return data.data;
            } else {
                return [];
            }
        },
        staleTime: 1000 * 60,
    });

    return (
        <Container>
            <Header title='Search' />
            <View className='mx-4 rounded-xl bg-gray-100 px-4 py-2 flex flex-row items-center justify-center'>
                <View className='flex flex-row items-center justify-center py-3'>
                    <Icon name="search" size={20} />
                    <TextInput
                        className='ml-2 flex-1 placeholder:dark:text-gray-950'
                        placeholder='Search by city'
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        returnKeyType='search'
                    />
                </View>
            </View>

            <FlatList
                data={properties}
                renderItem={({ item }) => <Card property={item} />}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={!properties || isLoading ? <LoadingIndicator /> : null}
            />
        </Container>
    );
};

export default Search;