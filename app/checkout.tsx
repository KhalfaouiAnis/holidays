import { ScrollView, View } from 'react-native';

import { Container, Header, Text } from '@/components';
import ImageWithSquircle from '@/components/home/image-with-squircle';
import useShoppingCartStore from '@/core/store';
import { PRIMARY } from '@/core/theme/color';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { SquircleButton, SquircleView } from 'expo-squircle-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Checkout = () => {
  const { item, getTotalPrice } = useShoppingCartStore()
  const { bottom } = useSafeAreaInsets()

  if (!item) {
    return (
      <View className="flex-1 flex flex-row items-center justify-center">
        <Text variant="body" className="text-center">
          Cart is empty
        </Text>
      </View>
    )
  }

  return (
    <Container>
      <ScrollView className='flex-1'>
        <View className="px-4">
          <Header title='Checkout' />
          <SquircleView
            cornerSmoothing={100}
            preserveSmoothing
            borderRadius={24}
            backgroundColor={"#f3f4f6"}
            className='flex flex-row'
            style={{ overflow: 'hidden', padding: 16 }}
          >
            <ImageWithSquircle image={item.image} width={96} height={96} borderRadius={24} />
            <View className="ml-4 flex-1">
              <Text variant="body" className="">
                {item.name}
              </Text>
              <Text variant="body" className="">
                {item.name}
              </Text>
            </View>
          </SquircleView>
          <SquircleView
            cornerSmoothing={100}
            preserveSmoothing
            borderRadius={24}
            backgroundColor={"#f3f4f6"}
            className='my-4 flex flex-row'
            style={{ overflow: 'hidden', padding: 16 }}
          >
            <Text variant="subtitle" className="">
              Your trip
            </Text>
            <View className="mb-4">
              <Text variant="body" className="mb-2 ">
                Dates
              </Text>
              <View className="flex flex-row items-center">
                <Ionicons name='calendar-outline' size={20} className='mr-2' />
                <Text variant="body" className="text-center">
                  {format(new Date(item.startDate), 'EEE, MMM d')} {" - "}
                  {format(new Date(item.endDate), 'EEE, MMM d, yyyy')}
                </Text>
              </View>
            </View>
          </SquircleView>
          <SquircleView
            cornerSmoothing={100}
            preserveSmoothing
            borderRadius={24}
            backgroundColor={"#f3f4f6"}
            className='my-4 flex flex-row'
            style={{ overflow: 'hidden', padding: 16 }}
          >
            <Text variant="subtitle" className="">
              Price details
            </Text>
            <View className="">
              <View className="flex flex-row items-center justify-between my-1">
                <Text variant="body" className="">
                  ${item.price_per_night} x {item.days} nights
                </Text>
                <Text variant="body" className="text-center">
                  ${getTotalPrice()}
                </Text>
              </View>
              <View className="flex flex-row items-center justify-between my-1">
                <Text variant="body" className="">
                  Service fee
                </Text>
                <Text variant="body" className="text-center">
                  Free
                </Text>
              </View>

              <View className="my-2 h-[1px] bg-gray-200" />

              <View className="flex flex-row items-center justify-between my-1">
                <Text variant="body" className="">
                  Total (USD)
                </Text>
                <Text variant="body" className="text-center">
                  ${getTotalPrice().toFixed(2)}
                </Text>
              </View>

            </View>
          </SquircleView>
        </View>
      </ScrollView>
      <SquircleButton
        cornerSmoothing={100}
        preserveSmoothing
        borderRadius={24}
        backgroundColor={PRIMARY}
        style={{ position: 'absolute', padding: 16, bottom: bottom * 12, left: 0, right: 0, marginHorizontal: 16, paddingVertical: 16 }}
      >
        <Text variant="button" className="text-center">
          Confirm and Pay
        </Text>
      </SquircleButton>
    </Container>
  );
};

export default Checkout;