import React from "react";
import styled from 'styled-components';
import { Button, Container } from "../App";
import bgImage from '../assets/bg.png';

// Get the base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9000';

const SearchResult = ({ data }) => {
  // Function to construct complete image URL
  const getImageUrl = (imagePath) => {
    // Check if the image path already includes http/https
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // Remove any leading slash from the image path
    const cleanImagePath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    
    // Construct the full URL
    return `${API_BASE_URL}/images/${cleanImagePath}`;
  };

  return (
    <FoodCardContainer>
      <Container>
        <FoodCards>
          {data?.map(({ name, image, text, price }) => (
            <FoodCard key={name}>
              <div className="food_image">
                <img 
                  src={getImageUrl(image)} 
                  alt={name}
                  onError={(e) => {
                    console.error(`Failed to load image: ${e.target.src}`);
                    e.target.src = '/placeholder-food.png'; // Add a placeholder image in your public folder
                  }}
                />
              </div>
              <div className="food_info">
                <div className="info">
                  <h3>{name}</h3>
                  <p>{text}</p>
                </div>
                <Button>₹{price.toFixed(2)}</Button>
              </div>
            </FoodCard>
          ))}
        </FoodCards>
      </Container>
    </FoodCardContainer>
  );
};

export default SearchResult;

const FoodCardContainer = styled.section`
  min-height: calc(100vh - 210px);
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const FoodCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 32px;
  column-gap: 20px;
  justify-content: center;
  align-items: center;
  padding-top: 80px;
`;

const FoodCard = styled.div`
  width: 340px;
  height: 167px;
  border: 0.66px solid;
  border-image-source: radial-gradient(
    80.69% 208.78% at 108.28% 112.58%,
    #eabfff 0%,
    rgba(135, 38, 183, 0) 100%
  );
  background: url(.png),
    radial-gradient(
      90.16% 143.01% at 15.32% 21.04%,
      rgba(165, 239, 255, 0.2) 0%,
      rgba(110, 191, 244, 0.0447917) 77.08%,
      rgba(70, 144, 213, 0) 100%
    );
  background-blend-mode: overlay, normal;
  backdrop-filter: blur(13.1842px);
  border-radius: 20px;
  display: flex;
  padding: 8px;

  .food_info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;

    h3 {
      margin-top: 8px;
      font-size: 16px;
      font-weight: 500;
    }

    p {
      margin-top: 4px;
      font-size: 12px;
    }

    button {
      font-size: 12px;
    }
  }
`;