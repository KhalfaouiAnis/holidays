import { client } from "@/core/api/client";
import useShoppingCartStore from "@/core/store";
import { formattedDate } from "@/core/utils/dates";
import { useStripe } from "@stripe/stripe-react-native";
import { AxiosError, isAxiosError } from "axios";
import { router } from "expo-router";
import { useState } from "react";
import { toast } from "sonner-native";

interface BookingRequest {
  property_id: string;
  check_in: string | Date;
  check_out: string | Date;
  guest_count: number;
  special_requests: string;
}

export const useCheckoutLogic = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { item, getTotalPrice } = useShoppingCartStore();
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
        special_requests: "",
      };

      const { data } = await client.post<{
        customerID: string;
        booking_id: string;
        ephemeralKey: string;
        clientSecret: string;
        paymentIntent: string;
      }>("/bookings", bookingData);

      const { error } = await initPaymentSheet({
        merchantDisplayName: "holidays",
        customerId: data.customerID,
        customerEphemeralKeySecret: data.ephemeralKey,
        paymentIntentClientSecret: data.paymentIntent,
        allowsDelayedPaymentMethods: true,
        returnURL: "holidays://checkout",
      });

      if (error) {
        toast.error(error.message);
        setIsLoading(false);
      }

      const { error: paymentSheetError } = await presentPaymentSheet();

      if (paymentSheetError) {
        toast.error(paymentSheetError.message);
      } else {
        toast.success("Payment successful");
        router.push("/payment-successful");
      }
    } catch (error) {
      setIsLoading(false);
      const err = error as Error | AxiosError;
      if (isAxiosError(err)) {
        const message = err?.response?.data?.error
          ? err?.response?.data?.error
          : err?.response?.data;
        toast.error(message);
      } else {
        toast.error(err.message);
      }
    }
  };

  return { item, getTotalPrice, isLoading, onSubmit };
};
