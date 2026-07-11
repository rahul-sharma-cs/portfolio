/** Registration marks in the four corners. Parent must be `relative`. */
export default function CropMarks({ className = "" }: { className?: string }) {
  const c = "absolute h-3.5 w-3.5 border-ink/50";
  return (
    <span aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      <span className={`${c} left-0 top-0 border-l border-t`} />
      <span className={`${c} right-0 top-0 border-r border-t`} />
      <span className={`${c} bottom-0 left-0 border-b border-l`} />
      <span className={`${c} bottom-0 right-0 border-b border-r`} />
    </span>
  );
}
