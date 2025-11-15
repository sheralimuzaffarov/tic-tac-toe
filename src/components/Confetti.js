/**
 * Confetti celebration animation component
 */
export default function Confetti({ show }) {
  if (!show) return null;
  
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7'];
  
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[1000] overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-2.5 h-2.5 -top-2.5 animate-confetti-fall"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 0.5}s`,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)]
          }}
        />
      ))}
    </div>
  );
}

