import { ReactNode } from "react";

interface ParticleEffectProps {
  particles: ReactNode[]
}
 const ParticleEffect = ({particles } : ParticleEffectProps) => {
  // console.log('rendering particles: ', particles)
  return (
    <div>
      {particles}
    </div>
  );
};

export default ParticleEffect;