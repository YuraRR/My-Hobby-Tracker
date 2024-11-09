// src/components/GameDetails.tsx
import React, { useEffect, useState } from "react";
import fetchGameDetails from "../services/gameServices";

interface GameDetailsProps {
  gameId: string;
}

const GameDetails: React.FC<GameDetailsProps> = ({ gameId }) => {
  const [gameDetails, setGameDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getGameDetails = async () => {
      try {
        const data = await fetchGameDetails(gameId);
        setGameDetails(data);
      } catch (err) {
        setError("Ошибка при загрузке данных об игре");
      } finally {
        setLoading(false);
      }
    };

    getGameDetails();
  }, [gameId]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;
  console.log(gameDetails);

  return (
    <div>
      <h1>{gameDetails?.name}</h1>
      <p>{gameDetails?.description}</p>
      {/* Другие детали об игре */}
    </div>
  );
};

export default GameDetails;
