export default function CollegeLoading() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 sm:p-8 space-y-6 animate-pulse">
      <div className="h-48 sm:h-64 rounded-2xl bg-slate-200" />
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="h-8 bg-slate-200 rounded w-1/2" />
        <div className="h-4 bg-slate-100 rounded w-2/3" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-white border border-slate-100 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
