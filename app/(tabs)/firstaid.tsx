import { Text, View } from '@/components/Themed';
import i18nFA from '@/constants/translations/i18nFA';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ScrollView, StyleSheet } from 'react-native';

export default function FirstAidScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.iconWrap}>
        <MaterialIcons name="add-moderator" size={64} color="#E53935" />
      </View>

      <Text style={styles.title}>{i18nFA.t('Title')}</Text>
      <Text style={styles.subtitle}>{i18nFA.t('Subtitle')}</Text>

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      {/* 1. Najpogostejše poškodbe in stanja */}
      <Section number={1} title={i18nFA.t('Section1_Title')}>
        <Subsection title={i18nFA.t('Section1_Subsection1_Title')}>
          <Paragraph>
            {i18nFA.t('Section1_Subsection1_Paragraph1')}
          </Paragraph>
          <BulletList items={[
            i18nFA.t('Section1_Subsection1_Bullet1'),
            i18nFA.t('Section1_Subsection1_Bullet2'),
          ]}/>
        </Subsection>

        <Subsection title={i18nFA.t('Section1_Subsection2_Title')}>
          <Paragraph>
            {i18nFA.t('Section1_Subsection2_Paragraph1')}
          </Paragraph>
          <BulletList items={[
            i18nFA.t('Section1_Subsection2_Bullet1'),
            i18nFA.t('Section1_Subsection2_Bullet2'),
          ]}/>
        </Subsection>

        <Subsection title={i18nFA.t('Section1_Subsection3_Title')}>
          <BulletList items={[
            i18nFA.t('Section1_Subsection3_Bullet1'),
            i18nFA.t('Section1_Subsection3_Bullet2'),
            i18nFA.t('Section1_Subsection3_Bullet3'),
            i18nFA.t('Section1_Subsection3_Bullet4'),
          ]}/>
        </Subsection>

        <Subsection title={i18nFA.t('Section1_Subsection4_Title')}>
          <BulletList items={[
            i18nFA.t('Section1_Subsection4_Bullet1'),
            i18nFA.t('Section1_Subsection4_Bullet2'),
            i18nFA.t('Section1_Subsection4_Bullet3'),
            i18nFA.t('Section1_Subsection4_Bullet4'),
          ]}/>
        </Subsection>

        <Subsection title={i18nFA.t('Section1_Subsection5_Title')}>
          <Paragraph>{i18nFA.t('Section1_Subsection5_Paragraph1')}</Paragraph>
          <Paragraph>{i18nFA.t('Section1_Subsection5_Paragraph2')}</Paragraph>
          <BulletList items={[
            i18nFA.t('Section1_Subsection5_Bullet1'),
            i18nFA.t('Section1_Subsection5_Bullet2'),
            i18nFA.t('Section1_Subsection5_Bullet3'),
          ]}/>
        </Subsection>

        <Subsection title={i18nFA.t('Section1_Subsection6_Title')}>
          <BulletList items={[
            i18nFA.t('Section1_Subsection6_Bullet1'),
            i18nFA.t('Section1_Subsection6_Bullet2'),
            i18nFA.t('Section1_Subsection6_Bullet3'),
            i18nFA.t('Section1_Subsection6_Bullet4'),
          ]}/>
        </Subsection>

        <Subsection title={i18nFA.t('Section1_Subsection7_Title')}>
          <Paragraph>{i18nFA.t('Section1_Subsection7_Paragraph1')}</Paragraph>
          <Paragraph>{i18nFA.t('Section1_Subsection7_Paragraph2')}</Paragraph>
          <Paragraph>{i18nFA.t('Section1_Subsection7_Paragraph3')}</Paragraph>
          <BulletList items={[
            i18nFA.t('Section1_Subsection7_Bullet1'),
            i18nFA.t('Section1_Subsection7_Bullet2'),
            i18nFA.t('Section1_Subsection7_Bullet3'),
          ]}/>
        </Subsection>

        <Subsection title={i18nFA.t('Section1_Subsection8_Title')}>
          <BulletList items={[
            i18nFA.t('Section1_Subsection8_Bullet1'),
            i18nFA.t('Section1_Subsection8_Bullet2'),
            i18nFA.t('Section1_Subsection8_Bullet3'),
          ]}/>
        </Subsection>
      </Section>

      {/* 2. Ukrepi prve pomoči */}
      <Section number={2} title={i18nFA.t('Section2_Title')}>
        <Subsection title={i18nFA.t('Section2_Subsection1_Title')}>
          <BulletList items={[
            i18nFA.t('Section2_Subsection1_Bullet1'),
            i18nFA.t('Section2_Subsection1_Bullet2'),
            i18nFA.t('Section2_Subsection1_Bullet3'),
            i18nFA.t('Section2_Subsection1_Bullet4'),
          ]}/>
        </Subsection>

        <Subsection title={i18nFA.t('Section2_Subsection2_Title')}>
          <BulletList items={[
            i18nFA.t('Section2_Subsection2_Bullet1'),
            i18nFA.t('Section2_Subsection2_Bullet2'),
            i18nFA.t('Section2_Subsection2_Bullet3'),
            i18nFA.t('Section2_Subsection2_Bullet4'),
          ]}/>
        </Subsection>

        <Subsection title={i18nFA.t('Section2_Subsection3_Title')}>
          <BulletList items={[
            i18nFA.t('Section2_Subsection3_Bullet1'),
            i18nFA.t('Section2_Subsection3_Bullet2'),
            i18nFA.t('Section2_Subsection3_Bullet3'),
          ]}/>
        </Subsection>


        <Subsection title={i18nFA.t('Section2_Subsection4_Title')}>
          <BulletList items={[
            i18nFA.t('Section2_Subsection4_Bullet1'),
            i18nFA.t('Section2_Subsection4_Bullet2'),
            i18nFA.t('Section2_Subsection4_Bullet3'),
            i18nFA.t('Section2_Subsection4_Bullet4'),
          ]}/>
        </Subsection>

        <Subsection title={i18nFA.t('Section2_Subsection5_Title')}>
          <BulletList items={[
            i18nFA.t('Section2_Subsection5_Bullet1'),
            i18nFA.t('Section2_Subsection5_Bullet2'),
            i18nFA.t('Section2_Subsection5_Bullet3'),
            i18nFA.t('Section2_Subsection5_Bullet4'),
          ]}/>
        </Subsection>

        <Subsection title={i18nFA.t('Section2_Subsection6_Title')}>
          <BulletList items={[
            i18nFA.t('Section2_Subsection6_Bullet1'),
            i18nFA.t('Section2_Subsection6_Bullet2'),
            i18nFA.t('Section2_Subsection6_Bullet3'),
            i18nFA.t('Section2_Subsection6_Bullet4'),
          ]}/>
        </Subsection>

        <Subsection title={i18nFA.t('Section2_Subsection7_Title')}>
          <BulletList items={[
            i18nFA.t('Section2_Subsection7_Bullet1'),
            i18nFA.t('Section2_Subsection7_Bullet2'),
            i18nFA.t('Section2_Subsection7_Bullet3'),
            i18nFA.t('Section2_Subsection7_Bullet4'),
          ]}/>
        </Subsection>
      </Section>

      {/* 3. Samopomoč v gorah */}
      <Section number={3} title={i18nFA.t('Section3_Title')}>
        <BulletList items={[
          i18nFA.t('Section3_Subsection1_Bullet1'),
          i18nFA.t('Section3_Subsection1_Bullet2'),
          i18nFA.t('Section3_Subsection1_Bullet3'),
          i18nFA.t('Section3_Subsection1_Bullet4'),
          i18nFA.t('Section3_Subsection1_Bullet5')
        ]}/>
        <Subsection title={i18nFA.t('Section3_Subsection2_Title')}>
          <BulletList items={[
            i18nFA.t('Section3_Subsection2_Bullet1'),
            i18nFA.t('Section3_Subsection2_Bullet2'),
            i18nFA.t('Section3_Subsection2_Bullet3'),
            i18nFA.t('Section3_Subsection2_Bullet4'),
          ]}/>
        </Subsection>
        <Subsection title={i18nFA.t('Section3_Subsection3_Title')}>
          <BulletList items={[
            i18nFA.t('Section3_Subsection3_Bullet1'),
            i18nFA.t('Section3_Subsection3_Bullet2'),
            i18nFA.t('Section3_Subsection3_Bullet3'),
            i18nFA.t('Section3_Subsection3_Bullet4'),
          ]}/>
        </Subsection>
      </Section>

      {/* 4. Prva pomoč v nahrbtniku */}
      <Section number={4} title={i18nFA.t('Section4_Title')}>
        <Subsection title={i18nFA.t('Section4_Subsection1_Title')}>
          <BulletColumns
            columns={[
              [
                i18nFA.t('Section4_Subsection1_BulletColumn1_Column1'),
                i18nFA.t('Section4_Subsection1_BulletColumn1_Column2'),
                i18nFA.t('Section4_Subsection1_BulletColumn1_Column3'),
                i18nFA.t('Section4_Subsection1_BulletColumn1_Column4'),
                i18nFA.t('Section4_Subsection1_BulletColumn1_Column5'),
                i18nFA.t('Section4_Subsection1_BulletColumn1_Column6'),
                i18nFA.t('Section4_Subsection1_BulletColumn1_Column7'),
                i18nFA.t('Section4_Subsection1_BulletColumn1_Column8'),
              ],
              [
                i18nFA.t('Section4_Subsection1_BulletColumn2_Column1'),
                i18nFA.t('Section4_Subsection1_BulletColumn2_Column2'),
                i18nFA.t('Section4_Subsection1_BulletColumn2_Column3'),
                i18nFA.t('Section4_Subsection1_BulletColumn2_Column4'),
                i18nFA.t('Section4_Subsection1_BulletColumn2_Column5'),
                i18nFA.t('Section4_Subsection1_BulletColumn2_Column6'),
                i18nFA.t('Section4_Subsection1_BulletColumn2_Column7'),
                i18nFA.t('Section4_Subsection1_BulletColumn2_Column8'),
              ],
            ]}
          />
          <Paragraph small>{i18nFA.t('Section4_Subsection1_Paragraph1')}</Paragraph>
        </Subsection>

        <Subsection title={i18nFA.t('Section4_Subsection2_Title')}>
          <BulletList items={[
            i18nFA.t('Section4_Subsection2_Bullet1'),
            i18nFA.t('Section4_Subsection2_Bullet2'),
            i18nFA.t('Section4_Subsection2_Bullet3'),
            i18nFA.t('Section4_Subsection2_Bullet4'),
          ]}/>
        </Subsection>

        <Subsection title={i18nFA.t('Section4_Subsection3_Title')}>
          <BulletList items={[
            i18nFA.t('Section4_Subsection3_Bullet1'),
            i18nFA.t('Section4_Subsection3_Bullet2'),
            i18nFA.t('Section4_Subsection3_Bullet3'),
            i18nFA.t('Section4_Subsection3_Bullet4'),
            i18nFA.t('Section4_Subsection3_Bullet5'),
          ]}/>
          <Paragraph small>{i18nFA.t('Section4_Subsection3_Paragraph1')}</Paragraph>
        </Subsection>
      </Section>

      <View style={[styles.card, { marginTop: 20, marginBottom: 32 }]}>
        <Text style={[styles.paragraph, { fontStyle: 'italic' }]}>
          {i18nFA.t('Outro1')}</Text>
      </View>
    </ScrollView>
  );
}

