import {
  Activity,
  Thermometer,
  Leaf,
  Wind,
  ClipboardList,
  Flower2,
  Baby,
  Tablets,
  Bandage,
  Mars,
  FlaskConical,
  Droplet,
  TestTubes,
  TestTube,
  ShieldPlus,
  ShieldCheck,
  Beaker,
  HeartPulse,
  ScanLine,
  Truck,
  ClipboardCheck,
  Syringe,
  Droplets,
  Scissors,
  Footprints,
  Pill,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";

// Mapa nombre (campo `icon` del servicio) -> componente lucide.
const ICONS: Record<string, LucideIcon> = {
  Activity,
  Thermometer,
  Leaf,
  Wind,
  ClipboardList,
  Flower2,
  Baby,
  Tablets,
  Bandage,
  Mars,
  FlaskConical,
  Droplet,
  TestTubes,
  TestTube,
  ShieldPlus,
  ShieldCheck,
  Beaker,
  HeartPulse,
  ScanLine,
  Truck,
  ClipboardCheck,
  Syringe,
  Droplets,
  Scissors,
  Footprints,
  Pill,
  Stethoscope,
};

export function ServiceIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICONS[name] ?? Stethoscope;
  return <Icon className={className} aria-hidden="true" />;
}
