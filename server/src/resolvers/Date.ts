/**
 * Formats a date to MM/DD/YYYY format
 */
export function formatDate(dateString) {
  if (!dateString) return null;
  const date = new Date(dateString);
  return `${date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })} ${date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })}`;
}

/**
 * Resolver for createdAt fields
 */
export function createdAt(parent) {
  return formatDate(parent.createdAt);
}

/**
 * Resolver for updatedAt fields
 */
export function updatedAt(parent) {
  return formatDate(parent.updatedAt);
}
