import Card from '../Card/Card';
import Button from '../Button/Button';
import { getSpeciesOceans } from '../../data/oceanTags';
import './SpeciesCard.css';

const SpeciesCard = ({ species }) => {
  return (
    <Card
      variant="glass"
      hover
      className="species-card"
      data-category={species.category}
      data-species-id={species.id}
      data-oceans={getSpeciesOceans(species.habitat).join(' ')}
    >
      <div className="species-card__image">
        <span className="species-card__emoji">{species.image}</span>
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
        </Button>
      </div>
    </Card>
  );
};

export default SpeciesCard;
