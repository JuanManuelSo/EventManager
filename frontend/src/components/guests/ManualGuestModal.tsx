import { useEffect } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../ui/Input";
import Button from "../ui/Button";
import {
  createGuestSchema,
  type CreateGuestInput,
} from "../../validations/validateCreateGuest";

interface ManualGuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (guest: CreateGuestInput) => Promise<void>;
  isLoading?: boolean;
}

export default function ManualGuestModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: ManualGuestModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateGuestInput>({
    resolver: zodResolver(createGuestSchema),
    defaultValues: {
      documento: "",
      nombre: "",
      apellido: "",
      email: "",
      numero: "",
      mesa: "",
      cant_acompanantes: 0,
    },
  });

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  if (!isOpen) return null;

  function handleClose() {
    reset();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Cargar invitado manualmente</h2>
            <p className="text-xs text-slate-500">Complete los datos para crear un invitado en la base.</p>
          </div>

          <button onClick={handleClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(async (data) => {
            await onConfirm(data);
            reset();
          })}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-xs font-medium text-slate-600 mb-1">Documento</label>
              <Input
                {...register("documento")}
                placeholder="DNI o Pasaporte"
                error={errors.documento?.message}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-medium text-slate-600 mb-1">Nombre</label>
              <Input
                {...register("nombre")}
                placeholder="Nombre"
                error={errors.nombre?.message}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-medium text-slate-600 mb-1">Apellido</label>
              <Input
                {...register("apellido")}
                placeholder="Apellido"
                error={errors.apellido?.message}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-medium text-slate-600 mb-1">
                Email <span className="text-slate-400 font-normal">(opcional)</span>
              </label>
              <Input
                type="email"
                {...register("email")}
                placeholder="correo@ejemplo.com"
                error={errors.email?.message}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-medium text-slate-600 mb-1">
                Telefono <span className="text-slate-400 font-normal">(opcional)</span>
              </label>
              <Input
                {...register("numero")}
                placeholder="+54 9 11 1234 5678"
                error={errors.numero?.message}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-medium text-slate-600 mb-1">
                Mesa <span className="text-slate-400 font-normal">(opcional)</span>
              </label>
              <Input
                {...register("mesa")}
                placeholder="Mesa 12"
                error={errors.mesa?.message}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-medium text-slate-600 mb-1">
                Acompanantes <span className="text-slate-400 font-normal">(opcional)</span>
              </label>
              <Input
                type="number"
                min={0}
                {...register("cant_acompanantes", { valueAsNumber: true })}
                placeholder="0"
                error={errors.cant_acompanantes?.message}
              />
            </div>
          </div>

          <Button type="submit" loading={isLoading} fullWidth size="lg">
            {isLoading ? "Guardando..." : "Guardar invitado"}
          </Button>
        </form>

        <Button variant="secondary" onClick={handleClose} fullWidth size="lg" className="mt-4">
          Cancelar
        </Button>
      </div>
    </div>
  );
}
