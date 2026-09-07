import React from 'react';
import { ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, spacing, tabularNums } from '../../tokens';
import { TeamLogo } from '../sports/TeamLogo';
import { Icon } from '../icons';
import { Card } from './Card';

export interface CompetitionStanding {
  position: number;
  teamName: string;
  logo?: ImageSourcePropType;
  points: number;
}

export interface CompetitionCardProps {
  competitionName: string;
  /** e.g. "Matchday 12" */
  subtitle?: string;
  emblem?: ImageSourcePropType;
  /** Top rows only — link to the full LeagueTable screen for the rest. */
  standings: CompetitionStanding[];
  onViewFullTable?: () => void;
}

/** Competition identity + a standings preview. Full sortable table lives in LeagueTable. */
export function CompetitionCard({
  competitionName,
  subtitle,
  emblem,
  standings,
  onViewFullTable,
}: CompetitionCardProps) {
  return (
    <Card>
      <View style={styles.header}>
        {emblem ? (
          <TeamLogo teamName={competitionName} source={emblem} size="md" />
        ) : (
          <View style={styles.mark}>
            <Text style={styles.markText}>{competitionName.slice(0, 2).toUpperCase()}</Text>
          </View>
        )}
        <View style={styles.headerText}>
          <Text style={styles.title} numberOfLines={1}>
            {competitionName}
          </Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>

      <View style={styles.table}>
        {standings.map((row) => (
          <View key={row.position} style={styles.row}>
            <Text style={styles.position}>{row.position}</Text>
            <TeamLogo teamName={row.teamName} source={row.logo} size="sm" />
            <Text style={styles.teamName} numberOfLines={1}>
              {row.teamName}
            </Text>
            <Text style={[styles.points, tabularNums]}>{row.points}</Text>
          </View>
        ))}
      </View>

      {onViewFullTable && (
        <View style={styles.footer}>
          <Text style={styles.footerLabel} onPress={onViewFullTable}>
            VIEW FULL TABLE
          </Text>
          <Icon name="arrowRight" size="sm" color={colors.text.primary} />
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  mark: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.surface.inverse,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markText: {
    fontFamily: fontFamily.extraBold,
    fontSize: 12,
    color: colors.text.inverse,
  },
  headerText: { flexShrink: 1 },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 15,
    color: colors.text.primary,
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.text.muted,
  },
  table: {
    borderTopWidth: 1,
    borderTopColor: colors.border.subtle,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.subtle,
  },
  position: {
    width: 16,
    fontFamily: fontFamily.bold,
    fontSize: 12,
    color: colors.text.muted,
  },
  teamName: {
    flex: 1,
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.text.primary,
  },
  points: {
    fontFamily: fontFamily.extraBold,
    fontSize: 14,
    color: colors.text.primary,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xxs,
    paddingTop: spacing.sm,
  },
  footerLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    letterSpacing: 0.6,
    color: colors.text.primary,
  },
});
