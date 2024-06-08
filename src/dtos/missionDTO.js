export const missionResponseDTO = (mission) => {
  return {
    id: mission.id,
    store_id: mission.store_id,
    reward: mission.reward,
    body: mission.body,
    created_at: mission.created_at,
    updated_at: mission.updated_at
  };
};
