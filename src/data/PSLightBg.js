export default function PSLightBg() {
  const PSLightBg = [
    // "url('bg3.jpg')",
    // "url('bg4.jpg')",
  ];

  const i = Math.floor(Math.random() * PSLightBg.length);

  return PSLightBg[i];
}
