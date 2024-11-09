const fetchGameDetails = async (gameId: string) => {
  const response = await fetch(`https://api.rawg.io/api/games/${gameId}?key=4dffed44755e4444adc5d014144ac1fb`);
  const data = await response.json();
  return data;
};
export default fetchGameDetails;
