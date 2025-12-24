import React from 'react';
import Banner from '../Banner/Banner';
import FeaturesSection from '../Banner/FeaturesSection';
import ProcessSection from '../Banner/ProcessSection';
import LatestResolvedIssues from '../LatestResolved/LatestResolvedIssues';

const Home = () => {
    return (
        <div>
            <Banner/>
            <FeaturesSection/>
            <LatestResolvedIssues></LatestResolvedIssues>
            <ProcessSection/>
        </div>
    );
};

export default Home;