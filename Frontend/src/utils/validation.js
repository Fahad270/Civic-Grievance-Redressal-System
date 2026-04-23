export const validateForm = (title, desc) => {
  if (!title || title.length < 5) {
    return "Title must be at least 5 characters";
  }

  if (!desc || desc.length < 10) {
    return "Description must be at least 10 characters";
  }

  return null;
};