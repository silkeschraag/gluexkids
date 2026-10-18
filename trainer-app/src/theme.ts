// Farben angelehnt an das GlüXkids-Branding (index.html im Repo-Root).
export const colors = {
  background: '#F8F2E5',
  surface: '#FDFBF6',
  surfaceAlt: '#F1E7D4',
  border: '#E6DAC4',
  text: '#211E18',
  textMuted: '#6B6457',
  green: '#7FA42F',
  orange: '#F85C0A',
  orangeDark: '#E25309',
  blue: '#0E6FD6',
  blueDark: '#044798',
  yellow: '#FBAC05',
  yellowLight: '#FDC54A',
  red: '#E2401E',
  white: '#FFFFFF',
};

export const radius = { sm: 10, md: 16, lg: 24, pill: 999 };

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 };

export const font = {
  title: { fontSize: 28, fontWeight: '800' as const, color: colors.text },
  h2: { fontSize: 20, fontWeight: '800' as const, color: colors.text },
  h3: { fontSize: 16, fontWeight: '700' as const, color: colors.text },
  body: { fontSize: 15, lineHeight: 22, color: colors.text },
  small: { fontSize: 13, color: colors.textMuted },
};
