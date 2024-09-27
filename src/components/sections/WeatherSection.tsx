import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";

export const WeatherSection = ({ weatherData }: { weatherData: any }) => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Previsión del tiempo</h2>
        <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={weatherData}>
                <defs>
                  <linearGradient
                    id="colorTemperature"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#BE3144" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#BE3144" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorPrecipitation"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#03346E" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#03346E" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorSunHours"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#C69749" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#C69749" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />

                {/* Áreas Rellenadas */}
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="temperature"
                  stroke="#BE3144"
                  fill="url(#colorTemperature)"
                  name="Temperatura (°C)"
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="precipitation"
                  stroke="#03346E"
                  fill="url(#colorPrecipitation)"
                  name="Precipitaciones (mm)"
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="sunHours"
                  stroke="#C69749"
                  fill="url(#colorSunHours)"
                  name="Horas de sol"
                />

                {/* Opcional: Líneas Sobre las Áreas */}
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="temperature"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                  name="Temperatura (°C)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="precipitation"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                  name="Precipitaciones (mm)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="sunHours"
                  stroke="#ffc658"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                  name="Horas de sol"
                />
              </AreaChart>
            </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};
