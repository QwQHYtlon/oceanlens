import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Fish, Activity, Bot } from 'lucide-react';
import Button from '../components/Button/Button';
import Card from '../components/Card/Card';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import MetricCard from '../components/MetricCard/MetricCard';
import { oceanData } from '../data/oceanData';
import './Home.css';

const Home = () => {
  const { coverage, unexplored, features, comparison } = oceanData;
  
  const featureIcons = {
    compass: <Compass size={32} />,
    fish: <Fish size={32} />,
    activity: <Activity size={32} />,
    bot: <Bot size={32} />
  };
  
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="home__hero">
        <div className="home__hero-content">
          <motion.h1 
            className="home__title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            OceanLens
          </motion.h1>
          <motion.h2 
            className="home__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            海洋透視鏡
          </motion.h2>
          <motion.p 
            className="home__tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            讓不能潛水的人，也能探索海洋。
          </motion.p>
          <motion.p 
            className="home__description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            透過互動科技，探索海洋生物、環境與生態系統。
          </motion.p>
          <motion.div 
            className="home__cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button to="/explore" variant="primary" size="large">
              開始探索
            </Button>
            <Button to="/explore" variant="secondary" size="large">
              了解 OceanLens
            </Button>
          </motion.div>
        </div>
      </section>
      
      {/* Ocean Data Section */}
      <section className="home__section">
        <div className="container">
          <SectionTitle 
            title="海洋數據" 
            subtitle="探索海洋的驚人數據"
            align="center"
          />
          <div className="home__metrics">
            <MetricCard 
              value={`${coverage.percentage}%`}
              label={coverage.label}
              description={coverage.description}
            />
            <MetricCard 
              value={`${unexplored.percentage}%+`}
              label={unexplored.label}
              description={unexplored.description}
            />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="home__section">
        <div className="container">
          <SectionTitle 
            title="核心功能" 
            subtitle="探索 OceanLens 的強大功能"
            align="center"
          />
          <div className="home__features">
            {features.map((feature) => (
              <Link key={feature.id} to={feature.path}>
                <Card variant="glass" hover className="home__feature-card">
                  <div className="home__feature-icon" style={{ color: 'var(--color-accent)' }}>
                    {featureIcons[feature.icon]}
                  </div>
                  <h3 className="home__feature-title">{feature.title}</h3>
                  <p className="home__feature-description">{feature.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Comparison Section */}
      <section className="home__section">
        <div className="container">
          <SectionTitle 
            title="Why OceanLens" 
            subtitle="傳統教育 vs 互動學習"
            align="center"
          />
          <div className="home__comparison">
            <Card variant="glass" className="home__comparison-card">
              <h3 className="home__comparison-title">{comparison.traditional.title}</h3>
              <ul className="home__comparison-list">
                {comparison.traditional.items.map((item, index) => (
                  <li key={index} className="home__comparison-item home__comparison-item--traditional">
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
            <Card variant="glass" className="home__comparison-card home__comparison-card--highlight">
              <h3 className="home__comparison-title">{comparison.oceanlens.title}</h3>
              <ul className="home__comparison-list">
                {comparison.oceanlens.items.map((item, index) => (
                  <li key={index} className="home__comparison-item home__comparison-item--oceanlens">
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="home__section home__section--cta">
        <div className="container">
          <div className="home__final-cta">
            <h2 className="home__final-title">開始你的海洋探索</h2>
            <p className="home__final-description">
              踏入神奇的海洋世界，探索未知的深藍奧秘
            </p>
            <Button to="/explore" variant="primary" size="large">
              立即開始
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
