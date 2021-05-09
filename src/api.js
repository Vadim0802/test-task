export const getUsers = (REQUEST_URL) => {
  const USERS = [];

  const iterRequest = async (url) => {
    const { results, next } = await fetch(url).then((res) => res.json());
    USERS.push(
      ...results.map(({ name, height, mass, created }) => {
        const date = new Date(created).toDateString();
        return { name, height, mass, created: date };
      })
    );
    if (next) {
      await iterRequest(next);
    }
    return USERS;
  };

  return iterRequest(REQUEST_URL);
};
