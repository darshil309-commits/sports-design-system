import React from 'react';
import { ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, spacing } from '../../tokens';
import { Button, ButtonVariant } from '../buttons/Button';
import { GradientImage } from '../media/GradientImage';
import { Card } from './Card';

export interface HeroCardProps {
  headline: string;
  /** One short supporting line — keep this minimal, the image and headline carry the emotion. */
  supportingText?: string;
  image: ImageSourcePropType;
  ctaLabel: string;
  onPressCta: () => void;
  ctaVariant?: ButtonVariant;
}

/** Large promo module: full-bleed image, bold headline, one CTA. Used for campaign/feature moments, not routine content. */
export function HeroCard({ headline, supportingText, image, ctaLabel, onPressCta, ctaVariant = 'primary' }: HeroCardProps) {
  return (
    <Card padding="none" bordered={false} radius="lg" accessibilityLabel={headline}>
      <GradientImage source={image} aspectRatio={3 / 4} startAt={0.3}>
        <View style={styles.textBlock}>
          <Text style={styles.headline}>{headline}</Text>
          {supportingText && <Text style={styles.supporting}>{supportingText}</Text>}
          <View style={styles.ctaWrap}>
            <Button label={ctaLabel} variant={ctaVariant} onPress={onPressCta} showArrow />
          </View>
        </View>
      </GradientImage>
    </Card>
  );
}

const styles = StyleSheet.create({
  textBlock: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    bottom: spacing.lg,
    gap: spacing.xs,
  },
  headline: {
    fontFamily: fontFamily.extraBold,
    fontSize: 30,
    lineHeight: 34,
    letterSpacing: -0.5,
    color: colors.text.inverse,
  },
  supporting: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: colors.text.inverseMuted,
  },
  ctaWrap: {
    marginTop: spacing.xs,
    alignSelf: 'flex-start',
  },
});
