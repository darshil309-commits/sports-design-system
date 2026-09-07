import React from 'react';
import { ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, spacing, tabularNums } from '../../tokens';
import { TeamLogo } from './TeamLogo';
import { FormIndicator, FormResult } from '../badges/FormIndicator';

export interface LeagueTableRow {
  position: number;
  teamName: string;
  logo?: ImageSourcePropType;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalDifference: number;
  points: number;
  form?: FormResult[];
  /** Highlights this row (e.g. the team the user follows). */
  highlighted?: boolean;
}

export interface LeagueTableProps {
  rows: LeagueTableRow[];
  /** Show the recent-form column — omit on narrow layouts. */
  showForm?: boolean;
}

/** Full sortable standings table. For a 3-row teaser use CompetitionCard instead. */
export function LeagueTable({ rows, showForm = true }: LeagueTableProps) {
  return (
    <View>
      <View style={styles.headerRow}>
        <Text style={[styles.headerCell, styles.posCell]}>#</Text>
        <Text style={[styles.headerCell, styles.teamCell]}>TEAM</Text>
        <Text style={[styles.headerCell, styles.numCell]}>P</Text>
        <Text style={[styles.headerCell, styles.numCell]}>GD</Text>
        <Text style={[styles.headerCell, styles.numCell]}>PTS</Text>
        {showForm && <Text style={[styles.headerCell, styles.formCell]}>FORM</Text>}
      </View>
      {rows.map((row) => (
        <View
          key={row.position}
          style={[styles.row, row.highlighted && styles.rowHighlighted]}
        >
          <Text style={[styles.posText, tabularNums, styles.posCell]}>{row.position}</Text>
          <View style={[styles.teamCell, styles.teamIdentity]}>
            <TeamLogo teamName={row.teamName} source={row.logo} size="sm" />
            <Text style={styles.teamName} numberOfLines={1}>
              {row.teamName}
            </Text>
          </View>
          <Text style={[styles.cellText, tabularNums, styles.numCell]}>{row.played}</Text>
          <Text style={[styles.cellText, tabularNums, styles.numCell]}>
            {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
          </Text>
          <Text style={[styles.points, tabularNums, styles.numCell]}>{row.points}</Text>
          {showForm && (
            <View style={styles.formCell}>{row.form && <FormIndicator results={row.form.slice(-5)} />}</View>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.strong,
  },
  headerCell: {
    fontFamily: fontFamily.bold,
    fontSize: 10,
    letterSpacing: 0.6,
    color: colors.text.muted,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.subtle,
  },
  rowHighlighted: {
    backgroundColor: colors.brand.primaryMuted,
  },
  posCell: { width: 24 },
  teamCell: { flex: 1 },
  numCell: { width: 32, textAlign: 'center' },
  formCell: { width: 96, alignItems: 'flex-end' },
  posText: {
    fontFamily: fontFamily.bold,
    fontSize: 13,
    color: colors.text.muted,
  },
  teamIdentity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  teamName: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.text.primary,
    flexShrink: 1,
  },
  cellText: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    color: colors.text.secondary,
  },
  points: {
    fontFamily: fontFamily.extraBold,
    fontSize: 14,
    color: colors.text.primary,
  },
});
