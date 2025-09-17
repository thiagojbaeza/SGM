import React from "react";
import { BsCart3, BsFillArchiveFill, BsFillGearFill, BsFillGrid3X3GapFill, BsGrid1X2Fill, BsListCheck, BsMenuButtonWideFill, BsPeopleFill } from "react-icons/bs";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

function Home(){

    const data = [
    {
        name: 'Adiantado',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'No prazo',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Pouco atrasado',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Muito atrasado',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    ];

    return(
        <main className="main-container">
            <div className="main-title">
                <h3>DASHBOARD</h3>
            </div>

            <div className="main-cards">
                <div className="card">
                    <div className="card-inner">
                        <h3>Adiantado</h3>
                        <BsFillArchiveFill className="card_iicon" />
                    </div>
                    <h1>3</h1>
                </div>
                <div className="card">
                    <div className="card-inner">
                        <h3>No prazo</h3>
                        <BsFillGrid3X3GapFill className="card_iicon" />
                    </div>
                    <h1>2</h1>
                </div>
                <div className="card">
                    <div className="card-inner">
                        <h3>Pouco atrasado</h3>
                        <BsListCheck className="card_iicon" />
                    </div>
                    <h1>2</h1>
                </div>
                <div className="card">
                    <div className="card-inner">
                        <h3>Muito atrasado</h3>
                        <BsPeopleFill className="card_iicon" />
                    </div>
                    <h1>3</h1>
                </div>
            </div>
            <div className="charts">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                        <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                    </BarChart>
                </ResponsiveContainer>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </main>
    )
}

export default Home;