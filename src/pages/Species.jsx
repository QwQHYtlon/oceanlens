import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Card from '../components/Card/Card';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import SpeciesCard from '../components/SpeciesCard/SpeciesCard';
import { speciesData, speciesCategories } from '../data/speciesData';
import './Species.css';

const Species = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const filteredSpecies = speciesData.filter(species => {
    const matchesSearch = species.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         species.englishName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           (selectedCategory === 'deep' && species.category === '深海') ||
                           (selectedCategory === 'reef' && species.category === '珊瑚礁') ||
                           (selectedCategory === 'large' && species.category === '大型生物') ||
                           (selectedCategory === 'invertebrate' && species.category === '無脊椎動物');
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="species">
      <div className="container">
        <SectionTitle 
          title="海洋生物" 
          subtitle="探索神奇的海洋生命"
          align="center"
        />
        
        <div className="species__filters">
          <div className="species__search">
            <Search className="species__search-icon" />
            <input
              type="text"
              placeholder="搜尋海洋生物..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="species__search-input"
            />
          </div>
          
          <div className="species__categories">
            {speciesCategories.map((category) => (
              <button
                key={category.id}
                className={`species__category ${selectedCategory === category.id ? 'species__category--active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="species__grid">
          {filteredSpecies.map((species) => (
            <SpeciesCard key={species.id} species={species} />
          ))}
        </div>
        
        {filteredSpecies.length === 0 && (
          <div className="species__empty">
            <p>沒有找到符合條件的海洋生物</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Species;
