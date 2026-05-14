export function EditableField({
  label,
  value,
  isEditing,
  register,
  error,
  type = "text",
  fullWidth = false,
}: any) {
  return (
    <div className={`flex flex-col gap-1.5 ${fullWidth ? "col-span-2" : ""}`}>
      <label className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
        {label}
      </label>
      {isEditing ? (
        <>
          <input
            type={type}
            {...register}
            className={`w-full px-3 py-1.5 text-sm border rounded-md focus:ring-2 focus:ring-brand-dark outline-none transition-all
              ${error ? "border-red-500" : "border-slate-200 text-slate-700"}`}
          />
          {error && (
            <span className="text-[10px] text-red-500 font-medium">
              {error}
            </span>
          )}
        </>
      ) : (
        <span className="text-sm font-medium text-slate-700">{value}</span>
      )}
    </div>
  );
}
