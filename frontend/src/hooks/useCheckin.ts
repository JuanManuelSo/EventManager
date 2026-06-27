import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkinService } from "../services/checkin.service";

export function useScanQR(eventId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (qrHash: string) => checkinService.scanQR(qrHash, eventId),
    onSuccess: () => {
      // Refetch guests list, event details, and dashboard stats
      queryClient.invalidateQueries({ queryKey: ["guests", eventId] });
      queryClient.invalidateQueries({ queryKey: ["events", "detail", eventId] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
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
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
  });
}
