export const generatePseudonym = () => {
  const adjectives = [
    'Calm', 'Brave', 'Gentle', 'Kind', 'Quiet', 'Wise', 'Warm',
    'Bright', 'Peaceful', 'Steady', 'Strong', 'Loyal', 'Serene'
  ];
  const animals = [
    'Panda', 'Wolf', 'Bear', 'Fox', 'Owl', 'Deer', 'Rabbit',
    'Dolphin', 'Tiger', 'Lion', 'Swan', 'Koala', 'Turtle'
  ];

  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomAnimal = animals[Math.floor(Math.random() * animals.length)];

  // Generate a short random alphanumeric ID for uniqueness
  const uniqueId = Math.random().toString(36).substring(2, 6);

  return {
    id: `${randomAdjective}-${randomAnimal}-${uniqueId}`.toLowerCase(),
    name: `${randomAdjective} ${randomAnimal}`
  };
};
