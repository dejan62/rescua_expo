// app/(tabs)/hiking.tsx (example path)
import { Theme } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { ScrollView, StyleSheet, View, useColorScheme } from 'react-native';
import { Card, Divider, List, Text } from 'react-native-paper';

export default function HikingScreen() {
  const colorScheme = useColorScheme();
  const theme = Theme[colorScheme || 'light']; 

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header icon */}
      <View style={[styles.iconWrap, { backgroundColor: theme.colors.surfaceVariant }]}>
        <MaterialIcons name="hiking" size={64} color={theme.colors.primary} />
      </View>

      {/* Title */}
      <Text variant="headlineMedium" style={[styles.center,{color: theme.colors.onSurface}]}>
        KODEKS PLANINCA: Zlata pravila
      </Text>
      <Text variant="titleSmall" style={[styles.center, { opacity: 0.8, marginTop: 4, color: theme.colors.onSurface }]}>
        za pohodnike in vse outdoor navdušence
      </Text>

      <Divider style={{ marginVertical: 16, width: '80%' }} />

      {/* Intro card */}
      <Card mode="elevated" style={[styles.card,{ backgroundColor: theme.colors.surface}]}>
        <Card.Content>
          <Text variant="bodyLarge" style={{ color: theme.colors.onSurface }}>
            Gore so naš skupni dom in navdih. Bonton v njih ni zgolj vljudnost, ampak
            odgovornost in tovarištvo, ki zagotavljata varnost vseh in ohranjata neokrnjeno naravo.
            Tole je naš neformalni dogovor za srečen in varen korak:
          </Text>
        </Card.Content>
      </Card>

      {/* Sections */}
      <Section
        number={1}
        title="Načrtovanje in Odgovornost (Varnost je v pripravi)"
        intro="Vsaka tura se začne doma. Bodite iskreni do sebe glede svoje kondicije in ne dovolite, da vas ego zavede. Bolje je priti domov utrujen in zadovoljen kot izčrpan in v težavah."
        bullets={[
          'Pravilo Zgodnje Ptice: V gorah bodimo zgodnji. Izognemo se vročini in hitrim popoldanskim nevihtam.',
          'Oprema je ključ: trdni planinski čevlji, plastenje oblačil, prva pomoč, čelna svetilka (tudi za kratke poti), zaščita pred soncem, polna baterija/power bank.',
          'Jej in pij, preden si žejen in lačen: redni požirki vode in prigrizki (suho sadje, oreščki, ploščica).',
          'Povej, kam greš: sporoči cilj in čas povratka bližnjim ali oskrbniku koče – tvoj osnovni SOS sistem.',
        ]}
      />

      <Section
        number={2}
        title="Spoštovanje Narave (Pustimo le stopinje)"
        intro="Gore so dom tisočerim bitjem; mi smo le gostje. Naš cilj je, da ne pustimo nobene sledi."
        bullets={[
          'Vrečka za smeti v nahrbtnik: vse, kar prineseš gor, prineseš tudi dol (tudi robčki, olupki, ogorki).',
          'Flora in favna: ne trgaj cvetja; živali opazuj na razdalji, ne hrani jih; glasbo pusti doma ali uporabi slušalke.',
          'Ognjevarni: ogenj le na označenih in varnih mestih.',
          'Voda je svetinja: brez mil in detergentov v potokih/jezerih; kopanje v visokogorskih jezerih je prepovedano in škoduje ekosistemu.',
        ]}
      />

      <Section
        number={3}
        title="Na Poti in Vzajemna Vljudnost"
        intro="Planinstvo je eden redkih športov, kjer je pozdrav samoumeven."
        bullets={[
          'Pozdrav je obvezen: »Dober dan« ali »Živjo« – znak spoštovanja in priložnost, da preverimo počutje.',
          'Pravilo prednosti: dogovor in vljudnost na ozkih poteh; komunikacija je ključ (»Bi lahko šel/šla mimo?«).',
          'Oznake so zakoni: ne hodimo po bližnjicah – erozija, uničenje vegetacije in večja nevarnost zdrsa.',
          'Palice pod kontrolo: na ozkih/zgodnjih odsekih jih drži ob telesu, da ne ogrožaš drugih.',
        ]}
      />

      <Section
        number={4}
        title="Bivanje v Kočah (Planinski dom je skupni dom)"
        intro="Koče so zgrajene z žulji prostovoljcev; v njih smo ena velika planinska družina."
        bullets={[
          'Rezervacija je zakon: rezerviraj in se drži ure; če zamujaš, pokliči.',
          'Oskrbnik je šef: ob prihodu se prijavi; spoštuj hišni red (nočni mir 22:00–05:00); čevlje in palice pusti v za to namenjenem prostoru.',
          'Podpri kočo: naroči obrok ali pijačo; lastno hrano jej diskretno.',
          'Zasilna ležišča: sprejmi z nasmehom; bivaki/zavetišča so za nujne primere – pusti brezhibno čisto.',
        ]}
      />

      <Section
        number={5}
        title="Solidarnost in Pomoč v Stiski"
        intro="Tekmovalnost izgine, ko se pojavi nesreča – planinec planincu je brat."
        bullets={[
          'Ustavi se in pomagaj: od vode do resne pomoči – naredi, kar zmoreš.',
          'Svetuj, ne pridigaj: izkušeni naj vljudno svetujejo in spodbujajo.',
          'Klic v sili (112): ostani miren; sporoči lokacijo, vrsto nesreče, število ponesrečencev; ne prekini, dokler operater ne zaključi.',
          'Diskretnost: nesreča ni spektakel – ne fotografiraj poškodovanih in ne objavljaj posnetkov.',
        ]}
      />

      <Section
        number={6}
        title="Odnos do Lokalnih Skupnosti in Parkov"
        intro="Gore se začnejo v dolini – vstopimo z vsem spoštovanjem."
        bullets={[
          'Parkiraj pametno: le na označenih mestih; ne oviraj dovozov in reševalcev; plačaj parkirnino, kjer je zahtevana.',
          'Narodni parki: strožja pravila (npr. TNP) – preberi jih; prosto kampiranje in kurjenje ognja sta prepovedana; psi na povodcu.',
          'Podpri lokalno ekonomijo: kupuj lokalne izdelke, pridelke in storitve.',
        ]}
      />

      {/* Outro */}
      <Card mode="elevated" style={[styles.card, { marginTop: 20, marginBottom: 32, backgroundColor: theme.colors.surface}]}>
        <Card.Content>
          <Text variant="bodyLarge" style={{ fontStyle: 'italic', color: theme.colors.onSurface }}>
            Zaključek: V hribih ne tekmujemo. Skupaj smo in drug drugemu čuvamo hrbet.
            Dober planinec je tisti, ki se vrne varno domov, za seboj pa pusti le nasmeh
            in spoštovanje do narave. Srečno in varen korak!
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

