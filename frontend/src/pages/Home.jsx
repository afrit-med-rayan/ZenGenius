// pages/Home.jsx
import { useEffect } from 'react';
import { Box, Divider } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { fetchWithToken } from '../utils/fetchWithToken';

import Navbar from '../components/Home/Navbar';
import HeroSection from '../components/Home/HeroSection';
import FeaturesSection from '../components/Home/FeaturesSection';
import WhySection from '../components/Home/WhySection';
import BonusSection from '../components/Home/BonusSection';

function Home() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect to /study
      navigate('/study');

      // Optional: Fetch secure data
      fetchWithToken("http://localhost:3000/api/private", getAccessTokenSilently)
        .then(data => {
          console.log("✅ Protected data from backend:", data);
        })
        .catch(error => {
          console.error("❌ Error fetching protected data:", error);
        });
    }
  }, [isAuthenticated, getAccessTokenSilently, navigate]);

  return (
    <Box>
      <Navbar />
      <HeroSection />
      <Divider />
      <FeaturesSection />
      <Divider />
      <WhySection />
      <Divider />
      <BonusSection />
    </Box>
  );
}

export default Home;
