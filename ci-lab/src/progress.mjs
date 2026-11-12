/**
 * Experimental, original CI-lab example — NOT Sales Academy production logic.
 * No code, assets or credentials are imported from the private repository.
 */
export function completionPercent(completed, total) {
  if (!Number.isSafeInteger(completed) || !Number.isSafeInteger(total)) {
    throw new TypeError("completed and total must be safe integers");
  }
  if (total < 0 || completed < 0 || completed > total) {
    throw new RangeError("expected 0 <= completed <= total");
  }
  return total === 0 ? 0 : Math.round((completed / total) * 100);
}

/**
 * Illustrative input validation for a purely synthetic learning-path fixture.
 * This is not an API schema or domain contract of the private application.
 */
export function isSyntheticPath(value) {
  return value !== null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    typeof value.id === "string" &&
    value.id.startsWith("fictional-") &&
    Array.isArray(value.lessons) &&
    value.lessons.every(
      (lesson) => lesson !== null &&
        typeof lesson === "object" &&
        typeof lesson.id === "string" &&
        lesson.id.startsWith("fictional-") &&
        typeof lesson.completed === "boolean"
    );
}
