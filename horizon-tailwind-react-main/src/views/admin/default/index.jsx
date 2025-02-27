import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";

import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";

import Widget from "components/widget/Widget";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import TaskCard from "views/admin/default/components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataComplex from "./variables/tableDataComplex.json";

const Dashboard = () => {
  return (
      <div>
        {/* Card widget */}

        <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
          <Widget
              icon={<MdBarChart className="h-7 w-7"/>}
              title={"Foydalanuvchilar soni"}
              subtitle={"2901"}
          />
          <Widget
              icon={<IoDocuments className="h-6 w-6"/>}
              title={"Mavjud xizmatlar"}
              subtitle={"40"}
          />
          <Widget
              icon={<MdBarChart className="h-7 w-7"/>}
              title={"statistikalar"}
              subtitle={"574"}
          />

        </div>

        {/* Charts */}

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          {/*<TotalSpent />*/}
          <WeeklyRevenue/>
          <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
            {/*<TaskCard />*/}
            <div className="grid grid-cols-1 rounded-[20px]">
              <MiniCalendar/>
            </div>
          </div>

        </div>



      </div>
  );
};

export default Dashboard;
