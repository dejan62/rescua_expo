import { Text, View } from '@/components/Themed';
import i18n from '@/constants/translations/i18n';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ScrollView, StyleSheet } from 'react-native';

export default function FirstAidScreen() {
  // Optional i18n fallback (kept from your original)
  const raw = i18n.t('firstAidText') as string;
  const hasTranslation = raw !== 'firstAidText';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.iconWrap}>
        <MaterialIcons name="add-moderator" size={64} color="#E53935" />
      </View>

      <Text style={styles.title}>Osnovni priročnik prve pomoči</Text>
      <Text style={styles.subtitle}>za pohodnike in outdoor navdušence</Text>

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      {/* Intro (shown only if no translation provided) */}
      {!hasTranslation ? (
        <View style={styles.card}>
          <Text style={styles.paragraph}>
            Na tej strani lahko prebereš osnovna navodila prve pomoči za najpogostejše situacije v naravi.
          </Text>
        </View>
      ) : null}

      {/* 1. Najpogostejše poškodbe in stanja */}
      <Section number={1} title="Najpogostejše poškodbe in zdravstvena stanja v naravi">
        <Subsection title="Zvini in izpahi">
          <Paragraph>
            Zvin: nateg vezi; bolečina in oteklina. Izpah: kost zapusti sklepno površino; močna bolečina, deformacija, onemogočeno gibanje.
          </Paragraph>
          <BulletList items={[
            'Pri zvinu metoda RICE: počitek, hlajenje, kompresija, elevacija.',
            'Pri izpahu ne nastavljaj sam – imobiliziraj v najdenem položaju (ruta, povoj) in poišči zdravniško pomoč.',
          ]}/>
        </Subsection>

        <Subsection title="Zlomi">
          <Paragraph>
            Znaki: huda bolečina, oteklina, nenaravna lega, včasih »pok«. Imobiliziraj z improvizirano opornico, ki zajame sklep nad in pod zlomom.
          </Paragraph>
          <BulletList items={[
            'Odprt zlom: rano pokrij s sterilno gazo/čisto krpo, nato imobiliziraj.',
            'Sum na hrbtenico/medenico: ne premikaj (razen v smrtni nevarnosti); poravnano premikanje več oseb hkrati.',
          ]}/>
        </Subsection>

        <Subsection title="Krvavitve in rane">
          <BulletList items={[
            'Močna zunanja krvavitev: pritisk neposredno na rano (gaza/tkanina), neprekinjeno več minut.',
            'Elevacija uda, če ni zloma.',
            'Ne odstranjuj globoko zataknjenih tujkov; stabiliziraj in poišči pomoč.',
            'Turniket samo pri življenjsko nevarnih krvavitvah; zabeleži čas.',
          ]}/>
        </Subsection>

        <Subsection title="Podhladitev (hipotermija)">
          <BulletList items={[
            'V zavetje, zamenjaj mokra oblačila, izoliraj od tal.',
            'Ogrevaj jedro (prsni koš, vrat, glava, dimlje); topli, ne vroči obkladki.',
            'Topli sladkani napitki, če je pri zavesti; brez alkohola.',
            'Pri hudi hipotermiji ravnaj nežno, spremljaj dihanje, pokliči 112.',
          ]}/>
        </Subsection>

        <Subsection title="Sončarica in vročinski udar">
          <Paragraph>Sončarica: senca, dvignjeno vzglavje, hladni obkladki na glavo/vrat, hidracija.</Paragraph>
          <Paragraph>Vročinski udar (urgentno!): T višja od 40 °C, zmedenost/nezavest.</Paragraph>
          <BulletList items={[
            'Takoj 112.',
            'Intenzivno hlajenje celega telesa (voda/mokre rjuhe, hladni obkladki v pazduhe, dimlje, vrat).',
            'Ne dajaj ničesar v usta nezavestnemu; spremljaj in pripravi se na TPO.',
          ]}/>
        </Subsection>

        <Subsection title="Opekline (sončne, toplotne)">
          <BulletList items={[
            'Sončne: v senco, hladni obkladki/prhanje, hidracija; mehurjev ne prediraj.',
            'Toplotne: »stop–drop–roll«; hladi 10–15 min s hladno, ne ledeno vodo; sterilno pokrij.',
            'Ne nanašaj olj, masla ipd. na sveže opekline.',
            'Velike/globoke/kritične lokacije → zdravnik; spremljaj znake šoka.',
          ]}/>
        </Subsection>

        <Subsection title="Piki in ugrizi (žuželke, klopi, kače)">
          <Paragraph>Žuželke: odstrani želo s strganjem (ne stiskaj), hlajenje, opazuj alergijo (anafilaksija!).</Paragraph>
          <Paragraph>Klop: odstrani s pinceto pri koži, razkuži, opazuj za eritem.</Paragraph>
          <Paragraph>Kača (modras/gad):</Paragraph>
          <BulletList items={[
            'Umirjenost in imobilizacija uda, nižje od srca; odstrani nakit.',
            'Rano nežno izperi, sterilno pokrij; hladni obkladki preko tkanine.',
            'Takoj 112; NE podvezuj, NE izsesavaj, NE reži rane.',
          ]}/>
        </Subsection>

        <Subsection title="Zastrupitve (rastline, voda, hrana)">
          <BulletList items={[
            'Preventiva: ne jej neznanih rastlin/gob; vodo prekuhaj/filtriraj.',
            'Hrana/voda: rehidracija (ORS), po požirkih; aktivno oglje, če ga imaš.',
            'Rastline/gobe: 112; aktivno oglje (odrasli ~50 g), hrani vzorce za identifikacijo.',
          ]}/>
        </Subsection>
      </Section>

      {/* 2. Ukrepi prve pomoči */}
      <Section number={2} title="Ukrepi prve pomoči">
        <Subsection title="Oskrba ran in zaustavitev krvavitev">
          <BulletList items={[
            'Zaščiti se (rokavice/čista tkanina).',
            'Pritisk na rano, kompresijska obveza, elevacija uda.',
            'Če premoči, ne snemaj – dodaj nove plasti in okrepi pritisk.',
            'Znaki šoka: polezi, dvigni noge, pokrij, 112.',
          ]}/>
        </Subsection>

        <Subsection title="Imobilizacija uda">
          <BulletList items={[
            'Improvizirana opornica (palica, SAM-splint, pena) čez sklep nad in pod poškodbo.',
            'Podloži, pritrdì, preveri cirkulacijo distalno (pulz/kapilarna polnitev).',
            'Izpah: fiksiraj v najdenem položaju, ne nastavljaj sam.',
            'Hrbtenica: ne premikaj, razen ob neposredni nevarnosti; več oseb poravnano.',
          ]}/>
        </Subsection>

        <Subsection title="Hlajenje in ogrevanje">
          <BulletList items={[
            'Hlajenje: udarnine/zvini, opekline, vročinski udar – hladna voda/obkladki, led vedno zavit.',
            'Ogrevanje: hipotermija – jedro telesa, termo folija (sijoča stran k telesu), topli napitki pri zavesti.',
            'Zamenjaj mokra oblačila; prepreči podhladitev po nesreči.',
          ]}/>
        </Subsection>

        <Subsection title="Ravnanje pri nezavesti">
          <BulletList items={[
            'Preveri odzivnost, pokliči 112.',
            'Dihanje: odpri dihalno pot; 10 s »glej–poslušaj–čuti«.',
            'Če diha: stabilni bočni položaj; nadzor dihanja.',
            'Če ne diha normalno: začni z oživljanjem.',
          ]}/>
        </Subsection>

        <Subsection title="Osnove oživljanja (CPR/TPO)">
          <BulletList items={[
            '112 na zvočniku, 30 stisov : 2 vpih, 100–120/min, globina ~5 cm (odrasli).',
            'Če ne vpihuješ: neprekinjeni stisi 100–120/min.',
            'AED takoj, ko je na voljo; sledi navodilom.',
            'Otroci: začni s 5 vpihi; stisk z eno roko (dojenček 2 prsta).',
          ]}/>
        </Subsection>

        <Subsection title="Položaji">
          <BulletList items={[
            'Stabilni bočni: nezavesten, ki diha.',
            'Proti-šok: znaki šoka – noge gor, pokrij.',
            'Bolečine v prsih: polsede, žveči aspirin (če ni kontraindikacij), 112.',
            'Težko dihanje: sede/polsede; pomoč pri inhalatorju.',
          ]}/>
        </Subsection>

        <Subsection title="Alergijska reakcija (anafilaksija)">
          <BulletList items={[
            'Znaki: koprivnica, edem ustnic/jezika, piskanje, bruhanje, omotica/kolaps.',
            'Takoj 112; odstrani alergen.',
            'Adrenalin z avtoinjektorjem v zunanji del stegna; po 5–15 min po potrebi ponovi.',
            'Antihistaminik/kortikosteroid ne nadomešča adrenalina.',
          ]}/>
        </Subsection>
      </Section>

      {/* 3. Samopomoč v gorah */}
      <Section number={3} title="Samopomoč v gorah">
        <BulletList items={[
          'Samoocena: pri hudih poškodbah ostani na mestu; dihanje, krvavitve, toplota.',
          '112; če ni signala, na višje/odprto; SMS včasih uspe.',
          'Improviziraj: opornice iz palic, povoj iz oblačil, pritisk na krvavitev.',
          'Premik le, če je varneje; označi mesto nesreče.',
          'Varčuj z energijo; ohranjaj psihično zbranost.',
        ]}/>
        <Subsection title="Toplota, zavetje, tekočina">
          <BulletList items={[
            'Toplota: suho, sloji, izolacija od tal, termo folija.',
            'Vročina: senca, prezračevanje, hidracija.',
            'Zavetje: naravne zavetline ali improviziran bivak.',
            'Voda: prekuhavanje/tablete/filtri; v skrajni sili raje pij kot hudo dehidriraj.',
          ]}/>
        </Subsection>
        <Subsection title="Pritegnitev pozornosti">
          <BulletList items={[
            'Telefon 112 (tudi prek drugih omrežij), varčuj z baterijo.',
            'Piščalka: 6 piskov/min klic v sili; odgovor 3 piskov.',
            'Svetlobni signali/SOS; ogenj in dim (3 ognji v trikotniku).',
            'Vidne oznake, zapis lokacije, ogromne črke za zrak.',
          ]}/>
        </Subsection>
      </Section>

      {/* 4. Prva pomoč v nahrbtniku */}
      <Section number={4} title="Prva pomoč v nahrbtniku">
        <Subsection title="Priporočena vsebina">
          <BulletColumns
            columns={[
              [
                'Sterilni obliži (različne velikosti)',
                'Sterilne gaze (5×5, 10×10 cm)',
                'Samolepilni trak',
                'Povoji (navadni/elastični)',
                'Sterilne blazinice/robčki',
                'Antiseptik / gel',
                'Antibakterijska krema',
                'Majhne škarje',
              ],
              [
                'Pinceta',
                'CPR zaščitna folija/maska',
                'Rokavice (2 para, nitril)',
                'Trikotna ruta',
                'Vata/oblazinjenje',
                'Sponke/varnostne zaponke',
                'Majhen brivnik/rezilo',
                'Termometer, beležka, svinčnik',
              ],
            ]}
          />
          <Paragraph small>Komplet prilagodi turi in redno preverjaj roke uporabe (vodoodporna vrečka).</Paragraph>
        </Subsection>

        <Subsection title="Dodatna oprema (izven kompleta)">
          <BulletList items={[
            'Reševalna termo folija, močan lepilni trak',
            'Čelna svetilka + baterije, nož/multitool',
            'Vžigalnik/vžigalice, kompas + zemljevid, piščalka',
            'Rezervna voda, energijska hrana; vezice, žica, posodica',
          ]}/>
        </Subsection>

        <Subsection title="Zdravila v nahrbtniku">
          <BulletList items={[
            'Proti bolečini/temperaturi: paracetamol, ibuprofen (pazite na odmerke).',
            'Antihistaminik; adrenalin auto-injektor (po navodilu zdravnika).',
            'ORS praški; po potrebi loperamid; proti slabosti po potrebi.',
            'Osebna zdravila (inhalator, nitroglicerin, inzulin…) + dodatna doza.',
            'Obliži za žulje, mazilo za ustnice, kapljice za oči.',
          ]}/>
          <Paragraph small>Zdravila v originalni embalaži z navodili; preverjaj roke uporabe.</Paragraph>
        </Subsection>
      </Section>

      <View style={[styles.card, { marginTop: 20, marginBottom: 32 }]}>
        <Text style={[styles.paragraph, { fontStyle: 'italic' }]}>
          S pravim znanjem, nekaj opreme in mirno glavo lahko učinkovito ukrepaš in rešiš življenje – svoje ali tuje.
          V dvomu pokliči 112: bolje enkrat preveč kot enkrat premalo. Srečno in varno na vseh poteh!
        </Text>
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
