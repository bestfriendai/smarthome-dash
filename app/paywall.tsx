import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { colors, spacing, radius, fontSize } from '../src/theme';

const features = [
  { icon: '∞', title: 'Unlimited Sensors', desc: 'Add as many sensors as you need' },
  { icon: '📊', title: 'Advanced Analytics', desc: 'Historical trends and predictions' },
  { icon: '🔔', title: 'Custom Alerts', desc: 'Set your own thresholds' },
  { icon: '📱', title: 'Widget Support', desc: 'Home screen quick view' },
];

const plans = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: '$4.99',
    period: '/month',
    popular: false,
  },
  {
    id: 'annual',
    name: 'Annual',
    price: '$39.99',
    period: '/year',
    savings: 'Save 33%',
    popular: true,
  },
];

export default function PaywallScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState('annual');
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);
    // RevenueCat purchase logic would go here
    setTimeout(() => {
      setLoading(false);
      router.back();
    }, 1000);
  };

  const handleRestore = () => {
    // Restore purchases logic
  };

  const handleTerms = () => {
    Linking.openURL('https://example.com/terms');
  };

  const handlePrivacy = () => {
    Linking.openURL('https://example.com/privacy');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.titleSection}>
        <Text style={styles.badge}>Premium</Text>
        <Text style={styles.title}>Unlock SmartHome Dash</Text>
        <Text style={styles.subtitle}>Get the most out of your smart home</Text>
      </View>

      <View style={styles.features}>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureRow}>
            <Text style={styles.featureIcon}>{feature.icon}</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDesc}>{feature.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.plans}>
        {plans.map((plan) => (
          <TouchableOpacity
            key={plan.id}
            style={[
              styles.planCard,
              selectedPlan === plan.id && styles.planCardSelected,
              plan.popular && styles.planCardPopular,
            ]}
            onPress={() => setSelectedPlan(plan.id)}
          >
            {plan.popular && (
              <View style={styles.popularBadge}>
                <Text style={styles.popularBadgeText}>Best Value</Text>
              </View>
            )}
            <View style={styles.planHeader}>
              <Text style={[
                styles.planName,
                selectedPlan === plan.id && styles.planNameSelected,
              ]}>
                {plan.name}
              </Text>
              {plan.savings && (
                <View style={styles.savingsBadge}>
                  <Text style={styles.savingsText}>{plan.savings}</Text>
                </View>
              )}
            </View>
            <Text style={[
              styles.planPrice,
              selectedPlan === plan.id && styles.planPriceSelected,
            ]}>
              {plan.price}
              <Text style={styles.planPeriod}>{plan.period}</Text>
            </Text>
            {selectedPlan === plan.id && (
              <View style={styles.checkmark}>
                <Text style={styles.checkmarkText}>✓</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity 
        style={[styles.purchaseButton, loading && styles.purchaseButtonDisabled]}
        onPress={handlePurchase}
        disabled={loading}
      >
        <Text style={styles.purchaseButtonText}>
          {loading ? 'Processing...' : 'Start Free Trial'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.restoreButton} onPress={handleRestore}>
        <Text style={styles.restoreButtonText}>Restore Purchases</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          By subscribing, you agree to our{' '}
          <Text style={styles.link} onPress={handleTerms}>Terms of Service</Text>
          {' '}and{' '}
          <Text style={styles.link} onPress={handlePrivacy}>Privacy Policy</Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xl,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  titleSection: {
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  badge: {
    fontSize: fontSize.caption,
    fontWeight: '600',
    color: colors.brand,
    backgroundColor: colors.brand + '15',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: fontSize.largeTitle,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    letterSpacing: -0.4,
  },
  subtitle: {
    fontSize: fontSize.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  features: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  featureIcon: {
    fontSize: 20,
    width: 32,
    textAlign: 'center',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: fontSize.body,
    fontWeight: '600',
    color: colors.text,
  },
  featureDesc: {
    fontSize: fontSize.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  plans: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    gap: spacing.sm,
  },
  planCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 2,
    borderColor: colors.border,
    position: 'relative',
  },
  planCardSelected: {
    borderColor: colors.brand,
  },
  planCardPopular: {
    borderColor: colors.brand,
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    left: spacing.md,
    backgroundColor: colors.brand,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 8,
  },
  popularBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  planName: {
    fontSize: fontSize.body,
    fontWeight: '600',
    color: colors.text,
  },
  planNameSelected: {
    color: colors.brand,
  },
  savingsBadge: {
    backgroundColor: colors.success + '20',
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
  },
  savingsText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.success,
  },
  planPrice: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  planPriceSelected: {
    color: colors.brand,
  },
  planPeriod: {
    fontSize: fontSize.body,
    fontWeight: '400',
    color: colors.textSecondary,
  },
  checkmark: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  purchaseButton: {
    backgroundColor: colors.brand,
    marginHorizontal: spacing.md,
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  purchaseButtonDisabled: {
    opacity: 0.6,
  },
  purchaseButtonText: {
    fontSize: fontSize.body,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  restoreButton: {
    alignItems: 'center',
    paddingTop: spacing.md,
  },
  restoreButtonText: {
    fontSize: fontSize.body,
    color: colors.brand,
  },
  footer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xl,
    alignItems: 'center',
  },
  footerText: {
    fontSize: fontSize.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  link: {
    color: colors.brand,
  },
});
