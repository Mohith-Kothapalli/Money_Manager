import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import InfoCard from "../components/InfoCard";
import { Coins, Wallet, WalletCards } from "lucide-react";
import { addThousandSeparator } from "../utils/util";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosConfig from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import RecentTransactions from "../components/RecentTransactions";
import FinanaceOverview from "../components/FinanceOverview";
import Transactions from "../components/Transactions";

const Home = () => {
  useUser();

  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA);
      if (response.status === 200) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Something went wrong while fetching dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <Dashboard activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        
        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<WalletCards />}
            label="Total Balance"
            value={addThousandSeparator(dashboardData?.totalBalance || 0)}
            color="bg-purple-800"
          />

          <InfoCard
            icon={<Wallet />}
            label="Total Income"
            value={addThousandSeparator(dashboardData?.totalIncome || 0)}
            color="bg-green-800"
          />

          <InfoCard
            icon={<Coins />}
            label="Total Expense"
            value={addThousandSeparator(dashboardData?.totalExpense || 0)}
            color="bg-red-800"
          />
        </div>

        {/* Recent Transactions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions
            transactions={dashboardData?.recentTransaction}
            onMore={() => navigate("/expense")}
          />

          <FinanaceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          />

          <Transactions
            transactions={dashboardData?.recent5Expenses||[]}
            onMore={()=>navigate("/expense")}
            type="expense"
            title="Recent Expenses"
          />

          <Transactions
            transactions={dashboardData?.recent5Incomes||[]}
            onMore={()=>navigate("/income")}
            type="income"
            title="Recent Incomes"
          />

        </div>

      </div>
    </Dashboard>
  );
};

export default Home;