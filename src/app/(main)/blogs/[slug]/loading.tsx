export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-white animate-pulse px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="h-4 bg-slate-200 rounded w-24" />
        <div className="h-10 bg-slate-200 rounded w-3/4" />
        <div className="h-56 bg-slate-100 rounded-xl" />
        <div className="h-4 bg-slate-100 rounded w-full" />
        <div className="h-4 bg-slate-100 rounded w-5/6" />
      </div>
    </div>
  );
}
