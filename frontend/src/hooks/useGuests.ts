import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { guestsService } from "../services/guests.service";
import { normalizeGuest } from "../lib/utils";

export function useGuests(eventId: number) {
  return useQuery({
    queryKey: ["guests", eventId],
    queryFn: () => guestsService.getByEvent(eventId),

    select: (res) => res.data.map(normalizeGuest),
    enabled: !!eventId,
    staleTime: 1000 * 30,
  });
}

export function useGuestsPaginated(
  eventId: number,
  options?: {
    page?: number;
    pageSize?: number;
    search?: string;
    status?: string;
  },
) {
  return useQuery({
    queryKey: ["guests", eventId, options],
    queryFn: () => guestsService.getByEvent(eventId, options),
    enabled: !!eventId,
    staleTime: 1000 * 30,
  });
}

export function useDeleteGuest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ eventId, guestId }: { eventId: number; guestId: number }) =>
      guestsService.delete(eventId, guestId),
    onSuccess: (_data, variables) => {
      queryClient.setQueryData(["guests", variables.eventId], (old: any) => {
        if (!old?.data || !Array.isArray(old.data)) return old;

        return {
          ...old,
          data: old.data.filter((guest: any) => guest.id !== variables.guestId),
          total:
            typeof old.total === "number" ? Math.max(0, old.total - 1) : old.total,
        };
      });
      queryClient.invalidateQueries({
        queryKey: ["guests", variables.eventId],
      });
    },
  });
}