/** --- Paper Section helper --- */
function Section({
  number,
  title,
  intro,
  bullets,
}: {
  number: number;
  title: string;
  intro?: string;
  bullets?: string[];
}) {
  const colorScheme = useColorScheme();
  const theme = Theme[colorScheme || 'light'];
  return (
      <Card mode="elevated" style={[styles.section,{ backgroundColor: theme.colors.surface}]}>
        <Card.Content style={{ paddingBottom: 0 }}>
          {/* Smaller + wraps to two lines */}
          <Text
            variant="titleMedium"
            style={{ fontWeight: '700', color: theme.colors.onSurface }}
            numberOfLines={2}
          >
            {number}. {title}
          </Text>
        </Card.Content>

        <Card.Content style={{ gap: 8, paddingTop: 8 }}>
          {intro ? <Text variant="bodyLarge" style={{color: theme.colors.onSurface}}>{intro}</Text> : null}
          {bullets?.map((b, i) => (
            <List.Item
              key={i}
              title={b}
              titleNumberOfLines={6}
              left={props => <List.Icon {...props} icon="circle-small"  color={theme.colors.primary} />}
              titleStyle={{ color: theme.colors.onSurface }}
            />
          ))}
        </Card.Content>
      </Card>
    );
}

/** --- Styles kept minimal; Paper handles most visuals --- */
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    gap: 8,
  },
  center: { textAlign: 'center' },
  iconWrap: {
    marginBottom: 12,
    borderRadius: 999,
    padding: 10,
  },
  card: {
    width: '100%',
  },
  section: {
    width: '100%',
  },
});
