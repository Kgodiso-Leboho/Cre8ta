export const Skeleton = ({ width = "100%", height = 16, radius = 8, style: s }) => (
  <div className="skeleton" style={{ width, height, borderRadius: radius, ...s }} />
);