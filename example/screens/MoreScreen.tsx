import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, spacing } from '../../src/tokens';
import { TopNav } from '../../src/components/navigation/TopNav';
import { Button } from '../../src/components/buttons/Button';
import { Toggle } from '../../src/components/buttons/Toggle';
import { Chip } from '../../src/components/buttons/Chip';
import { Badge } from '../../src/components/badges/Badge';
import { IconButton } from '../../src/components/buttons/IconButton';
import { TextInput } from '../../src/components/inputs/TextInput';
import { Dropdown } from '../../src/components/inputs/Dropdown';
import { Modal } from '../../src/components/feedback/Modal';
import { BottomSheet } from '../../src/components/feedback/BottomSheet';
import { Banner } from '../../src/components/feedback/Banner';
import { ProgressBar } from '../../src/components/feedback/ProgressBar';
import { Skeleton } from '../../src/components/feedback/Skeleton';
import { Countdown } from '../../src/components/sports/Countdown';
import { TeamCard } from '../../src/components/cards/TeamCard';

/**
 * Component showcase exercising input/feedback pieces that don't otherwise
 * appear on Home/News/Standings/Match Center — the "More" tab doubles as a
 * kitchen sink for visual QA of the remaining categories.
 */
export function MoreScreen() {
  const [notificationsOn, setNotificationsOn] = useState(true);
  const [email, setEmail] = useState('');
  const [region, setRegion] = useState('en-GB');
  const [modalOpen, setModalOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);

  const kickoff = new Date(Date.now() + 1000 * 60 * 60 * 26);

  return (
    <View style={styles.root}>
      <TopNav title="More" />
      <ScrollView contentContainerStyle={styles.content}>
        {bannerVisible && (
          <Banner
            message="Match postponed due to weather — new date to be confirmed."
            tone="warning"
            onDismiss={() => setBannerVisible(false)}
          />
        )}

        <Section title="Preferences">
          <Row label="Push notifications">
            <Toggle value={notificationsOn} onValueChange={setNotificationsOn} accessibilityLabel="Push notifications" />
          </Row>
          <TextInput label="Email" placeholder="you@example.com" value={email} onChangeText={setEmail} />
          <Dropdown
            label="Region"
            value={region}
            onChange={setRegion}
            options={[
              { label: 'English (UK)', value: 'en-GB' },
              { label: 'English (US)', value: 'en-US' },
              { label: 'Español', value: 'es' },
            ]}
          />
        </Section>

        <Section title="Next kickoff">
          <Countdown target={kickoff} />
        </Section>

        <Section title="Followed team">
          <TeamCard teamName="Arsenal" nextMatchLabel="Next: vs Chelsea · Sat 19:30" onPress={() => Alert.alert('Arsenal')} />
        </Section>

        <Section title="Tags & status">
          <View style={styles.row}>
            <Chip label="Premier League" />
            <Chip label="Live" tone="brand" />
            <Badge label="FT" />
            <Badge label="Postponed" tone="warning" />
          </View>
        </Section>

        <Section title="Icon buttons">
          <View style={styles.row}>
            <IconButton icon="following" variant="filled" selected accessibilityLabel="Following" onPress={() => {}} />
            <IconButton icon="share" variant="outline" accessibilityLabel="Share" onPress={() => {}} />
            <IconButton icon="settings" variant="ghost" accessibilityLabel="Settings" onPress={() => {}} />
          </View>
        </Section>

        <Section title="Progress & loading">
          <ProgressBar progress={64} />
          <View style={[styles.row, styles.skeletonRow]}>
            <Skeleton width={48} height={48} radius="sm" />
            <View style={styles.skeletonLines}>
              <Skeleton width="80%" height={14} />
              <Skeleton width="50%" height={14} />
            </View>
          </View>
        </Section>

        <Section title="Overlays">
          <View style={styles.row}>
            <Button label="Open Modal" variant="secondary" onPress={() => setModalOpen(true)} />
            <Button label="Open Sheet" variant="secondary" onPress={() => setSheetOpen(true)} />
          </View>
        </Section>
      </ScrollView>

      <Modal visible={modalOpen} onClose={() => setModalOpen(false)} title="Confirm">
        <Text style={styles.modalBody}>Remove Arsenal from your followed teams?</Text>
        <View style={[styles.row, styles.modalActions]}>
          <Button label="Cancel" variant="tertiary" onPress={() => setModalOpen(false)} />
          <Button label="Remove" variant="destructive" onPress={() => setModalOpen(false)} />
        </View>
      </Modal>

      <BottomSheet visible={sheetOpen} onClose={() => setSheetOpen(false)} title="Sort fixtures by">
        {['Date', 'Competition', 'Kickoff time'].map((option) => (
          <Text key={option} style={styles.sheetOption} onPress={() => setSheetOpen(false)}>
            {option}
          </Text>
        ))}
      </BottomSheet>
    </View>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title.toUpperCase()}</Text>
      <View style={styles.sectionBody}>{children}</View>
    </View>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={styles.settingRow}>
      <Text style={styles.settingLabel}>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background.base,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
    gap: spacing.md,
  },
  section: {
    gap: spacing.sm,
  },
  sectionTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 11,
    letterSpacing: 0.8,
    color: colors.text.muted,
  },
  sectionBody: {
    gap: spacing.sm,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 15,
    color: colors.text.primary,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  skeletonRow: {
    alignItems: 'center',
  },
  skeletonLines: {
    flex: 1,
    gap: spacing.xs,
  },
  modalBody: {
    fontFamily: fontFamily.regular,
    fontSize: 15,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  modalActions: {
    justifyContent: 'flex-end',
  },
  sheetOption: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: colors.text.primary,
    paddingVertical: spacing.sm,
  },
});
