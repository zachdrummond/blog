/**
 * Formats a date to MM/DD/YYYY format
 */
export function formatDate(parent) {
  const date_string = parent?.date_created || parent?.date_updated;
  if (!date_string) return null;
  
  const date = new Date(date_string);
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
