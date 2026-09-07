import {
  useFonts,
  InterTight_400Regular,
  InterTight_500Medium,
  InterTight_600SemiBold,
  InterTight_700Bold,
  InterTight_800ExtraBold,
  InterTight_900Black,
} from '@expo-google-fonts/inter-tight';

/**
 * Call once at the app root. Render nothing (or a splash screen) until
 * `fontsLoaded` is true — every `typography` token references these exact
 * PostScript names, so text renders in the OS fallback font until they load.
 */
export function useDesignSystemFonts() {
  const [fontsLoaded, fontError] = useFonts({
    InterTight_400Regular,
    InterTight_500Medium,
    InterTight_600SemiBold,
    InterTight_700Bold,
    InterTight_800ExtraBold,
    InterTight_900Black,
  });

  return { fontsLoaded, fontError };
}
