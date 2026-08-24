export default function ExamLoading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      <div className="h-56 bg-slate-200" />
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-4">
        <div className="h-8 bg-slate-200 rounded w-1/3" />
        <div className="h-4 bg-slate-100 rounded w-2/3" />
        <div className="h-40 bg-slate-100 rounded-2xl" />
      </div>
    </div>
  );
}
