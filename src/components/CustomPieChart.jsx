import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const CustomPieChart = ({ data, label, totalAmount, colors, showTextAnchor }) => {
    return (
        <div className="flex flex-col items-center mt-4">
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        dataKey="amount"
                        paddingAngle={2}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}

                        {/* Center label */}
                        {showTextAnchor && (
                            <>
                                {/* "Total Balance" text */}
                                <text
                                    x="50%"
                                    y="45%"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    className="fill-gray-500 text-sm"
                                    fontSize={13}
                                    fill="#6b7280"
                                >
                                    {label}
                                </text>

                                {/* Amount text */}
                                <text
                                    x="50%"
                                    y="55%"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fontSize={16}
                                    fontWeight="600"
                                    fill="#111827"
                                >
                                    ₹{totalAmount}
                                </text>
                            </>
                        )}
                    </Pie>
                    <Tooltip
                        formatter={(value) => [`₹${value}`, ""]}
                    />
                </PieChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-2">
                {data.map((entry, index) => (
                    <div key={index} className="flex items-center gap-1.5">
                        <div
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: colors[index % colors.length] }}
                        />
                        <span className="text-xs text-gray-600">{entry.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomPieChart;