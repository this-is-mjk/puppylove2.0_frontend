import HorizontalCharts from '@/components/charts/horizontalChart';
import Clear from '@/components/clear';
import DoughnutChart from '@/components/charts/donutChart';
import { IoHeartDislikeSharp } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { getStats } from '@/utils/API_Calls/stats_api';
import '../styles/stats.css';
import { useToast } from '@chakra-ui/react';

interface StatsData {
  totalMatches: number;
  totalRegisters: number;
  maleRegisters: number;
  femaleRegisters: number;
  batchwiseMatches: Record<string, number>;
  batchwiseRegistration: Record<string, number>;
}

const Stats = () => {
  const [adminPublish, setAdminPublish] = useState(false);
  const [stats, setStats] = useState<StatsData | null>(null);
  const toast = useToast();

  useEffect(() => {
    toast.closeAll();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsData = await getStats();
        if (!statsData.msg) {
          setAdminPublish(true);
          setStats(statsData);
        }
      } catch (error) {
        console.log(error);
        toast({
          title: 'Error fetching Stats, Contact Developers',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      {!adminPublish ? (
        <div>
          <Clear />
          <Clear />
          <div className="section">
            <h1 className="font">No Stats To Show Yet</h1>
            <div className="dislikeheart">
              <IoHeartDislikeSharp />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Clear />
          <Clear />
          <div>
            <h1 className="font">Total Matches: {stats?.totalMatches}</h1>
            <h1 className="font">
              Total Registrations: {stats?.totalRegisters}
            </h1>
          </div>
          <Clear />
          <div className="grid">
            <div className="section-1">
              <h1 className="font">Batch Wise Stats</h1>
              <div className="graphGrid">
                <HorizontalCharts
                  Data={stats?.batchwiseMatches}
                  Label="Batch Wise Matches"
                />
                <HorizontalCharts
                  Data={stats?.batchwiseRegistration}
                  Label="Batch Wise Registration"
                />
              </div>
            </div>
            <div className="section-2">
              <h1 className="font">Registrations</h1>
              <div className="doughnutGrid">
                <DoughnutChart
                  femaleRegistration={stats?.femaleRegisters}
                  maleRegistration={stats?.maleRegisters}
                />
              </div>
            </div>
          </div>
          <Clear />
        </div>
      )}
    </div>
  );
};

export default Stats;
