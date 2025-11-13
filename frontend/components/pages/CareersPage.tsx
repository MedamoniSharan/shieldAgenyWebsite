
import React, { useState } from 'react';
import { Page } from '../../types';
import { JOB_OPENINGS } from '../../constants';
import AnimatedSection from '../ui/AnimatedSection';
import Button from '../ui/Button';
import RecruitmentProcedure from '../RecruitmentProcedure';

interface CareersPageProps {
    subPageId: string;
    setPage: (page: Page, subPageId?: string) => void;
}

const CareersPage: React.FC<CareersPageProps> = ({ subPageId, setPage }) => {
    const [expandedJob, setExpandedJob] = useState<number | null>(0);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [resume, setResume] = useState<File | null>(null);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            setResume(e.target.files[0]);
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically handle form submission to a backend
        console.log({ ...formData, resume: resume?.name });
        setFormSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setResume(null);
    };

    return (
        <div className="pt-24 pb-12">
            <header className="text-center mb-16 px-4">
                <AnimatedSection>
                    <h1 className="text-5xl font-bold">Join <span className="text-accent-gold">Shield Agency</span></h1>
                    <p className="text-lg text-gray-300 mt-2">Build a rewarding career protecting what matters most.</p>
                </AnimatedSection>
            </header>

            <div className="container mx-auto px-4">
                {/* Job Openings */}
                <section id="openings" className="mb-20">
                    <AnimatedSection>
                        <h2 className="text-4xl font-bold text-center mb-12"><span className="text-highlight-blue">Current</span> Openings</h2>
                        <div className="max-w-4xl mx-auto space-y-4">
                            {JOB_OPENINGS.map((job, index) => (
                                <div key={index} className="bg-glass-bg border border-white/10 rounded-lg overflow-hidden">
                                    <button onClick={() => setExpandedJob(expandedJob === index ? null : index)} className="w-full p-6 text-left flex justify-between items-center">
                                        <div>
                                            <h3 className="text-xl font-bold text-white">{job.title}</h3>
                                            <p className="text-gray-400">{job.location} | <span className="text-accent-gold">{job.type}</span></p>
                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-transform duration-300 ${expandedJob === index ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    </button>
                                    {expandedJob === index && (
                                        <div className="p-6 border-t border-white/10 bg-primary-black/30">
                                            <ul className="list-disc list-inside space-y-2 text-gray-300">
                                               {job.description.map((desc, i) => <li key={i}>{desc}</li>)}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </AnimatedSection>
                </section>
                
                {/* Recruitment Procedure */}
                <RecruitmentProcedure setPage={setPage} />

                {/* Apply Now Form */}
                <section id="apply" className="mb-12">
                     <AnimatedSection>
                        <h2 className="text-4xl font-bold text-center mb-12"><span className="text-highlight-blue">Apply</span> Now</h2>
                        <div className="max-w-2xl mx-auto bg-glass-bg border border-white/10 rounded-lg p-8">
                             {formSubmitted ? (
                                <div className="text-center p-8">
                                    <h3 className="text-2xl font-bold text-accent-gold mb-4">Thank You!</h3>
                                    <p className="text-gray-200">Your application has been submitted successfully. We will be in touch if your qualifications match our needs.</p>
                                </div>
                            ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} required className="w-full p-3 bg-white/5 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-highlight-blue"/>
                                    <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} required className="w-full p-3 bg-white/5 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-highlight-blue"/>
                                </div>
                                <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} required className="w-full p-3 bg-white/5 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-highlight-blue"/>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Upload Resume</label>
                                    <input type="file" onChange={handleFileChange} required className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-highlight-blue file:text-white hover:file:bg-blue-500 cursor-pointer"/>
                                    {resume && <p className="text-xs text-green-400 mt-1">{resume.name}</p>}
                                </div>
                                <textarea name="message" placeholder="Cover Letter or Message (Optional)" value={formData.message} onChange={handleInputChange} rows={4} className="w-full p-3 bg-white/5 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-highlight-blue"></textarea>
                                <div className="text-center">
                                    <Button onClick={() => {}} className="w-full md:w-auto" type="submit">Submit Application</Button>
                                </div>
                            </form>
                            )}
                        </div>
                    </AnimatedSection>
                </section>
            </div>
        </div>
    );
};

export default CareersPage;