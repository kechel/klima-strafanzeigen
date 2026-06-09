# Planung für neue Strafanzeige 2025

## Struktur: **Serienbrief für Staatsanwaltschaften**

**Entwicklung:**
- ✅ Markdown-Dokument als Arbeitsversion
- ✅ Bilder möglich mit `![Beschreibung](pfad.png)` oder Platzhalter `[BILD: Beschreibung]`
- ✅ Später Konvertierung zu OpenOffice Writer
- ✅ Serienbrief mit staatsanwaltschaften.csv erstellen

**Ziel:** Ein einheitliches Dokument für alle Staatsanwaltschaften

## Antwort auf Staatsanwaltschaften: Blankettnorm-Argumentation widerlegen

**Hintergrund:** Staatsanwaltschaften argumentieren, dass genehmigte Anlagen nicht strafbar seien ("Blankettnormen").

### Vier Hauptargumentationslinien:

#### 1. **Erkenntnisfortschritt macht Genehmigungen hinfällig**
- Neue wissenschaftliche Erkenntnisse seit Genehmigung
- Umweltschäden wurden unrealistisch beurteilt
- Betrieb trotz Genehmigung nicht mehr rechtens

#### 2. **Grob fahrlässige/vorsätzliche Nichtbeachtung der Klimafolgen**
- Echte Folgen wurden nicht beachtet (Klimaschäden + Carbon-Removal-Kosten)
- Genehmigungen seit IPCC-Sechster Sachstandsbericht (9. August 2021) hinfällig
- Fahrlässigkeit/Vorsatz in Genehmigungsverfahren

#### 3. **Individuelle CO2-Verantwortung trotz globaler Verursachung**
- CO2-Budget für menschenwürdige Welt < benötigtes Carbon-Removal
- **Schlussfolgerung:** Jeder direkt verantwortlich für eigene Emissionen
- Carbon-Removal-Kosten = direkte Kosten für künftige Generationen
- Unverhältnismäßig hohe Kosten → kein menschenwürdiges Leben für Kinder
- Unsere Einschränkungen vernachlässigbar vs. Schäden

#### 4. **Kosten-Nutzen-Rechnung fossiler CO2-Emissionen**
**Prioritätenliste nach Verhältnismäßigkeit:**
- **Höchste Priorität:** Müllverbrennung (praktisch kein Nutzen, sofortige CO2-Einsparung durch Einlagerung)
- **Sehr hohe Priorität:** Kohlekraftwerke (größte CO2-Verursacher, wenig direkter Nutzen für Menschen)
- **Differenzierte Betrachtung:** PKW-Verkehr (hoher Nutzen für Menschen, aber lösbar durch soziale Abfederung/CO2-Budget pro Kopf)

## Rechtliche Grundlagen

(Zu ergänzen: relevante Gesetze, Paragraphen, Rechtsprechung)

## Zielgruppe/Adressaten

- Staatsanwaltschaften (welche?)
- Spezielle Schwerpunktstaatsanwaltschaften?
- Bundesweite Verteilung oder regional fokussiert?

## Benötigte Materialien/Belege

(Zu sammeln: wissenschaftliche Studien, Dokumente, Beweise)

## Neue Struktur: 3 separate, fokussierte Strafanzeigen

**Strategischer Vorteil:** Unterschiedliche Schwerpunkte, bessere Erfolgschancen

### **Strafanzeige A: Müllverbrennung - Der vermeidbarste Schaden**
**Hauptargument:** NULL gesellschaftlicher Nutzen, sofort abschaltbar
- **Zielgruppe:** REMONDIS, ALBA, Veolia, EEW + Genehmigungsbehörden  
- **Rechtsbasis:** Sachbeschädigung (§ 303), extreme Unverhältnismäßigkeit
- **Kernzahlen:** 172.400€ Schulden pro Kind, 24 Mio. t CO₂/Jahr
- **Anhänge:** `carbon-removal.md`, `klimaschaeden-kosten.md`

### **Strafanzeige B: Kohlekraftwerke - Wirtschaftlich überholt**
**Hauptargument:** 1,2 Mio.€ Schulden pro Kind, obwohl Erneuerbare günstiger
- **Zielgruppe:** RWE, LEAG, EnBW, Vattenfall + Genehmigungsbehörden
- **Rechtsbasis:** Fahrlässige Körperverletzung (§§ 222, 229), hinfällige Genehmigungen  
- **Kernzahlen:** 690 Mio. t CO₂ (2021-24), Wirtschaftlichkeitsvergleich
- **Anhänge:** `carbon-removal.md`, `wirtschaftsvergleich.md`

### **Strafanzeige C: Systematische Menschenrechtsverletzung**
**Hauptargument:** 1,4 Mio.€ Gesamtschuld pro Kind = Verstoß gegen Menschenwürde
- **Zielgruppe:** Alle Emittenten + Aufsichtsbehörden (übergreifend)
- **Rechtsbasis:** Menschenwürde (Art. 1 GG), Generationenschutz (Art. 20a GG)
- **Kernzahlen:** Gesamtbelastung aller Emissionen für deutsche Kinder
- **Anhänge:** `carbon-removal.md`, `klimaschaeden-kosten.md`, `menschenrechts-gutachten.md`

### Neue Verzeichnisstruktur:
```
strafanzeige-A/  (Müllverbrennung - einfachster Fall)
strafanzeige-B/  (Kohlekraftwerke - wirtschaftlich)  
strafanzeige-C/  (Menschenrechte - umfassend)
```

### Build-System mit Anhang-Auswahl:
- **Config-Header:** `<!-- ANHAENGE: carbon-removal, klimaschaeden -->`
- **Selektive Compilation:** Nur relevante Anhänge pro Strafanzeige

---

*Arbeitsverzeichnis: 2025-strafanzeige-3 - Alle anderen Verzeichnisse bleiben unverändert*