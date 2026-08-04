import Link from "next/link";
import {
  MapPin,
  ArrowRight,
} from "lucide-react";

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
  category?: 'engineering' | 'medical' | 'management';
};

export default function CollegeCard({ data, category = 'engineering' }: CollegeCardProps) {
  // Category-specific colors
  const categoryColors = {
    engineering: {
      primary: '#4A90E2',
      hover: 'hover:border-[#4A90E2]',
      textHover: 'group-hover:text-[#4A90E2]',
      program: 'B.Tech / M.Tech'
    },
    medical: {
      primary: '#10B981',
      hover: 'hover:border-[#10B981]',
      textHover: 'group-hover:text-[#10B981]',
      program: 'MBBS / BDS'
    },
    management: {
      primary: '#8B5CF6',
      hover: 'hover:border-[#8B5CF6]',
      textHover: 'group-hover:text-[#8B5CF6]',
      program: 'MBA / PGDM'
    }
  };

  const colors = categoryColors[category];
  const imageUrl = data.banner_url || "https://images.unsplash.com/photo-1562774053-701939374585";
  const slug = data.slug || data._id;

  return (
    <Link href={`/colleges/${slug}`} className="group">
      <div className={`bg-white rounded-xl border-2 border-slate-300 overflow-hidden ${colors.hover} hover:shadow-lg hover:shadow-[#4A90E2]/20 transition-all duration-300 flex flex-col h-full`}>
        
        {/* Image Area */}
        <div className="relative h-48 overflow-hidden border-b-2 border-slate-300 bg-slate-50">
          <img
            src={imageUrl}
            alt={data.name || "College"}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content Area */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className={`text-xl font-bold text-[#1E293B] ${colors.textHover} transition-colors mb-3`}>
            {data.name}
          </h3>
          
          {/* Location */}
          {(data.city || data.country) && (
            <div className="flex items-center gap-2 text-slate-600 text-sm mb-4">
              <MapPin size={14} className={colors.primary.replace('#', 'text-[')} />
              <span>{data.city}{data.city && data.country ? ', ' : ''}{data.country}</span>
            </div>
          )}

          {/* Fees and Program Information */}
          <div className="space-y-2 mb-6">
            {/* Annual Fees */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Annual Fees:</span>
              <span className="text-lg font-bold text-[#1E293B]">
                {data.fees ? `₹${data.fees.toLocaleString()}` : 'N/A'}
              </span>
            </div>
            
            {/* Program Type */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Program:</span>
              <span className="text-sm font-medium text-[#1E293B]">{colors.program}</span>
            </div>

            {/* Establishment Year */}
            {data.establishment_year && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Established:</span>
                <span className="text-sm font-medium text-[#1E293B]">{data.establishment_year}</span>
              </div>
            )}
          </div>

          {/* View Details Button */}
          <div className="mt-auto flex items-center justify-between pt-4 border-t-2 border-slate-200">
            <span className="text-xs text-slate-600 font-medium">View Details</span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white group-hover:bg-[#1E293B] transition-all`} style={{ backgroundColor: colors.primary }}>
              <ArrowRight size={16} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
