import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

type CollegeCardProps = {
  data: {
    _id: string;
    name: string;
    slug?: string;
    banner_url?: string;
    city?: string;
    country?: string;
    fees?: number;
    establishment_year?: number;
    categories?: string[];
  };
  category?: "engineering" | "medical" | "management";
};

const PROGRAM_LABEL: Record<NonNullable<CollegeCardProps["category"]>, string> =
  {
    engineering: "B.Tech / M.Tech",
    medical: "MBBS / BDS",
    management: "MBA / PGDM",
  };

export default function CollegeCard({
  data,
  category = "engineering",
}: CollegeCardProps) {
  const imageUrl =
    data.banner_url ||
    "https://images.unsplash.com/photo-1562774053-701939374585";
  const slug = data.slug || data._id;

  return (
    <Link href={`/colleges/${slug}`} className="group block h-full">
      <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden hover:border-[#0066F5] hover:shadow-lg hover:shadow-[#0066F5]/15 transition-all duration-300 flex flex-col h-full">
        <div className="relative h-48 overflow-hidden border-b border-[#E2E8F0] bg-slate-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={data.name || "College"}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#0066F5] transition-colors mb-2 line-clamp-2">
            {data.name}
          </h3>

          {(data.city || data.country) && (
            <div className="flex items-center gap-1.5 text-[#64748B] text-sm mb-4">
              <MapPin size={14} className="text-[#0066F5] shrink-0" />
              <span className="truncate">
                {data.city}
                {data.city && data.country ? ", " : ""}
                {data.country}
              </span>
            </div>
          )}

          <div className="space-y-2 mb-5 text-sm">
            <div className="flex justify-between items-center gap-2">
              <span className="text-[#64748B]">Annual Fees</span>
              <span className="font-bold text-[#0F172A]">
                {data.fees ? `₹${data.fees.toLocaleString()}` : "Enquire"}
              </span>
            </div>
            <div className="flex justify-between items-center gap-2">
              <span className="text-[#64748B]">Program</span>
              <span className="font-medium text-[#0F172A]">
                {PROGRAM_LABEL[category]}
              </span>
            </div>
            {data.establishment_year && (
              <div className="flex justify-between items-center gap-2">
                <span className="text-[#64748B]">Established</span>
                <span className="font-medium text-[#0F172A]">
                  {data.establishment_year}
                </span>
              </div>
            )}
          </div>

          <div className="mt-auto pt-4 border-t border-[#E2E8F0]">
            <span className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0066F5] text-white text-sm font-bold py-2.5 group-hover:bg-[#0047B3] transition-colors">
              View Details
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
