import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { eventsService } from "../services/events.service";

export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: eventsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
    },
  });
}

export function useDeleteEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: eventsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
    },
  });
}

export function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => eventsService.getAll(),
    staleTime: 1000 * 60,
  });
}

export function useEvent(id: number) {
  return useQuery({
    queryKey: ["events", id],
    queryFn: () => eventsService.getById(id),
    enabled: !!id,
    staleTime: 1000 * 30,
  });
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => eventsService.getDashboardStats(),
    staleTime: 1000 * 60,
  });
}

export function useEventsByUser(id: number) {
  return useQuery({
    queryKey: ["events", id],
    queryFn: () => eventsService.getEventByUser(),
    enabled: !!id,
    staleTime: 1000 * 30,
  });
}
