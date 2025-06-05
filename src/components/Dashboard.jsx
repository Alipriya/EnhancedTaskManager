import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import "./Dashboard.css";

export default function Dashboard({ tasks }) {

    const count = { TODO: 0, ACTIVE: 0, CLOSED: 0 };
    tasks.forEach((t) => {
        if (count[t.status] !== undefined) count[t.status]++;
    });

    const data = [
        { category: "Open (TODO)", count: count.TODO },
        { category: "Open (ACTIVE)", count: count.ACTIVE },
        { category: "Closed", count: count.CLOSED },
    ];

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
                >
                    <XAxis dataKey="category" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
