import { Typography } from '@mui/material';
import { Book, Category, People, AssignmentTurnedIn } from '@mui/icons-material';
import StatCard from '../../components/common/StatCard';
import { 
  useGetCoursesQuery, 
  useGetCategoriesQuery, 
  useGetUsersQuery, 
  useGetEnrollmentsQuery 
} from '../../services/api';

const OverviewPage = () => {
  // সবগুলো API কল একসাথে হচ্ছে
  const { data: courses, isLoading: isCoursesLoading } = useGetCoursesQuery();
  const { data: categories, isLoading: isCategoriesLoading } = useGetCategoriesQuery();
  const { data: users, isLoading: isUsersLoading } = useGetUsersQuery();
  const { data: enrollments, isLoading: isEnrollmentsLoading } = useGetEnrollmentsQuery();

  return (
    <div className="animate-fade-in flex flex-col gap-8">
      <div>
        <Typography variant="h4" className="font-bold text-slate-800 mb-2">
          Dashboard Overview
        </Typography>
        <Typography variant="body1" className="text-slate-500">
          Welcome back, Admin. Here is what's happening today.
        </Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Courses" 
          value={courses?.length || 0} 
          icon={<Book fontSize="large" />} 
          colorClass="text-indigo-600"
          loading={isCoursesLoading}
        />
        <StatCard 
          title="Categories" 
          value={categories?.length || 0} 
          icon={<Category fontSize="large" />} 
          colorClass="text-emerald-600"
          loading={isCategoriesLoading}
        />
        <StatCard 
          title="Active Users" 
          value={users?.length || 0} 
          icon={<People fontSize="large" />} 
          colorClass="text-blue-600"
          loading={isUsersLoading}
        />
        <StatCard 
          title="Enrollments" 
          value={enrollments?.length || 0} 
          icon={<AssignmentTurnedIn fontSize="large" />} 
          colorClass="text-orange-600"
          loading={isEnrollmentsLoading}
        />
      </div>

      {/* তুমি চাইলে এখানে একটা চার্ট বা রিসেন্ট অ্যাক্টিভিটি টেবিল অ্যাড করতে পারো, আপাতত খালি রাখছি */}
      <div className="mt-8 bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-64 flex items-center justify-center">
        <Typography className="text-gray-400 italic">
          More detailed analytics and charts can be placed here...
        </Typography>
      </div>
    </div>
  );
};

export default OverviewPage;