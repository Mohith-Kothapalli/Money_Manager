import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 shadow-md rounded-md border">
                <p className="text-sm font-medium">{label}</p>
                <p className="text-purple-600 font-semibold">
                    ₹ {payload[0].value.toLocaleString()}
                </p>
            </div>
        );
    }
    return null;
};

const CustomLineChart = ({ data }) => {
    if (!data || data.length === 0) return null;

    return (
        <div className="w-full" style={{ height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    
                    <defs>
                        <linearGradient id="colorLine" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" vertical={false} />

                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />

                    <YAxis tick={{ fontSize: 12 }} />

                    <Tooltip content={<CustomTooltip />} />

                    <Line
                        type="monotone"
                        dataKey="amount"
                        stroke="#7c3aed"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                        fill="url(#colorLine)"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomLineChart;