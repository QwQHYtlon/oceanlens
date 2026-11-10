import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Activity,
  ArrowDown,
  ArrowUpRight,
  Bot,
  Check,
  Compass,
  Fish,
  Minus,
  Sparkles,
  Waves,
} from 'lucide-react';
import Button from '../components/Button/Button';
import Card from '../components/Card/Card';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import MetricCard from '../components/MetricCard/MetricCard';
import { oceanData } from '../data/oceanData';
import useDocumentTitle from '../hooks/useDocumentTitle';
import './Home.css';

const Home = () => {
  useDocumentTitle('');
  const { coverage, unexplored, features, comparison } = oceanData;
  const reduceMotion = useReducedMotion();

  const fadeIn = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
        };

  const handleLearnMore = () => {
    document.getElementById('features')?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  const featureIcons = {
    compass: <Compass size={28} />,
    fish: <Fish size={28} />,
    activity: <Activity size={28} />,
    bot: <Bot size={28} />,
  };

  return (
    <div className="home">
      <section className="home__hero">
        <div className="home__hero-glow" aria-hidden="true" />
        <div className="home__bubbles" aria-hidden="true">
          {Array.from({ length: 9 }).map((_, index) => (
            <span key={index} className="home__bubble" />
          ))}
        </div>

        <div className="home__hero-content">
          <motion.span className="home__eyebrow" {...fadeIn(0)}>
            <Waves size={14} />
            海洋教育 · 互動探索
          </motion.span>

          <motion.h1 className="home__title" {...fadeIn(0.05)}>
            OceanLens
          </motion.h1>

          <motion.h2 className="home__subtitle" {...fadeIn(0.1)}>
            海洋透視鏡
          </motion.h2>

          <motion.p className="home__tagline" {...fadeIn(0.15)}>
            讓不能潛水的人，也能探索海洋。
          </motion.p>

          <motion.p className="home__description" {...fadeIn(0.2)}>
            透過互動科技，探索海洋生物、環境與生態系統。
          </motion.p>

          <motion.div className="home__cta" {...fadeIn(0.25)}>
            <Button to="/explore" variant="primary" size="large">
              <Compass size={18} aria-hidden="true" />
              開始探索
            </Button>
            <Button variant="secondary" size="large" onClick={handleLearnMore}>
              <ArrowDown size={18} aria-hidden="true" />
              了解 OceanLens
            </Button>
          </motion.div>
        </div>

        <motion.a
          className="home__scroll"
          href="#features"
          onClick={(event) => {
            event.preventDefault();
            handleLearnMore();
          }}
          {...fadeIn(0.35)}
        >
          <span>向下探索</span>
          <ArrowDown size={16} aria-hidden="true" />
        </motion.a>

        <div className="home__hero-wave" aria-hidden="true">
          <svg viewBox="0 0 1440 160" preserveAspectRatio="none">
            <path
              fill="rgba(0, 180, 216, 0.1)"
              d="M0,112 C220,72 420,140 640,116 C860,92 1040,36 1240,70 C1340,86 1400,100 1440,92 L1440,160 L0,160 Z"
            />
            <path
              fill="var(--color-deep-dark)"
              d="M0,96 C180,140 340,48 540,70 C740,92 900,150 1110,116 C1260,92 1350,60 1440,80 L1440,160 L0,160 Z"
            />
          </svg>
        </div>
      </section>

      <section className="home__section">
        <div className="container">
          <SectionTitle
            eyebrow="OCEAN DATA"
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

      <section className="home__section" id="features">
        <div className="container">
          <SectionTitle
            eyebrow="CORE FEATURES"
            title="核心功能"
            subtitle="探索 OceanLens 的強大功能"
            align="center"
          />
          <div className="home__features">
            {features.map((feature, index) => (
              <Link key={feature.id} to={feature.path}>
                <Card variant="glass" hover className="home__feature-card">
                  <div className="home__feature-top">
                    <div className="home__feature-icon" aria-hidden="true">
                      {featureIcons[feature.icon]}
                    </div>
                    <span className="home__feature-index" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="home__feature-title">{feature.title}</h3>
                  <p className="home__feature-description">{feature.description}</p>
                  <span className="home__feature-link">
                    前往探索
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home__section" id="comparison">
        <div className="container">
          <SectionTitle
            eyebrow="WHY OCEANLENS"
            title="Why OceanLens"
            subtitle="傳統教育 vs 互動學習"
            align="center"
          />
          <div className="home__comparison">
            <Card variant="glass" className="home__comparison-card">
              <h3 className="home__comparison-title">{comparison.traditional.title}</h3>
              <ul className="home__comparison-list">
                {comparison.traditional.items.map((item) => (
                  <li
                    key={item}
                    className="home__comparison-item home__comparison-item--traditional"
                  >
                    <span className="home__comparison-icon" aria-hidden="true">
                      <Minus size={15} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            <Card
              variant="glass"
              className="home__comparison-card home__comparison-card--highlight"
            >
              <span className="home__comparison-badge">推薦</span>
              <h3 className="home__comparison-title">{comparison.oceanlens.title}</h3>
              <ul className="home__comparison-list">
                {comparison.oceanlens.items.map((item) => (
                  <li
                    key={item}
                    className="home__comparison-item home__comparison-item--oceanlens"
                  >
                    <span className="home__comparison-icon" aria-hidden="true">
                      <Check size={15} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section className="home__section home__section--cta">
        <div className="container">
          <div className="home__final-cta">
            <div className="home__final-glow" aria-hidden="true" />
            <span className="home__final-eyebrow">
              <Sparkles size={14} aria-hidden="true" />
              YOUR OCEAN JOURNEY
            </span>
            <h2 className="home__final-title">開始你的海洋探索</h2>
            <p className="home__final-description">
              踏入神奇的海洋世界，探索未知的深藍奧秘
            </p>
            <Button to="/explore" variant="primary" size="large">
              立即開始
              <ArrowUpRight size={18} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
