// Get interests from localStorage
const getInterestsFromLocalStorage = (): Record<string, string> => {
  const interests = localStorage.getItem('interests');
  return interests ? JSON.parse(interests).value : {};
};

// Calculate Jaccard similarity between two users
export const CalculateSimilarUsers = (targetUserId: string): string[] => {
  const allInterests = getInterestsFromLocalStorage();
  const targetTags = new Set(allInterests[targetUserId]?.split(',') || []);

  const similarities: { userId: string; score: number }[] = [];

  // Calculate similarity with all other users
  for (const [userId, tags] of Object.entries(allInterests)) {
    if (userId === targetUserId) continue;
    console.log(userId, tags);
    const userTags = new Set(tags.split(','));
    const intersection = new Set(
      [...targetTags].filter((tag) => userTags.has(tag))
    );
    const union = new Set([...targetTags, ...userTags]);

    const similarity = union.size === 0 ? 0 : intersection.size / union.size;

    similarity > 0 &&
      similarities.push({
        userId,
        score: similarity,
      });
  }

  // Sort by descending similarity score
  return similarities
    .sort((a, b) => b.score - a.score)
    .map((user) => user.userId);
};
