
import React from 'react';
import AnimatedSection from '../ui/AnimatedSection';
import { ADMIN_STATS } from '../../constants';
import StatCard from './ui/StatCard';

const BarChartPlaceholder = () => (
    <div className="w-full h-64 bg-white/5 border border-white/10 rounded-lg p-4 flex items-end space-x-2">
        {[...Array(12)].map((_, i) => (
            <div key={i} className="flex-1 bg-gradient-to-t from-highlight-blue/50 to-highlight-blue rounded-t-sm" style={{ height: `${Math.random() * 80 + 10}%` }}></div>
        ))}
    </div>
);

const PieChartPlaceholder = () => (
    <div className="w-full h-64 bg-white/5 border border-white/10 rounded-lg p-4 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-48 h-48">
            <circle cx="50" cy="50" r="45" fill="transparent" stroke="#3B82F6" strokeWidth="10" />
            <circle cx="50" cy="50" r="45" fill="transparent" stroke="#d4af37" strokeWidth="10" strokeDasharray="283" strokeDashoffset="70" />
            <text x="50" y="55" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">75%</text>
        </svg>
    </div>
);


const DashboardOverview: React.FC = () => {
    return (
        <div>
            <AnimatedSection>
                <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {ADMIN_STATS.map((stat, index) => (
                    <AnimatedSection key={stat.title} delay={`delay-${index * 100}`}>
                        <StatCard {...stat} />
                    </AnimatedSection>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <AnimatedSection delay="delay-400">
                     <h2 className="text-2xl font-bold mb-4">Monthly Activity</h2>
                     <BarChartPlaceholder />
                </AnimatedSection>
                 <AnimatedSection delay="delay-500">
                     <h2 className="text-2xl font-bold mb-4">Guard Status</h2>
                     <PieChartPlaceholder />
                </AnimatedSection>
            </div>
        </div>
    );
};

export default DashboardOverview;
