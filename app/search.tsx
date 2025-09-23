import { FlatList, TextInput, View } from 'react-native';

import { Container, Header, Icon, LoadingIndicator, SearchCard } from '@/components';
import { useSearchLogic } from '@/hooks/app/use-search-logic';

const Search = () => {
    const { properties, isLoading, searchQuery, setSearchQuery } = useSearchLogic()
    
    return (
        <Container>
            <Header title='Search' />
            <View className='mx-4 rounded-xl bg-gray-100 dark:bg-slate-300 text-[#030712] px-4 py-2 flex flex-row items-center justify-center'>
                <View className='flex flex-row items-center justify-center py-3'>
                    <Icon name="search" size={20} color='#030712' />
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
                renderItem={({ item }) => <SearchCard property={item} />}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={!properties || isLoading ? <LoadingIndicator /> : null}
            />
        </Container>
    );
};

export default Search;