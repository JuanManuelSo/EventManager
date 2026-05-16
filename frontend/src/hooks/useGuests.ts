import { useQuery } from "@tanstack/react-query";
import { guestsService } from "../services/guests.service";

export function useGuests(eventId: number) {
  return useQuery({
    queryKey: ["guests", eventId],
    queryFn: () => guestsService.getByEvent(eventId),

    select: (res) => res.data,
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
