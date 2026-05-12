import { useQuery } from "@tanstack/react-query";
import { guestsService } from "../services/guests.service";

export function useGuests(eventId: number) {
  return useQuery({
    queryKey: ["guests", eventId],
    queryFn: () => guestsService.getByEvent(eventId),
    enabled: !!eventId,
  });
}
