import Card from '../Card/Card';
import { ArrowDown, ArrowRight } from 'lucide-react';
import Button from '../Button/Button';
import { getSpeciesOceans } from '../../data/oceanTags';
import { getDeepestZone, getDepthZoneIds, getDepthZoneLabel } from '../../utils/depth.js';
import './SpeciesCard.css';

const SpeciesCard = ({ species }) => {
  const deepestZone = getDeepestZone(species.depth);

  return (
    <Card
      variant="glass"
      hover
      className="species-card"
      data-category={species.category}
      data-species-id={species.id}
      data-oceans={getSpeciesOceans(species.habitat).join(' ')}
      data-depth-zone={deepestZone?.id ?? ''}
      data-depth-zones={getDepthZoneIds(species.depth).join(' ')}
    >
      <div className="species-card__image">
        <span className="species-card__category">{species.category}</span>
        <span
          className="species-card__zone"
          title={`深度位置：${species.depth}（${getDepthZoneLabel(species.depth)}）`}
        >
          <ArrowDown size={11} aria-hidden="true" />
          {deepestZone?.name ?? '深度不明'}
        </span>
        <span className="species-card__emoji" aria-hidden="true">
          {species.image}
        </span>
      </div>
      <div className="species-card__content">
        <h3 className="species-card__name">{species.name}</h3>
        <p className="species-card__english">{species.englishName}</p>
        <div className="species-card__meta">
          <span className="species-card__depth">{species.depth}</span>
          <span className="species-card__habitat">{species.habitat}</span>
        </div>
        <p className="species-card__description">{species.description}</p>
        <Button 
          to={`/species/${species.id}`} 
          variant="secondary" 
          size="small" 
          className="species-card__button"
          aria-label={`探索 ${species.name}`}
        >
          探索
          <ArrowRight size={15} aria-hidden="true" />
        </Button>
      </div>
    </Card>
  );
};

export default SpeciesCard;
