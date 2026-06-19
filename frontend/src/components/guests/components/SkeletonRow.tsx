export default function SkeletonRow() {
  return (
    <tr className="border-b border-slate-100">
      <td className="px-4 py-3">
        <div className="w-3.5 h-3.5 bg-slate-100 rounded animate-pulse" />
      </td>
      <td className="px-3 py-3">
        <div className="h-3.5 w-32 bg-slate-100 rounded animate-pulse" />
      </td>
      <td className="px-3 py-3">
        <div className="h-3 w-40 bg-slate-100 rounded animate-pulse" />
      </td>
      <td className="px-3 py-3">
        <div className="h-3 w-16 bg-slate-100 rounded animate-pulse" />
      </td>
      <td className="px-3 py-3">
        <div className="h-3 w-10 bg-slate-100 rounded animate-pulse" />
      </td>
      <td className="px-3 py-3">
        <div className="h-6 w-24 bg-slate-100 rounded-full animate-pulse" />
      </td>
      <td className="px-3 py-3">
        <div className="h-6 w-14 bg-slate-100 rounded-full animate-pulse" />
      </td>
      <td className="px-3 py-3">
        <div className="h-5 w-12 bg-slate-100 rounded-full animate-pulse" />
      </td>
      <td className="px-3 py-3 text-right">
        <div className="h-6 w-6 bg-slate-100 rounded animate-pulse ml-auto" />
      </td>
    </tr>
  );
}
