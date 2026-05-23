import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkinService } from "../services/checkin.service";

export function useScanQR(eventId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (qrHash: string) => checkinService.scanQR(qrHash, eventId),
    onSuccess: () => {
      // Refetch guests list and event (to update checkedInCount)
      queryClient.invalidateQueries({ queryKey: ["guests", eventId] });
      queryClient.invalidateQueries({ queryKey: ["events", "detail", eventId] });
    },
  });
}

export function useCheckinById(eventId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (guestId: number) =>
      checkinService.checkinById(guestId, eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guests", eventId] });
      queryClient.invalidateQueries({ queryKey: ["events", "detail", eventId] });
    },
  });
}
