
import React from 'react';
import AnimatedSection from '../ui/AnimatedSection';

const JobApplications: React.FC = () => {
    return (
        <AnimatedSection>
            <h1 className="text-3xl font-bold mb-6">Job Applications</h1>
            <div className="bg-glass-bg backdrop-blur-xl border border-white/10 rounded-lg p-8 text-center">
                <h2 className="text-2xl font-bold text-accent-gold">Coming Soon</h2>
                <p className="text-gray-300 mt-2">View and manage all job applications submitted via the careers page. Mark candidates as reviewed, interviewed, or selected.</p>
            </div>
        </AnimatedSection>
    );
};

export default JobApplications;
