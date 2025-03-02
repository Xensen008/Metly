const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-[#111827] overflow-hidden">
      {/* Clean base gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-blue-500/10" />
      
      {/* Simplified clean glows */}
      <div className="absolute h-[800px] w-[800px] -top-40 -right-40 rounded-full bg-indigo-400/10 blur-[130px]" />
      <div className="absolute h-[600px] w-[600px] bottom-0 left-0 rounded-full bg-blue-400/10 blur-[130px]" />
      <div className="absolute h-[600px] w-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400/10 blur-[130px]" />
      
      {/* Same texture with adjusted blend */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('/images/hero-background.png')`,
          backgroundRepeat: 'repeat',
          mixBlendMode: 'soft-light'
        }}
      />
    </div>
  );
};

export default Background;
