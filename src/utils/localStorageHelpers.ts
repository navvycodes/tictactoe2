export const STORAGE_KEY = "ttt_hide_rules";
export const getShowInstructions = (): boolean => {
  return !(localStorage.getItem(STORAGE_KEY) === "true");
};

export const setShowInstructions = (value: boolean) => {
  localStorage.setItem(STORAGE_KEY, String(value));
};
