import { ActivityIndicator, ScrollView, View } from 'react-native';

import { Container, Header, Text } from '@/components';
import ImageWithSquircle from '@/components/home/image-with-squircle';
import Icon from '@/components/Icon';
import { client } from '@/core/api/client';
import useShoppingCartStore from '@/core/store';
import { PRIMARY } from '@/core/theme/color';
import { useStripe } from '@stripe/stripe-react-native';
import { format } from 'date-fns';
import { router } from 'expo-router';
import { SquircleButton, SquircleView } from 'expo-squircle-view';
import { useState } from 'react';
import { toast } from 'sonner-native';

interface BookingRequest {
  property_id: string;
  check_in: string | Date;
  check_out: string | Date;
  guest_count: number;
  special_requests: string;
}

const formattedDate = (date: Date): string => {
  return format(date, "yyyy-MM-dd'T'HH:mm:ss'Z'");
};

const Checkout = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { item, getTotalPrice } = useShoppingCartStore()
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    try {
      if (!item) return;

      setIsLoading(true);

      const bookingData: BookingRequest = {
        property_id: item.product,
        check_in: formattedDate(item.startDate as Date),
        check_out: formattedDate(item.endDate as Date),
        guest_count: 1,
        special_requests: '',
      };

      const response = await client.post<{
        customerID: string;
        booking_id: string;
        ephemeralKey: string;
        clientSecret: string;
        paymentIntent: string;
      }>('/bookings', bookingData);

      const { error } = await initPaymentSheet({
        merchantDisplayName: 'holidia',
        customerId: response.data.customerID,
        customerEphemeralKeySecret: response.data.ephemeralKey,
        paymentIntentClientSecret: response.data.paymentIntent,
        allowsDelayedPaymentMethods: true,
        returnURL: 'holidia://checkout',
      });

      if (error) {
        console.log('error');
        setIsLoading(false);
      }

      const { error: paymentSheetError } = await presentPaymentSheet();

      if (paymentSheetError) {
        console.log('error');
      } else {
        console.log('payment successful');
        toast.success('Payment successful');
        router.push('/payment-successful');
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

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
                <Icon name='calendar-outline' size={20} className='mr-2' />
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
      <View className='relative'>
        <SquircleButton
          cornerSmoothing={100}
          preserveSmoothing
          borderRadius={24}
          backgroundColor={PRIMARY}
          onPress={onSubmit}
          style={{ position: 'absolute', padding: 16, bottom: 0, left: 0, right: 0, marginHorizontal: 16, paddingVertical: 16 }}
        >
          {isLoading ? (
            <ActivityIndicator color='white' />
          ) : (
            <Text variant="button" className="text-center">
              Confirm and Pay
            </Text>
          )}
        </SquircleButton>
      </View>
    </Container>
  );
};

export default Checkout;