/** ---------- Small presentational helpers ---------- */
function Section({ number, title, children }: { number: number; title: string; children?: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{number}. {title}</Text>
      {children}
    </View>
  );
}

function Subsection({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <View style={{ marginTop: 10 }}>
      <Text style={styles.subTitle}>{title}</Text>
      {children}
    </View>
  );
}

function Paragraph({ children, small }: { children: React.ReactNode; small?: boolean }) {
  return <Text style={[styles.paragraph, small && { fontSize: 14, lineHeight: 20, opacity: 0.9 }]}>{children}</Text>;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <View style={{ marginTop: 6 }}>
      {items.map((b, i) => (
        <View key={i} style={styles.listItem}>
          <Text style={styles.bullet}>{'\u2022'}</Text>
          <Text style={styles.listText}>{b}</Text>
        </View>
      ))}
    </View>
  );
}

function BulletColumns({ columns }: { columns: string[][] }) {
  return (
    <View style={styles.columns}>
      {columns.map((col, idx) => (
        <View key={idx} style={styles.column}>
          {col.map((item, i) => (
            <View key={i} style={styles.listItem}>
              <Text style={styles.bullet}>{'\u2022'}</Text>
              <Text style={styles.listText}>{item}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

/** ---------- Styles ---------- */
const styles = StyleSheet.create({
  /* layout */
  container: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },

  /* header */
  iconWrap: {
    marginBottom: 12,
    borderRadius: 999,
    padding: 12,
    backgroundColor: 'rgba(229, 57, 53, 0.12)', // subtle red halo
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.8,
    marginTop: 4,
    textAlign: 'center',
  },
  separator: {
    marginVertical: 16,
    height: 1,
    width: '70%',
  },

  /* cards/sections */
  card: {
    width: '100%',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginVertical: 8,
  },
  section: {
    width: '100%',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },

  /* text */
  paragraph: {
    textAlign: 'left',
    lineHeight: 22,
    fontSize: 16,
    marginTop: 6,
  },

  /* lists */
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 6,
  },
  bullet: {
    fontSize: 18,
    lineHeight: 22,
    marginRight: 8,
  },
  listText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
  },

  /* columns */
  columns: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 6,
  },
  column: {
    flex: 1,
  },
});
