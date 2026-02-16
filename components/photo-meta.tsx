import { SFIcon } from '@/components/sf-icon';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { LinearGradient } from 'expo-linear-gradient';
import type { Asset } from 'expo-media-library';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  asset: Asset;
}

export const PhotoMeta = ({ asset }: Props) => {
  return (
    <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.container}>
      <Text style={styles.filename} numberOfLines={1} selectable>
        {asset.filename}
      </Text>

      <View style={styles.row}>
        <SFIcon name="calendar-outline" size={14} color="#aaa" />
        <Text style={styles.meta}>
          {format(asset.creationTime, 'MMM d, yyyy', { locale: enUS })}
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingTop: 40,
  },
  filename: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  meta: {
    color: '#aaa',
    fontSize: 12,
  },
});
