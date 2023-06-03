const useColorText = (value: string | undefined, searchValue: string) => {
  if (
    value?.toLowerCase()?.includes(searchValue.toLowerCase()) &&
    searchValue !== ""
  ) {
    return {
      background: "rgba(245, 222, 179, 0.411)",
    };
  } else {
    return {};
  }
};

export default useColorText;
