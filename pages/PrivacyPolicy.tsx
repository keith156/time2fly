
import React from 'react';
import SectionTitle from '../components/SectionTitle.tsx';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="pt-24 min-h-screen bg-white">
            <section className="bg-slate-950 py-32 text-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <SectionTitle
                        subtitle="Legal"
                        title="Privacy Policy"
                        description="How we handle and protect your information at Time2Fly Tours & Travel Ltd."
                        light={true}
                    />
                </div>
            </section>

            <section className="py-24">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-slate max-w-none space-y-8">
                        <div>
                            <h2 className="font-black uppercase tracking-tight text-slate-900 mb-4 text-4xl md:text-5xl tracking-tighter">1. Information We Collect</h2>
                            <p className="text-body text-slate-600">
                                When you use our inquiry forms or contact us via WhatsApp, we may collect personal information such as your name, phone number, email address, and travel preferences. This information is necessary for us to provide you with accurate travel quotes and services.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-black uppercase tracking-tight text-slate-900 mb-4 text-4xl md:text-5xl tracking-tighter">2. How We Use Your Data</h2>
                            <p className="text-body text-slate-600">
                                Your data is used solely for:
                            </p>
                            <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-4">
                                <li>Processing your travel bookings and inquiries.</li>
                                <li>Communicating with you regarding your flight or tour status.</li>
                                <li>Improving our customer service and website experience.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="font-black uppercase tracking-tight text-slate-900 mb-4 text-4xl md:text-5xl tracking-tighter">3. Data Sharing</h2>
                            <p className="text-body text-slate-600">
                                We do not sell or rent your personal information to third parties. We only share your data with trusted partners (such as airlines or hotels) when it is required to fulfill your travel arrangements.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-black uppercase tracking-tight text-slate-900 mb-4 text-4xl md:text-5xl tracking-tighter">4. Security</h2>
                            <p className="text-body text-slate-600">
                                We implement a variety of security measures to maintain the safety of your personal information. Our website uses standard encryption protocols to protect data during transmission.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-black uppercase tracking-tight text-slate-900 mb-4 text-4xl md:text-5xl tracking-tighter">5. Your Rights</h2>
                            <p className="text-body text-slate-600">
                                You have the right to request access to the personal information we hold about you or ask for its deletion at any time by contacting us at <strong>info@time2flytnt.com</strong>.
                            </p>
                        </div>

                        <div className="pt-8 border-t border-slate-100">
                            <p className="text-caption text-slate-400">
                                Last updated: February 23, 2026
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
