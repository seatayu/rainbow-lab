/**
 * Subtractive Color Mixing Logic (RYB Approximation)
 * Standard digital RGB (additive) doesn't match how kids mix paint.
 * We use a weighted blending of primary pigments.
 */
export interface ColorDrops {
  r: number;
  y: number;
  b: number;
}
// Visual pigment approximations (Slightly more vibrant for "Kid Playful" aesthetic)
const PIGMENTS = {
  RED: { r: 255, g: 60, b: 60 },    // #FF3C3C
  YELLOW: { r: 255, g: 230, b: 0 }, // #FFE600
  BLUE: { r: 50, g: 130, b: 255 },  // #3282FF
  WHITE: { r: 255, g: 255, b: 255 }
};
export function mixRYB(drops: ColorDrops): string {
  const total = drops.r + drops.y + drops.b;
  if (total === 0) return "#FFFFFF";
  // Weighted average of RGB components
  const mixR = (drops.r * PIGMENTS.RED.r + drops.y * PIGMENTS.YELLOW.r + drops.b * PIGMENTS.BLUE.r) / total;
  const mixG = (drops.r * PIGMENTS.RED.g + drops.y * PIGMENTS.YELLOW.g + drops.b * PIGMENTS.BLUE.g) / total;
  const mixB = (drops.r * PIGMENTS.RED.b + drops.y * PIGMENTS.YELLOW.b + drops.b * PIGMENTS.BLUE.b) / total;
  // Darken slightly as more drops are added to simulate pigment density
  const darknessFactor = Math.max(0.6, 1 - (total * 0.02));
  const clamp = (val: number) => Math.floor(Math.min(255, Math.max(0, val * darknessFactor)));
  const rHex = clamp(mixR).toString(16).padStart(2, '0');
  const gHex = clamp(mixG).toString(16).padStart(2, '0');
  const bHex = clamp(mixB).toString(16).padStart(2, '0');
  return `#${rHex}${gHex}${bHex}`;
}
/**
 * Detects if two RYB drop sets are effectively the same ratio.
 * Since kids might add 1R:1Y or 2R:2Y, we normalize to ratios.
 */
export function compareColors(current: ColorDrops, target: ColorDrops): boolean {
  const totalC = current.r + current.y + current.b;
  const totalT = target.r + target.y + target.b;
  if (totalC === 0) return false;
  const ratioR = Math.abs((current.r / totalC) - (target.r / totalT));
  const ratioY = Math.abs((current.y / totalC) - (target.y / totalT));
  const ratioB = Math.abs((current.b / totalC) - (target.b / totalT));
  const threshold = 0.05; // 5% tolerance
  return ratioR < threshold && ratioY < threshold && ratioB < threshold;
}