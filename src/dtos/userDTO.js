// userDTO.js
export const signinResponseDTO = (user, prefer) => {
  if (!user) {
    throw new Error('User data is missing');
  }

  if (!prefer) {
    prefer = []; // prefer가 없는 경우 빈 배열로 초기화
  }

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      gender: user.gender,
      age: user.age,
      address: user.address,
      small_address: user.small_address,
      point: user.point
    },
    prefer: prefer.map(p => ({
      id: p.id,
      category_id: p.category_id,
      category_name: p.category_name
    }))
  };
}
