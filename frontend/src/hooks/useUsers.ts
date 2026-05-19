import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usersService } from "../services/users.service";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => usersService.getAll(),
    staleTime: 1000 * 60 * 5, // Los datos se consideran frescos por 5 minutos
  });
}

export function useUser(id: number) {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => usersService.getById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 30,
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => usersService.delete(id),
    onSuccess: () => {
      // Invalidamos la lista de usuarios para forzar un refetch y ver los cambios
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
