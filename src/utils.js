export const sort = (sortingField, typeField, data) => {
  const actions = {
    string: (data) => {
      return [
        ...data.sort((a, b) => a[sortingField].localeCompare(b[sortingField])),
      ];
    },
    object: (data) => {
      return [
        ...data.sort((a, b) => {
          const dateA = a[sortingField].getTime();
          const dateB = b[sortingField].getTime();
          return Math.sign(dateB - dateA);
        }),
      ];
    },
  };

  return actions[typeField](data);
};
