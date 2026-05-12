import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createEventSchema,
  type CreateEventInput,
} from "../../validations/validateCreateEvent";
import Button from "../ui/Button";

interface EventFormProps {
  onSubmit: (data: CreateEventInput) => void;
  initialData?: Partial<CreateEventInput>;
}

export const EventForm = ({ onSubmit, initialData }: EventFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateEventInput>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      status: "Activo",
      ...initialData, // Permite reutilizar el form para editar
    },
  });

  return (
    <form
      id="event-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-xs font-medium text-slate-600 mb-1">
            Nombre
          </label>
          <Input {...register("nombre")} placeholder="Nombre del evento" />
          {errors.nombre && (
            <span className="text-red-500 text-xs mt-1">
              {errors.nombre.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-medium text-slate-600 mb-1">
            Fecha
          </label>
          <Input
            type="datetime-local"
            {...register("fecha")}
            placeholder="Fecha del evento"
          />
          {errors.fecha && (
            <span className="text-red-500 text-xs mt-1">
              {errors.fecha.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-medium text-slate-600 mb-1">
            Ubicación
          </label>
          <Input {...register("locacion")} placeholder="Ubicación del evento" />
          {errors.locacion && (
            <span className="text-red-500 text-xs mt-1">
              {errors.locacion.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-medium text-slate-600 mb-1">
            Tipo de evento
          </label>
          <Input {...register("tipo")} placeholder="Tipo de Evento" />
          {errors.tipo && (
            <span className="text-red-500 text-xs mt-1">
              {errors.tipo.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-medium text-slate-600 mb-1">
            Salon | Lugar
          </label>
          <Input {...register("salon")} placeholder="Salon/Lugar del evento" />
          {errors.salon && (
            <span className="text-red-500 text-xs mt-1">
              {errors.salon.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-medium text-slate-600 mb-1">
            Cantidad de invitados
          </label>
          <Input
            type="number"
            {...register("cant_invitados", {
              valueAsNumber: true,
              setValueAs: (value) => (value === "" ? undefined : Number(value)),
            })}
            placeholder="Cantidad de invitados"
          />
          {errors.cant_invitados && (
            <span className="text-red-500 text-xs mt-1">
              {errors.cant_invitados.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-medium text-slate-600 mb-1">
            Imagen para card
          </label>
          <Input
            {...register("coverImage")}
            placeholder="URL de la imagen de portada"
          />
          {errors.coverImage && (
            <span className="text-red-500 text-xs mt-1">
              {errors.coverImage.message}
            </span>
          )}
        </div>
      </div>
      <Button
        type="submit"
        loading={isSubmitting}
        fullWidth
        size="lg"
        className="mt-1"
      >
        {isSubmitting ? "Guardando..." : "Crear Evento"}
      </Button>
    </form>
  );
};
