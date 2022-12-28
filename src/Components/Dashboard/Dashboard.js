import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Icon1 from "../../Assets/GridIcon";
import Icon2 from "../../Assets/ProductIcon";
import CardItem from "./CardItem";
import { getDoctors, getUsers } from "../../APIS/apis";
import Spinner from "../Common/Spinner";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    users: [],
    doctors: [],
  });

  useEffect(() => {
    getData()
      .then((cData) => {
        setLoading(false);
        setData(cData);
      })
      .catch((err) => {
        setLoading(false);
        alert(err.message);
      });
  }, []);

  const getData = async () => {
    let data = await Promise.all([getUsers(), getDoctors()]);
    const users = data[0];
    const doctors = data[1];
    return { users, doctors };
  };
  
  return (
    <Sidebar>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <h2>Dashboard</h2>
          <div className="row">
            <CardItem
              title="Total Doctors"
              Icon={Icon1}
              value={data.doctors.length}
              bgcolor="bg-green"
              txtcolor="text-green"
              borderColor="border-green"
            />
            <CardItem
              title="Total Users"
              Icon={Icon2}
              value={data.users.length}
              bgcolor="bg-blue"
              txtcolor="text-blue"
              borderColor="border-blue"
            />
          </div>
        </div>
      )}
    </Sidebar>
  );
};

export default Dashboard;
