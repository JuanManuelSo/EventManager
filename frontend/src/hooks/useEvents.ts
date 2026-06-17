import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { eventsService } from "../services/events.service";
import type { UpdateEventDTO } from "../types/EventDto";

export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: eventsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
      queryClient.invalidateQueries({
        queryKey: ["dashboard-stats"],
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
      queryClient.invalidateQueries({
        queryKey: ["dashboard-stats"],
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
    queryKey: ["events", "detail", id],
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
    queryKey: ["events", "list", id],
    queryFn: () => eventsService.getEventByUser(),
    enabled: !!id,
    staleTime: 1000 * 30,
  });
}

export function useUpdateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateEventDTO }) =>
      eventsService.update(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["events", "detail", variables.id],
      });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
  });
}
