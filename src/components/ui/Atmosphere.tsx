export function Atmosphere() {
  return (
    <div className="atmosphere" aria-hidden="true">
      <div className="atmosphere__mandala" />
      <div className="anim-float-slow absolute -left-40 top-[18%] h-[34rem] w-[34rem] rounded-full bg-rose-500/10 blur-[120px]" />
      <div className="anim-glow absolute -right-48 top-[62%] h-[32rem] w-[32rem] rounded-full bg-gold-500/10 blur-[130px]" />
      <div className="absolute left-1/3 top-[42%] h-[26rem] w-[26rem] rounded-full bg-gold-400/[0.05] blur-[110px]" />
      <div className="atmosphere__vignette" />
      <div className="atmosphere__grain" />
    </div>
  );
}
